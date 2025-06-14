<script setup lang="ts">
import { useTimestamp } from '@vueuse/core';
import { useThemeVars } from 'naive-ui';
import { useI18n } from 'vue-i18n';
import { useQRCode } from '../qr-code-generator/useQRCode';
import { base32toHex, buildKeyUri, generateHOTP, generateSecret, generateTOTP, getCounterFromTime } from './otp.service';
import TokenDisplay from './token-display.vue';
import { useStyleStore } from '@/stores/style.store';
import InputCopyable from '@/components/InputCopyable.vue';
import { computedRefreshable } from '@/composable/computedRefreshable';
import { useQueryParamOrStorage } from '@/composable/queryParams';

const now = useTimestamp();
const interval = computed(() => (now.value / 1000) % 30);
const theme = useThemeVars();
const styleStore = useStyleStore();

const secret = useQueryParamOrStorage({
  name: 'secret',
  storageName: 'otp-gen:secret',
  defaultValue: generateSecret(),
});

function refreshSecret() {
  secret.value = generateSecret();
}

const counter = ref(0);

const [hotpValues] = computedRefreshable(
  () =>
    Object.fromEntries(
      Array.from({ length: 10 }, (_, i) => [+counter.value + i, generateHOTP({ key: secret.value, counter: +counter.value + i })]),
    ),
  { throttle: 500 },
);

const [tokens] = computedRefreshable(
  () => ({
    previous: generateTOTP({ key: secret.value, now: now.value - 30000 }),
    current: generateTOTP({ key: secret.value, now: now.value }),
    next: generateTOTP({ key: secret.value, now: now.value + 30000 }),
  }),
  { throttle: 500 },
);

const keyUri = computed(() => buildKeyUri({ secret: secret.value }));

const { qrcode } = useQRCode({
  text: keyUri,
  color: {
    background: computed(() => (styleStore.isDarkTheme ? '#ffffff' : '#00000000')),
    foreground: '#000000',
  },
  options: { width: 210 },
});

const { t } = useI18n();
const secretValidationRules = [
  {
    message: t('tools.otp-code-generator-and-validator.secret-base32'),
    validator: (value: string) => value.toUpperCase().match(/^[A-Z234567]+$/),
  },
  {
    message: t('tools.otp-code-generator-and-validator.please-set-secret'),
    validator: (value: string) => value !== '',
  },
];
</script>

<template>
  <div style="max-width: 350px">
    <c-input-text
      v-model:value="secret"
      :label="t('tools.otp-code-generator-and-validator.secret')"
      :placeholder="t('tools.otp-code-generator-and-validator.paste-secret')"
      mb-5
      :validation-rules="secretValidationRules"
    >
      <template #suffix>
        <c-tooltip :tooltip="t('tools.otp-code-generator-and-validator.generate-secret')">
          <c-button circle variant="text" size="small" @click="refreshSecret">
            <icon-mdi-refresh />
          </c-button>
        </c-tooltip>
      </template>
    </c-input-text>
    <InputCopyable
      :label="t('tools.otp-code-generator-and-validator.secret-hex')"
      :value="base32toHex(secret)"
      readonly
      :placeholder="t('tools.otp-code-generator-and-validator.secret-hex-placeholder')"
      mb-5
    />

    <div mt-4 flex flex-col items-center justify-center gap-3>
      <n-image :src="qrcode" />
      <c-button :href="keyUri" target="_blank">
        {{ t('tools.otp-code-generator-and-validator.open-key-uri') }}
      </c-button>
    </div>
  </div>
  <div style="max-width: 350px">
    <div>
      <c-input-text
        v-model:value="counter"
        :label="t('tools.otp-code-generator-and-validator.start-hotp-counter')"
        :placeholder="t('tools.otp-code-generator-and-validator.start-hotp-placeholder')"
        type="number"
        mb-5
        mt-5
      />
      <InputCopyable
        v-for="(value, currentCounter) in hotpValues" :key="currentCounter"
        :value="value"
        readonly
        :label="t('tools.otp-code-generator-and-validator.hotp-label', { n: currentCounter })"
        label-position="left"
        label-width="90px"
        label-align="right"
        :placeholder="t('tools.otp-code-generator-and-validator.hotp-placeholder')"
        mb-1
      />
    </div>
  </div>
  <div style="max-width: 350px">
    <InputCopyable
      :label="t('tools.otp-code-generator-and-validator.epoch')"
      :value="Math.floor(now / 1000).toString()"
      readonly
      :placeholder="t('tools.otp-code-generator-and-validator.epoch-placeholder')"
    />

    <p>{{ t('tools.otp-code-generator-and-validator.iteration') }}</p>

    <InputCopyable
      :value="String(getCounterFromTime({ now, timeStep: 30 }))"
      readonly
      :label="t('tools.otp-code-generator-and-validator.count')"
      label-position="left"
      label-width="90px"
      label-align="right"
      :placeholder="t('tools.otp-code-generator-and-validator.iteration-placeholder')"
    />

    <InputCopyable
      :value="getCounterFromTime({ now, timeStep: 30 }).toString(16).padStart(16, '0')"
      readonly
      :placeholder="t('tools.otp-code-generator-and-validator.iteration-hex-placeholder')"
      label-position="left"
      label-width="90px"
      label-align="right"
      :label="t('tools.otp-code-generator-and-validator.padded-hex')"
    />

    <div>
      <TokenDisplay :tokens="tokens" mt-5 />

      <n-progress :percentage="(100 * interval) / 30" :color="theme.primaryColor" :show-indicator="false" />
      <div style="text-align: center">
        {{ t('tools.otp-code-generator-and-validator.next-in', { s: String(Math.floor(30 - interval)).padStart(2, '0') }) }}
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.n-progress {
  margin-top: 10px;
  ::v-deep(.n-progress-graph-line-fill) {
    transition-duration: 0.05s !important;
  }
}

.token {
  text-align: center;
  &.token-current {
    font-size: 20px;
  }
}
</style>

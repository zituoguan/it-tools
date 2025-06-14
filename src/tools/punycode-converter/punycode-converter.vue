<script setup lang="ts">
import { toASCII, toUnicode } from 'punycode/';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

const { t } = useI18n();

const punycodeInput = ref('');
const intlOutput = computed(
  () => {
    try {
      return toUnicode(punycodeInput.value?.trim());
    }
    catch (e: any) {
      return e.toString();
    }
  },
);

const intlInput = ref('');
const punycodeOutput = computed(
  () => {
    try {
      return toASCII(intlInput.value?.trim());
    }
    catch (e: any) {
      return e.toString();
    }
  },
);
</script>

<template>
  <div max-w-600>
    <c-card :title="t('tools.punycode-converter.toIntlTitle')">
      <c-input-text
        v-model:value="punycodeInput"
        :placeholder="t('tools.punycode-converter.punycodePlaceholder')"
        :label="t('tools.punycode-converter.punycodeLabel')"
        raw-text
      />

      <n-divider />

      <TextareaCopyable
        :label="t('tools.punycode-converter.decodedLabel')"
        :value="intlOutput"
        readonly
      />
    </c-card>

    <c-card :title="t('tools.punycode-converter.toPunycodeTitle')" mt-5>
      <c-input-text
        v-model:value="intlInput"
        :placeholder="t('tools.punycode-converter.intlPlaceholder')"
        :label="t('tools.punycode-converter.intlLabel')"
        raw-text
      />

      <n-divider />

      <TextareaCopyable
        :label="t('tools.punycode-converter.punycodeLabel')"
        :value="punycodeOutput"
        readonly
      />
    </c-card>
  </div>
</template>

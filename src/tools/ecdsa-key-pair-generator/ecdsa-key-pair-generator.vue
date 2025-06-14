<script setup lang="ts">
import type sshpk from 'sshpk';
import { generateKeyPair } from './ecdsa-key-pair-generator.service';
import TextareaCopyable from '@/components/TextareaCopyable.vue';
import { withDefaultOnErrorAsync } from '@/utils/defaults';
import { computedRefreshableAsync } from '@/composable/computedRefreshable';

const { t } = useI18n();

const password = ref('');
const comment = ref('');
const emptyCerts = { publicKey: '', privateKey: '' };
const curve = useStorage('ecdsa-key-pair-generator:curve', 'nistp256');
const curveOptions = [
  { value: 'nistp256', label: 'nistp256' },
  { value: 'nistp384', label: 'nistp384' },
  { value: 'nistp521', label: 'nistp521' },
];

const format = useStorage('ecdsa-key-pair-generator:format', 'ssh');
const formatOptions = [
  { value: 'pem', label: 'PEM' },
  { value: 'pkcs8', label: 'PKCS#8' },
  { value: 'ssh', label: 'OpenSSH Standard' },
  { value: 'openssh', label: 'OpenSSH New' },
  { value: 'putty', label: 'PuTTY' },
];

const supportsPassphrase = computed(() => format.value === 'ssh');
const [certs, refreshCerts] = computedRefreshableAsync(
  () => withDefaultOnErrorAsync(() => generateKeyPair(
    {
      password: password.value,
      format: format.value as sshpk.PrivateKeyFormatType,
      curve: curve.value as sshpk.CurveType,
      comment: comment.value,
    },
  ), emptyCerts),
  emptyCerts,
);
</script>

<template>
  <div>
    <n-space mb-1>
      <c-select
        v-model:value="format"
        label-position="left"
        :label="t('tools.ecdsa-key-pair-generator.format-label')"
        :options="formatOptions"
        :placeholder="t('tools.ecdsa-key-pair-generator.format-placeholder')"
      />

      <c-select
        v-model:value="curve"
        label-position="left"
        :label="t('tools.ecdsa-key-pair-generator.curve-label')"
        :options="curveOptions"
        :placeholder="t('tools.ecdsa-key-pair-generator.curve-placeholder')"
      />
    </n-space>

    <div v-if="supportsPassphrase" mb-1 mt-3>
      <n-form-item :label="t('tools.ecdsa-key-pair-generator.passphrase-label')" label-placement="left">
        <n-input
          v-model:value="password"
          type="password"
          show-password-on="mousedown"
          :placeholder="t('tools.ecdsa-key-pair-generator.passphrase-placeholder')"
        />
      </n-form-item>
    </div>

    <div mb-2>
      <n-form-item :label="t('tools.ecdsa-key-pair-generator.comment-label')" label-placement="left">
        <n-input
          v-model:value="comment"
          type="text"
          :placeholder="t('tools.ecdsa-key-pair-generator.comment-placeholder')"
        />
      </n-form-item>
    </div>

    <n-space justify="center" mb-1>
      <c-button @click="refreshCerts">
        {{ t('tools.ecdsa-key-pair-generator.refresh-button') }}
      </c-button>
    </n-space>

    <n-divider />

    <div>
      <h3>{{ t('tools.ecdsa-key-pair-generator.public-key-title') }}</h3>
      <TextareaCopyable :value="certs.publicKey" :word-wrap="true" />
    </div>

    <div>
      <h3>{{ t('tools.ecdsa-key-pair-generator.private-key-title') }}</h3>
      <TextareaCopyable :value="certs.privateKey" />
    </div>
  </div>
</template>

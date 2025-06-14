<script setup lang="ts">
import { NForm, NFormItem, NInput, NSelect } from 'naive-ui';
import { generateKeyPair } from '../rsa-key-pair-generator/rsa-key-pair-generator.service';
import { withDefaultOnErrorAsync } from '@/utils/defaults';
import { computedRefreshableAsync } from '@/composable/computedRefreshable';

const { t } = useI18n();
const domain = ref('');
const selector = ref('default');
const keySize = ref('2048');
const password = ref('');

const keySizes = [
  { label: t('tools.dkim-dns-generator.key-sizes.1024-bit'), value: '1024' },
  { label: t('tools.dkim-dns-generator.key-sizes.2048-bit'), value: '2048' },
  { label: t('tools.dkim-dns-generator.key-sizes.4096-bit'), value: '4096' },
];

const emptyCerts = { publicKey: '', privateKey: '' };
const [certs, refreshCerts] = computedRefreshableAsync(
  () => withDefaultOnErrorAsync(() => generateKeyPair({
    bits: Number(keySize.value),
    password: password.value,
    format: 'pem',
  }), emptyCerts),
  emptyCerts,
);

const dKIMRecord = computed(() => {
  if (!domain.value || !selector.value) {
    return '';
  }

  const pubKey = certs.value.publicKey.replace(/-----(BEGIN|END) PUBLIC KEY-----|\s/g, '');
  const parts = [
    'v=DKIM1',
    'k=rsa',
    `p=${pubKey}`,
  ];

  const record = parts.join('; ');
  return `${selector.value}._domainkey.${domain.value} IN TXT "${record}"`;
});
</script>

<template>
  <NForm label-placement="top">
    <NFormItem :label="t('tools.dkim-dns-generator.domain-label')">
      <NInput v-model:value="domain" :placeholder="t('tools.dkim-dns-generator.domain-placeholder')" />
    </NFormItem>

    <NFormItem :label="t('tools.dkim-dns-generator.selector-label')">
      <NInput v-model:value="selector" :placeholder="t('tools.dkim-dns-generator.selector-placeholder')" />
    </NFormItem>

    <NFormItem :label="t('tools.dkim-dns-generator.key-size-label')">
      <NSelect v-model:value="keySize" :options="keySizes" :placeholder="t('tools.dkim-dns-generator.key-size-placeholder')" />
    </NFormItem>

    <NFormItem :label="t('tools.dkim-dns-generator.passphrase-label')">
      <NInput
        v-model:value="password"
        type="password"
        show-password-on="mousedown"
        :placeholder="t('tools.dkim-dns-generator.passphrase-placeholder')"
      />
    </NFormItem>

    <div mb-2 flex justify-center>
      <n-button @click="refreshCerts()">
        {{ t('tools.dkim-dns-generator.refresh-button') }}
      </n-button>
    </div>

    <c-card :title="t('tools.dkim-dns-generator.dkim-record-title')" mb-1>
      <textarea-copyable :value="dKIMRecord" />
    </c-card>

    <c-card v-if="dKIMRecord" :title="t('tools.dkim-dns-generator.public-key-title')" mb-1>
      <textarea-copyable :value="certs.publicKey" />
    </c-card>

    <c-card v-if="dKIMRecord" :title="t('tools.dkim-dns-generator.private-key-title')">
      <textarea-copyable :value="certs.privateKey" />
    </c-card>
  </NForm>
</template>

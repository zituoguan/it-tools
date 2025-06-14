<script setup lang="ts">
import type { KeyEncoding } from './encryption.service';
import { algos } from './encryption.service';
import { computedCatch } from '@/composable/computed/catchedComputed';

const { t } = useI18n();

const cypherInput = ref('Lorem ipsum dolor sit amet');
const cypherAlgo = ref<keyof typeof algos>('AES-CBC');
const cypherSecret = ref('my secret key 16');
const cypherSecretEncoding = ref<KeyEncoding>('Text');
const [cypherOutput, cypherError] = computedCatch(() => algos[cypherAlgo.value].encrypt(cypherInput.value, cypherSecret.value, cypherSecretEncoding.value), {
  defaultValue: '',
  defaultErrorMessage: t('tools.encryption.defaultErrorMessage'),
});

const decryptInput = ref('dopEIE7v5TJlhHl+0+mA4Q+BxNj4xcdTsiVGw4tmpLlkDln8lzmzavO3egJuzpCD');
const decryptAlgo = ref<keyof typeof algos>('AES-CBC');
const decryptSecret = ref('my secret key 16');
const decryptSecretEncoding = ref<KeyEncoding>('Text');
const [decryptOutput, decryptError] = computedCatch(() => algos[decryptAlgo.value].decrypt(decryptInput.value, decryptSecret.value, decryptSecretEncoding.value), {
  defaultValue: '',
  defaultErrorMessage: t('tools.encryption.defaultErrorMessage'),
});
</script>

<template>
  <c-card :title="t('tools.encryption.title-encrypt')">
    <div flex gap-3>
      <c-input-text
        v-model:value="cypherInput"
        :label="t('tools.encryption.input-text-label')"
        :placeholder="t('tools.encryption.input-text-placeholder')"
        rows="4"
        multiline raw-text monospace autosize flex-1
      />
      <div flex flex-1 flex-col gap-2>
        <c-input-text v-model:value="cypherSecret" :label="t('tools.encryption.secret-key-label')" clearable raw-text />

        <c-select
          v-model:value="cypherSecretEncoding" :label="t('tools.encryption.key-encoding-label')"
          flex-1
          :placeholder="t('tools.encryption.key-encoding-placeholder')"
          :options="[
            {
              label: t('tools.encryption.plain-text'),
              value: 'Text',
            },
            {
              label: t('tools.encryption.hexadecimal-text'),
              value: 'Hex',
            },
          ]"
        />

        <c-select
          v-model:value="cypherAlgo"
          :label="t('tools.encryption.algorithm-label')"
          :options="Object.keys(algos).map((label) => ({ label, value: label }))"
        />
      </div>
    </div>
    <c-alert v-if="cypherError" type="error" mt-12 :title="t('tools.encryption.encrypt-error-title')">
      {{ cypherError }}
    </c-alert>
    <c-input-text
      :label="t('tools.encryption.encrypted-text-label')"
      :value="cypherOutput"
      rows="3"
      :placeholder="t('tools.encryption.encrypted-text-placeholder')"
      multiline monospace readonly autosize mt-5
    />
  </c-card>
  <c-card :title="t('tools.encryption.title-decrypt')">
    <div flex gap-3>
      <c-input-text
        v-model:value="decryptInput"
        :label="t('tools.encryption.encrypted-input-label')"
        :placeholder="t('tools.encryption.encrypted-input-placeholder')"
        rows="4"
        multiline raw-text monospace autosize flex-1
      />
      <div flex flex-1 flex-col gap-2>
        <c-input-text v-model:value="decryptSecret" :label="t('tools.encryption.secret-key-label')" clearable raw-text />

        <c-select
          v-model:value="decryptSecretEncoding" :label="t('tools.encryption.key-encoding-label')"
          flex-1
          :placeholder="t('tools.encryption.key-encoding-placeholder')"
          :options="[
            {
              label: t('tools.encryption.plain-text'),
              value: 'Text',
            },
            {
              label: t('tools.encryption.hexadecimal-text'),
              value: 'Hex',
            },
          ]"
        />

        <c-select
          v-model:value="decryptAlgo"
          :label="t('tools.encryption.algorithm-label')"
          :options="Object.keys(algos).map((label) => ({ label, value: label }))"
        />
      </div>
    </div>
    <c-alert v-if="decryptError" type="error" mt-12 :title="t('tools.encryption.decrypt-error-title')">
      {{ decryptError }}
    </c-alert>
    <c-input-text
      v-else
      :label="t('tools.encryption.decrypted-text-label')"
      :value="decryptOutput"
      :placeholder="t('tools.encryption.decrypted-text-placeholder')"
      rows="3"
      multiline monospace readonly autosize mt-5
    />
  </c-card>
</template>

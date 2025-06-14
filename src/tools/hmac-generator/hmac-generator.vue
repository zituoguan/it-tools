<script setup lang="ts">
import type { lib } from 'crypto-js';
import {
  HmacMD5,
  HmacRIPEMD160,
  HmacSHA1,
  HmacSHA224,
  HmacSHA256,
  HmacSHA3,
  HmacSHA384,
  HmacSHA512,
  enc,
} from 'crypto-js';

import { convertHexToBin } from '../hash-text/hash-text.service';
import { useCopy } from '@/composable/copy';

const { t } = useI18n();

const algos = {
  MD5: HmacMD5,
  RIPEMD160: HmacRIPEMD160,
  SHA1: HmacSHA1,
  SHA3: HmacSHA3,
  SHA224: HmacSHA224,
  SHA256: HmacSHA256,
  SHA384: HmacSHA384,
  SHA512: HmacSHA512,
} as const;

type Encoding = keyof typeof enc | 'Bin';
type KeyEncoding = 'Text' | 'Hex';

function formatWithEncoding(words: lib.WordArray, encoding: Encoding) {
  if (encoding === 'Bin') {
    return convertHexToBin(words.toString(enc.Hex));
  }
  return words.toString(enc[encoding]);
}

const plainText = ref('');
const secret = ref('');
const hashFunction = ref<keyof typeof algos>('SHA256');
const encoding = ref<Encoding>('Hex');
const keyEncoding = ref<KeyEncoding>('Text');
const hmac = computed(() => {
  // normalize secret according to the key encoding
  const key = keyEncoding.value === 'Text' ? secret.value : enc.Hex.parse(secret.value);
  return formatWithEncoding(algos[hashFunction.value](plainText.value, key), encoding.value);
});
const { copy } = useCopy({ source: hmac });
</script>

<template>
  <div flex flex-col gap-4>
    <c-input-text
      v-model:value="plainText"
      multiline
      raw-text
      :placeholder="t('tools.hmac-generator.plain_text_to_compute_hash')"
      rows="3"
      autosize
      autofocus
      :label="t('tools.hmac-generator.plain_text_to_compute_hash_label')"
    />
    <div flex gap-2>
      <c-input-text
        v-model:value="secret"
        :placeholder="t('tools.hmac-generator.enter_secret_key')"
        :label="t('tools.hmac-generator.secret_key')"
        raw-text
        clearable
        flex-1
      />
      <c-select
        v-model:value="keyEncoding"
        :label="t('tools.hmac-generator.key_encoding')"
        flex-1
        :placeholder="t('tools.hmac-generator.select_key_encoding')"
        :options="[
          {
            label: t('tools.hmac-generator.plain_text'),
            value: 'Text',
          },
          {
            label: t('tools.hmac-generator.hexadecimal_text'),
            value: 'Hex',
          },
        ]"
      />
    </div>
    <div flex gap-2>
      <c-select
        v-model:value="hashFunction"
        :label="t('tools.hmac-generator.hashing_function')"
        flex-1
        :placeholder="t('tools.hmac-generator.select_hashing_function')"
        :options="Object.keys(algos).map((label) => ({ label, value: label }))"
      />
      <c-select
        v-model:value="encoding"
        :label="t('tools.hmac-generator.output_encoding')"
        flex-1
        :placeholder="t('tools.hmac-generator.select_result_encoding')"
        :options="[
          {
            label: t('tools.hmac-generator.binary_base_2'),
            value: 'Bin',
          },
          {
            label: t('tools.hmac-generator.hexadecimal_base_16'),
            value: 'Hex',
          },
          {
            label: t('tools.hmac-generator.base64_base_64'),
            value: 'Base64',
          },
          {
            label: t('tools.hmac-generator.base64_url_safe'),
            value: 'Base64url',
          },
        ]"
      />
    </div>
    <input-copyable
      v-model:value="hmac"
      type="textarea"
      :placeholder="t('tools.hmac-generator.result_of_hmac')"
      :label="t('tools.hmac-generator.hmac_of_your_text')"
    />
    <div flex justify-center>
      <c-button @click="copy()">
        {{ t('tools.hmac-generator.copy_hmac') }}
      </c-button>
    </div>
  </div>
</template>

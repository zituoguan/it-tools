<script setup lang="ts">
import { Base64 } from 'js-base64';
import hexArray from 'hex-array';
import { useCopy } from '@/composable/copy';
import { isValidBase64 } from '@/utils/base64';

const { t } = useI18n();

const textInput = ref('');
const base64Output = computed(() => {
  try {
    return Base64.fromUint8Array(hexArray.fromString(textInput.value));
  }
  catch (e: any) {
    return e.toString();
  }
});
const { copy: copyTextBase64 } = useCopy({ source: base64Output, text: t('tools.base64-hex-converter.base64HexArrayCopied') });

const uppercase = ref(false);
const grouping = ref(0);
const rowlength = ref(0);

const base64Input = ref('');
const textOutput = computed(() => {
  try {
    return hexArray.toString(Base64.toUint8Array(base64Input.value), {
      uppercase: uppercase.value,
      grouping: grouping.value,
      rowlength: rowlength.value,
    });
  }
  catch (e: any) {
    return e.toString();
  }
},
);
const { copy: copyText } = useCopy({ source: textOutput, text: t('tools.base64-hex-converter.hexArrayCopied') });
const b64ValidationRules = [
  {
    message: t('tools.base64-hex-converter.invalidBase64'),
    validator: (value: string) => isValidBase64(value.trim()),
  },
];
</script>

<template>
  <c-card :title="t('tools.base64-hex-converter.hexArrayToBase64Title')">
    <c-input-text
      v-model:value="textInput"
      multiline
      :placeholder="t('tools.base64-hex-converter.hexArrayPlaceholder')"
      rows="5"
      :label="t('tools.base64-hex-converter.hexArrayToEncodeLabel')"
      raw-text
      mb-5
    />

    <c-input-text
      :label="t('tools.base64-hex-converter.base64OfHexArrayLabel')"
      :value="base64Output"
      multiline
      readonly
      :placeholder="t('tools.base64-hex-converter.base64OfHexArrayPlaceholder')"
      rows="5"
      mb-5
    />

    <div flex justify-center>
      <c-button @click="copyTextBase64()">
        {{ t('tools.base64-hex-converter.copyBase64Button') }}
      </c-button>
    </div>
  </c-card>

  <c-card :title="t('tools.base64-hex-converter.base64ToHexArrayTitle')">
    <n-space align="baseline" justify="center" mb-1>
      <n-form-item :label="t('tools.base64-hex-converter.uppercaseLabel')" label-placement="left">
        <n-switch v-model:value="uppercase" />
      </n-form-item>
      <n-form-item :label="t('tools.base64-hex-converter.groupByLabel')" label-placement="left">
        <n-input-number v-model:value="grouping" :min="0" style="width: 6em" mr-1 /> {{ t('tools.base64-hex-converter.digitsLabel') }}
      </n-form-item>
      <n-form-item :label="t('tools.base64-hex-converter.splitAsRowsByLabel')" label-placement="left">
        <n-input-number v-model:value="rowlength" :min="0" style="width: 6em" mr-1 /> {{ t('tools.base64-hex-converter.groupOfDigitsLabel') }}
      </n-form-item>
    </n-space>
    <c-input-text
      v-model:value="base64Input"
      multiline
      :placeholder="t('tools.base64-hex-converter.base64HexArrayPlaceholder')"
      rows="5"
      :validation-rules="b64ValidationRules"
      :label="t('tools.base64-hex-converter.base64HexArrayToDecodeLabel')"
      mb-5
    />

    <c-input-text
      v-model:value="textOutput"
      :label="t('tools.base64-hex-converter.decodedHexArrayLabel')"
      :placeholder="t('tools.base64-hex-converter.decodedHexArrayPlaceholder')"
      multiline
      rows="5"
      readonly
      mb-5
    />

    <div flex justify-center>
      <c-button @click="copyText()">
        {{ t('tools.base64-hex-converter.copyDecodedHexArrayButton') }}
      </c-button>
    </div>
  </c-card>
</template>

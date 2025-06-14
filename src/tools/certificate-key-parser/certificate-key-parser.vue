<script setup lang="ts">
import { Buffer } from 'node:buffer';

import { getKeysOrCertificatesInfosAsync } from './certificate-key-parser.service';
import { type LabelValue } from './certificate-key-parser.infos';
import { useDownloadFileFromBase64 } from '@/composable/downloadBase64';

const inputKeyOrCertificate = ref('');
const passphrase = ref('');
const fileInput = ref() as Ref<Buffer>;
const inputType = ref<'file' | 'content'>('file');

async function onUpload(file: File) {
  if (file) {
    fileInput.value = Buffer.from(await file.arrayBuffer());
    inputKeyOrCertificate.value = '';
  }
}

const certificateX509DER = ref('');
const { download: downloadX509DER } = useDownloadFileFromBase64(
  {
    source: certificateX509DER,
    extension: 'der',
  });

const { t } = useI18n();

function downloadX509DERFile() {
  if (certificateX509DER.value === '') {
    return;
  }

  try {
    downloadX509DER();
  }
  catch (_) {
    //
  }
}

const parsedSections = computedAsync<LabelValue[][]>(async () => {
  const inputContent = inputKeyOrCertificate.value;
  const file = fileInput.value;
  let inputKeyOrCertificateValue: string | Buffer = '';
  if (inputType.value === 'file' && file) {
    inputKeyOrCertificateValue = file;
  }
  else if (inputType.value === 'content' && inputContent) {
    inputKeyOrCertificateValue = inputContent;
  }
  try {
    const parsed = await getKeysOrCertificatesInfosAsync(inputKeyOrCertificateValue, passphrase.value);
    if (parsed.length === 1) {
      const { values, certificateX509DER: certPEM } = parsed[0];
      certificateX509DER.value = certPEM || '';
      return [values];
    }
    else {
      return parsed.map(p => p.values);
    }
  }
  catch (e: any) {
    return [
      [{ label: t('tools.certificate-key-parser.parsingError'), value: e.toString() }],
    ];
  }
});
</script>

<template>
  <div>
    <c-card>
      <n-radio-group v-model:value="inputType" name="radiogroup" mb-2 flex justify-center>
        <n-space>
          <n-radio
            value="file"
            :label="t('tools.certificate-key-parser.file')"
          />
          <n-radio
            value="content"
            :label="t('tools.certificate-key-parser.content')"
          />
        </n-space>
      </n-radio-group>

      <c-file-upload
        v-if="inputType === 'file'"
        :title="t('tools.certificate-key-parser.dragAndDrop')"
        @file-upload="onUpload"
      />

      <c-input-text
        v-if="inputType === 'content'"
        v-model:value="inputKeyOrCertificate"
        :label="t('tools.certificate-key-parser.pasteYourKey')"
        :placeholder="t('tools.certificate-key-parser.yourKeyPlaceholder')"
        multiline
        rows="8"
        data-test-id="input"
      />
    </c-card>

    <c-input-text
      v-model:value="passphrase"
      :label="t('tools.certificate-key-parser.passphraseLabel')"
      :placeholder="t('tools.certificate-key-parser.passphrasePlaceholder')"
      type="password"
      data-test-id="pass"
    />

    <n-divider />

    <c-card
      v-for="(part, partIndex) of parsedSections"
      :key="partIndex"
      mb-2
    >
      <input-copyable
        v-for="{ label, value, multiline } of part"
        :key="label"
        :label="label"
        :data-test-id="label"
        label-position="left"
        label-width="100px"
        label-align="right"

        autosize mb-2
        :multiline="multiline"
        :value="value"
        :placeholder="t('tools.certificate-key-parser.notSet')"
      />
    </c-card>

    <div v-if="certificateX509DER !== ''" flex justify-center>
      <c-button @click="downloadX509DERFile()">
        {{ t('tools.certificate-key-parser.downloadX509DER') }}
      </c-button>
    </div>
  </div>
</template>

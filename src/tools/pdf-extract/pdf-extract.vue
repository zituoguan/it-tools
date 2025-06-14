<script setup lang="ts">
import { Base64 } from 'js-base64';
import createQPDFModule from 'qpdf-wasm-esm-embedded';
import { useDownloadFileFromBase64 } from '@/composable/downloadBase64';

const { t } = useI18n();

const status = ref<'idle' | 'done' | 'error' | 'processing'>('idle');
const file = ref<File | null>(null);

const extractRange = ref('');

const base64OutputPDF = ref('');
const logs = ref<string[]>([]);
const fileName = ref('');
const { download } = useDownloadFileFromBase64(
  {
    source: base64OutputPDF,
    filename: fileName,
    extension: 'pdf',
  });
const qpdfCommand = ref('');

function onFileUploaded(uploadedFile: File) {
  file.value = uploadedFile;
  fileName.value = `extract_${file.value.name}`;
}

async function onProcessClicked() {
  if (!file.value) {
    return;
  }
  const fileBuffer = await file.value.arrayBuffer();

  status.value = 'processing';
  try {
    const options = [
      'in.pdf',
      '--verbose',
      '--pages',
      '.',
      `${extractRange.value}`,
      '--',
      'out.pdf',
    ];
    const outPdfBuffer = await callMainWithInOutPdf(fileBuffer,
      options, 0);
    base64OutputPDF.value = `data:application/pdf;base64,${Base64.fromUint8Array(outPdfBuffer)}`;
    status.value = 'done';

    download();
  }
  catch (e) {
    status.value = 'error';
  }
}

async function callMainWithInOutPdf(data: ArrayBuffer, args: string[], expected_exitcode: number) {
  qpdfCommand.value = args.join(' ');
  logs.value = [];
  const mod = await createQPDFModule({
    print(text: string) {
      logs.value.push(text);
    },
    printErr(text: string) {
      logs.value.push(text);
    },
  });
  mod.FS.writeFile('in.pdf', new Uint8Array(data));
  const ret = mod.callMain(args);
  if (expected_exitcode !== ret) {
    throw new Error('Process run failed');
  }
  return mod.FS.readFile('out.pdf');
}
</script>

<template>
  <div>
    <div style="flex: 0 0 100%">
      <div mx-auto max-w-600px>
        <c-file-upload
          :title="t('tools.pdf-extract.upload-title')"
          accept=".pdf"
          @file-upload="onFileUploaded"
        />
        <div mt-2 text-center>
          <c-input-text :value="fileName" :label="t('tools.pdf-extract.output-file')" label-position="left" />
        </div>
      </div>
    </div>

    <c-card :title="t('tools.pdf-extract.range-title')" mb-3 mt-3>
      <c-input-text
        v-model:value="extractRange"
        :label="t('tools.pdf-extract.range')"
        :placeholder="t('tools.pdf-extract.range-placeholder')"
        mb-2
      />
      <n-p>
        {{ t('tools.pdf-extract.range-tip') }}
        <n-a target="_blank" href="https://qpdf.readthedocs.io/en/stable/cli.html#page-selection">
          QPDF Documentation
        </n-a>
      </n-p>
    </c-card>

    <div mt-3 flex justify-center>
      <c-button :disabled="!file" @click="onProcessClicked()">
        {{ t('tools.pdf-extract.extract-btn') }}
      </c-button>
    </div>

    <n-divider />

    <div mt-3 flex justify-center>
      <c-alert v-if="status === 'error'" type="error">
        {{ t('tools.pdf-extract.error', { file: fileName }) }}
      </c-alert>
      <n-spin
        v-if="status === 'processing'"
        size="small"
      />
    </div>

    <c-card :title="t('tools.pdf-extract.logs')">
      <input-copyable label="qpdf" :value="qpdfCommand" mb-1 />
      <pre>{{ logs.join('\n') }}</pre>
    </c-card>
  </div>
</template>

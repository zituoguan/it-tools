<script setup lang="ts">
import { Buffer } from 'node:buffer';
import type { Ref } from 'vue';
import { useCopy } from '@/composable/copy';
import { useDownloadFileFromBase64 } from '@/composable/downloadBase64';

const { t } = useI18n();

const fileName = ref('');
const fileExtension = ref('');
const hexInput = ref('');
const base64Input = computed(() => {
  const hexString = hexInput.value?.replace(/^(?:0x|&H|\\x)/gi, '').replace(/[^\da-f]/gi, '');
  try {
    return `data:application/octet-stream;base64,${Buffer.from(hexString, 'hex').toString('base64')}`;
  }
  catch {
    return '';
  }
});
const { download } = useDownloadFileFromBase64(
  {
    source: base64Input,
    filename: fileName,
    extension: fileExtension,
  });

function downloadFile() {
  try {
    download();
  }
  catch (_) {
    //
  }
}

function buf2hex(buffer: ArrayBuffer, separator: string): string {
  return [...new Uint8Array(buffer)]
    .map(x => x.toString(16).padStart(2, '0'))
    .join(separator);
}

async function ReadFileAsHex(file: File, separator: string = ' '): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(buf2hex(reader.result as ArrayBuffer, separator));
    };
    reader.onerror = () => reject(reader.error?.toString());
    reader.readAsArrayBuffer(file);
  });
}

const separator = useStorage('hex-converter:sep', ' ');
const fileInput = ref() as Ref<File>;
const prefix = useStorage('hex-converter:prefix', '');
const fileHex = computedAsync(async () => {
  const file = fileInput.value;
  const sep = separator.value;
  const pref = prefix.value;

  return pref + await ReadFileAsHex(file, sep);
});
const { copy: copyFileHex } = useCopy({ source: fileHex, text: t('tools.hex-file-converter.hex_string_copied_to_clipboard') });

function onUpload(file: File) {
  if (file) {
    fileInput.value = file;
  }
}
</script>

<template>
  <c-card :title="t('tools.hex-file-converter.hex_to_file')">
    <n-grid cols="3" x-gap="12">
      <n-gi span="2">
        <c-input-text
          v-model:value="fileName"
          :label="t('tools.hex-file-converter.file_name')"
          :placeholder="t('tools.hex-file-converter.download_filename')"
          mb-2
        />
      </n-gi>
      <n-gi>
        <c-input-text
          v-model:value="fileExtension"
          :label="t('tools.hex-file-converter.extension')"
          :placeholder="t('tools.hex-file-converter.extension')"
        />
      </n-gi>
    </n-grid>

    <n-form-item :label="t('tools.hex-file-converter.content_in_hex')">
      <c-input-text
        v-model:value="hexInput"
        multiline
        :placeholder="t('tools.hex-file-converter.put_your_hex_file_string_here')"
        rows="5"
      />
    </n-form-item>

    <n-divider />

    <div flex justify-center>
      <c-button :disabled="hexInput === ''" @click="downloadFile()">
        {{ t('tools.hex-file-converter.download_file') }}
      </c-button>
    </div>
  </c-card>

  <c-card :title="t('tools.hex-file-converter.file_to_hex')">
    <c-file-upload
      :title="t('tools.hex-file-converter.drag_and_drop_file')"
      mb-2
      @file-upload="onUpload"
    />

    <c-input-text
      v-model:value="separator"
      :label="t('tools.hex-file-converter.separator')"
      label-position="left"
      :placeholder="t('tools.hex-file-converter.separator')"
      mb-2
    />

    <c-input-text
      v-model:value="prefix"
      :label="t('tools.hex-file-converter.prefix')"
      label-position="left"
      :placeholder="t('tools.hex-file-converter.enter_prefix')"
      mb-2
    />

    <n-divider />

    <n-form-item :label="t('tools.hex-file-converter.file_in_hex')">
      <c-input-text
        :value="fileHex"
        multiline readonly
        :placeholder="t('tools.hex-file-converter.file_in_hex_will_be_here')"
        rows="5" mb-2
      />
    </n-form-item>

    <div flex justify-center>
      <c-button @click="copyFileHex()">
        {{ t('tools.hex-file-converter.copy') }}
      </c-button>
    </div>
  </c-card>
</template>

<style lang="less" scoped>
::v-deep(.n-upload-trigger) {
  width: 100%;
}
</style>

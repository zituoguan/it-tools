<script setup lang="ts">
import { mergeIcals } from './ical-merger.service';

const { t } = useI18n();

const fileInputs = ref<Array<File>>([]);
const mergedOutput = ref('');
const calendarName = ref('');
const calendarDescription = ref('');
const errors = ref('');

function onUploads(files: Array<File>) {
  fileInputs.value = [...fileInputs.value, ...files];
}
function deleteFile(index: number) {
  fileInputs.value.splice(index, 1);
}
async function mergeFiles() {
  const fileBuffers: Array<string> = [];
  for (const file of fileInputs.value) {
    fileBuffers.push(await readFileAsString(file));
  }
  errors.value = '';
  mergedOutput.value = '';
  try {
    mergedOutput.value = mergeIcals(fileBuffers);
  }
  catch (e: any) {
    errors.value = e.toString();
  }
}

function readFileAsString(file: File) {
  return new Promise<string>((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => {
      resolve(fr.result as string || '');
    };
    fr.onerror = reject;
    fr.readAsText(file);
  });
}
</script>

<template>
  <div>
    <c-file-upload
      :title="t('tools.ical-merger.uploadTitle')"
      multiple
      mb-2
      @files-upload="onUploads"
    />

    <n-form-item :label="t('tools.ical-merger.icalTitle')" label-placement="left">
      <n-input v-model:value="calendarName" :placeholder="t('tools.ical-merger.titlePlaceholder')" />
    </n-form-item>

    <n-form-item :label="t('tools.ical-merger.icalDescription')">
      <n-input v-model:value="calendarDescription" :placeholder="t('tools.ical-merger.descriptionPlaceholder')" />
    </n-form-item>

    <ul>
      <li v-for="(file, index) in fileInputs" :key="index" mb-1>
        <n-button mr-2 @click="deleteFile(index)">
          {{ t('tools.ical-merger.delete') }}
        </n-button>
        {{ t('tools.ical-merger.fileToMerge') }}: {{ file.name }}
      </li>
    </ul>

    <div flex justify-center>
      <n-button @click="mergeFiles">
        {{ t('tools.ical-merger.mergeFiles') }}
      </n-button>
    </div>

    <n-divider />

    <c-alert v-if="errors" mb-2>
      {{ errors }}
    </c-alert>

    <textarea-copyable
      v-if="mergedOutput"
      v-model:value="mergedOutput"
      download-file-name="merge.ics"
      :download-button-text="t('tools.ical-merger.downloadMerged')"
      :label="t('tools.ical-merger.mergedICAL')"
      mb-2
    />
  </div>
</template>

<style lang="less" scoped>
::v-deep(.n-upload-trigger) {
  width: 100%;
}
</style>

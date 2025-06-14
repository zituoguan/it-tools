<script setup lang="ts">
import JSON5 from 'json5';
import { useStorage } from '@vueuse/core';
import { formatJson } from './json.models';
import { withDefaultOnError } from '@/utils/defaults';
import { useValidation } from '@/composable/validation';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

const { t } = useI18n();
const inputElement = ref<HTMLElement>();

const rawJson = useStorage('json-prettify:raw-json', '{"hello": "world", "foo": "bar"}');
const sortMethod = useStorage('json-prettify:sort-method', 'key_name');
const indentSize = useStorage('json-prettify:indent-size', 3);
const keyName = ref('');
const cleanJson = computed(() => withDefaultOnError(() => formatJson({ rawJson, sortMethod, keyName, indentSize }), ''));

const sortOptions = computed(() => [
  {
    label: t('tools.json-sort-master.keyName'),
    value: 'key_name',
  },
  {
    label: t('tools.json-sort-master.keyValue'),
    value: 'key_val',
  },
  {
    label: t('tools.json-sort-master.keyNameDesc'),
    value: 'key_name_desc',
  },
  {
    label: t('tools.json-sort-master.keyValueDesc'),
    value: 'key_val_desc',
  },
]);

const rawJsonValidation = useValidation({
  source: rawJson,
  rules: [
    {
      validator: v => v === '' || JSON5.parse(v),
      message: t('tools.json-sort-master.validationError'),
    },
  ],
});
</script>

<template>
  <div style="flex: 0 0 100%">
    <div style="margin: 0 auto; max-width: 400px" flex justify-center gap-3>
      <c-select
        v-model:value="sortMethod" mb-4 style="width: 200px" :label="t('tools.json-sort-master.sortMethod')" :options="sortOptions"
      />

      <c-input-text v-if="!['key_name', 'key_name_desc'].includes(sortMethod)" v-model:value="keyName" :label="t('tools.json-sort-master.keyNameLabel')" style="width: 200px" clearable raw-text />
    </div>
  </div>

  <n-form-item
    :label="t('tools.json-sort-master.rawJsonLabel')" :feedback="rawJsonValidation.message"
    :validation-status="rawJsonValidation.status"
  >
    <c-input-text
      ref="inputElement" v-model:value="rawJson" :placeholder="t('tools.json-sort-master.rawJsonPlaceholder')" rows="20"
      multiline autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" monospace
    />
  </n-form-item>
  <n-form-item :label="t('tools.json-sort-master.sortedJsonLabel')">
    <TextareaCopyable :value="cleanJson" language="json" :follow-height-of="inputElement" />
  </n-form-item>
</template>

<style lang="less" scoped>
.result-card {
  position: relative;

  .copy-button {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>

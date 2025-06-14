<script setup lang="ts">
import JSON5 from 'json5';
import { flatten } from 'flatten-anything';
import { objectArrayToData } from '@/utils/objectarray.export';
import type { UseValidationRule } from '@/composable/validation';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

const { t } = useI18n();

const defaultValue = `{
  a:"n",
  arr: [1, 2], 
  nested: {
    a:1,
    b:"2"
  }
}`;
const jsonInput = ref(defaultValue);
const tableName = ref<string>('TableName');

const sqlOutput = computed(() => {
  try {
    let arr = JSON5.parse(jsonInput.value);
    if (!Array.isArray(arr)) {
      arr = [arr];
    }
    return objectArrayToData(arr.map((o: any) => flatten(o)), 'sql', { tableName: tableName.value });
  }
  catch (e: any) {
    return e.toString();
  }
});

const rules: UseValidationRule<string>[] = [
  {
    validator: (v: string) => v === '' || JSON5.parse(v),
    message: t('tools.json-to-sql-insert.invalid-json'),
  },
];
</script>

<template>
  <c-card :title="t('tools.json-to-sql-insert.card-title')">
    <c-input-text v-model:value="tableName" :label="t('tools.json-to-sql-insert.table-name-label')" label-placement="left" mb-1 />
    <c-input-text
      v-model:value="jsonInput"
      multiline
      :placeholder="t('tools.json-to-sql-insert.input-placeholder')"
      rows="20"
      :label="t('tools.json-to-sql-insert.input-label')"
      :validation-rules="rules"
      raw-text
    />
  </c-card>
  <c-card :title="t('tools.json-to-sql-insert.output-card-title')">
    <TextareaCopyable
      :value="sqlOutput"
      language="sql"
    />
  </c-card>
</template>

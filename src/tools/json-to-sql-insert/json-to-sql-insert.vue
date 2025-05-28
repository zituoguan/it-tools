<script setup lang="ts">
import JSON5 from 'json5';
import { flatten } from 'flatten-anything';
import { objectArrayToData } from '@/utils/objectarray.export';
import type { UseValidationRule } from '@/composable/validation';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

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
    message: 'Provided JSON is not valid.',
  },
];
</script>

<template>
  <c-card title="JSON to SQL INSERT">
    <c-input-text v-model:value="tableName" label="Table Name:" label-placement="left" mb-1 />
    <c-input-text
      v-model:value="jsonInput"
      multiline
      placeholder="Put your json string here..."
      rows="20"
      label="JSON:"
      :validation-rules="rules"
      raw-text
    />
  </c-card>
  <c-card title="Your SQL INSERT code">
    <TextareaCopyable
      :value="sqlOutput"
      language="sql"
    />
  </c-card>
</template>

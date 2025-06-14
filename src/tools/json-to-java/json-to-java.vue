<script setup lang="ts">
import JSON5 from 'json5';
import { convert } from './json-to-java.service';
import type { UseValidationRule } from '@/composable/validation';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

const { t } = useI18n();

const jsonInput = ref('');
const clazzInput = ref('Result');
const goOutput = computed(() => {
  return jsonInput.value ? convert(clazzInput.value, jsonInput.value) : '';
});

const rules: UseValidationRule<string>[] = [
  {
    validator: (v: string) => v === '' || JSON5.parse(v),
    message: t('tools.json-to-java.invalid-json'),
  },
];
</script>

<template>
  <c-card :title="t('tools.json-to-java.card-title')">
    <c-input-text
      v-model:value="clazzInput"
      :placeholder="t('tools.json-to-java.class-name-placeholder')"
      raw-text
      :label="t('tools.json-to-java.class-name-label')"
      label-position="left"
      label-width="50px"
      mb-2
    />
    <c-input-text
      v-model:value="jsonInput"
      multiline
      :placeholder="t('tools.json-to-java.input-placeholder')"
      rows="20"
      :label="t('tools.json-to-java.input-label')"
      :validation-rules="rules"
      raw-text
      mb-5
    />
  </c-card>
  <c-card :title="t('tools.json-to-java.output-card-title')">
    <TextareaCopyable
      :value="goOutput"
      language="json"
    />
  </c-card>
</template>

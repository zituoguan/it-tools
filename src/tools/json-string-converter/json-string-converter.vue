<script setup lang="ts">
import type { UseValidationRule } from '@/composable/validation';
import { withDefaultOnError } from '@/utils/defaults';

const { t } = useI18n();
const defaultValue = '{\n\t"hello": [\n\t\t"world"\n\t]\n}';

// Define a reactive variable to track the selected transformation mode
const selectedMode = ref('stringify');

// Create functions for both stringification and parsing
const stringifyTransformer = (value: string) => withDefaultOnError(() => JSON.stringify(value), '');
const parseTransformer = (value: string) => withDefaultOnError(() => JSON.parse(value).toString(), '');

// Dynamically select the transformer based on the selected mode
const transformer = computed(() => {
  if (selectedMode.value === 'stringify') {
    return stringifyTransformer;
  }
  else {
    return parseTransformer;
  }
});

const rules: UseValidationRule<string>[] = [
  {
    validator: (v: string) => v === '' || (selectedMode.value === 'stringify' ? JSON.stringify(v) : JSON.parse(v)),
    message: t('tools.json-string-converter.validationError'),
  },
];

// Dropdown options
const dropdownOptions = computed(() => [
  { label: t('tools.json-string-converter.jsonStringify'), value: 'stringify' },
  { label: t('tools.json-string-converter.jsonParse'), value: 'parse' },
]);
</script>

<template>
  <c-card>
    <c-select
      v-model:value="selectedMode"
      :label="t('tools.json-string-converter.transformationMode')"
      :options="dropdownOptions"
    />
  </c-card>
  <div />
  <format-transformer
    :input-label="t('tools.json-string-converter.inputLabel')"
    :input-default="defaultValue"
    :input-placeholder="t('tools.json-string-converter.inputPlaceholder')"
    :output-label="t('tools.json-string-converter.outputLabel')"
    output-language="string"
    :input-validation-rules="rules"
    :transformer="transformer"
  />
</template>

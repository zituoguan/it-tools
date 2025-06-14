<script setup lang="ts">
import jsonar from 'jsonar-mod';
import JSON5 from 'json5';
import type { UseValidationRule } from '@/composable/validation';
import { withDefaultOnError } from '@/utils/defaults';

const { t } = useI18n();

const defaultValue = `{
  a:"b", 
  arr: [1, "2"], 
  nested: {
    c:12, 
    d: "az"
  }
}`;
function transformer(value: string) {
  return withDefaultOnError(() => jsonar.arrify(JSON5.parse(value), { prettify: true }), '');
}

const rules: UseValidationRule<string>[] = [
  {
    validator: (v: string) => JSON5.parse(v),
    message: t('tools.json-to-php-array.invalid-json'),
  },
];
</script>

<template>
  <format-transformer
    :input-label="t('tools.json-to-php-array.input-label')"
    :input-default="defaultValue"
    :input-placeholder="t('tools.json-to-php-array.input-placeholder')"
    :output-label="t('tools.json-to-php-array.output-label')"
    :input-validation-rules="rules"
    :transformer="transformer"
  />
</template>

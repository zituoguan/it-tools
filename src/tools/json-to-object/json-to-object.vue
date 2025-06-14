<script setup lang="ts">
import JSON5 from 'json5';
import stringifyObject from 'stringify-object';
import type { UseValidationRule } from '@/composable/validation';
import { isNotThrowing } from '@/utils/boolean';
import { withDefaultOnError } from '@/utils/defaults';

const { t } = useI18n();

function transformer(value: string) {
  return withDefaultOnError(() => stringifyObject(JSON5.parse(value), {
    indent: '  ',
    singleQuotes: false,
  }), '');
}

const rules: UseValidationRule<string>[] = [
  {
    validator: (value: string) => value === '' || isNotThrowing(() => stringifyObject(JSON5.parse(value))),
    message: t('tools.json-to-object.invalid-json'),
  },
];
</script>

<template>
  <format-transformer
    :input-label="t('tools.json-to-object.input-label')"
    :input-placeholder="t('tools.json-to-object.input-placeholder')"
    :output-label="t('tools.json-to-object.output-label')"
    output-language="js"
    :input-validation-rules="rules"
    :transformer="transformer"
  />
</template>

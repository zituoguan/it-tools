<script setup lang="ts">
import { stringify } from 'yaml';
import JSON5 from 'json5';
import type { UseValidationRule } from '@/composable/validation';
import { isNotThrowing } from '@/utils/boolean';
import { withDefaultOnError } from '@/utils/defaults';

const { t } = useI18n();

const transformer = (value: string) => withDefaultOnError(() => stringify(JSON5.parse(value)), '');

const rules: UseValidationRule<string>[] = [
  {
    validator: (value: string) => value === '' || isNotThrowing(() => stringify(JSON5.parse(value))),
    message: t('tools.json-to-yaml-converter.validation-error'),
  },
];
</script>

<template>
  <format-transformer
    :input-label="t('tools.json-to-yaml-converter.input-label')"
    :input-placeholder="t('tools.json-to-yaml-converter.input-placeholder')"
    :output-label="t('tools.json-to-yaml-converter.output-label')"
    output-language="yaml"
    :input-validation-rules="rules"
    :transformer="transformer"
    download-file-name="output.yaml"
  />
</template>

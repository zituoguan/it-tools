<script setup lang="ts">
import jsonar from 'jsonar-mod';
import type { UseValidationRule } from '@/composable/validation';
import { withDefaultOnError } from '@/utils/defaults';

const { t } = useI18n();

const defaultValue = `array(
  "a" => "b",
  "arr" => array(
    1,
    "2"
  ),
  "nested" => array(
    "c" => 12,
    "d" => "az"
  )
);`;
function transformer(value: string) {
  return withDefaultOnError(() => JSON.stringify(jsonar.parse(value), null, 2), '');
}

const rules: UseValidationRule<string>[] = [
  {
    validator: (v: string) => v === '' || jsonar.parse(v),
    message: t('tools.php-array-to-json.invalid'),
  },
];
</script>

<template>
  <format-transformer
    :input-label="t('tools.php-array-to-json.input-label')"
    :input-default="defaultValue"
    :input-placeholder="t('tools.php-array-to-json.input-placeholder')"
    :output-label="t('tools.php-array-to-json.output-label')"
    output-language="json"
    :input-validation-rules="rules"
    :transformer="transformer"
  />
</template>

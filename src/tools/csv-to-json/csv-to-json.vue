<script setup lang="ts">
import { convertCsvToArray } from './csv-to-json.service';
import FormatTransformer from '@/components/FormatTransformer.vue';
import type { UseValidationRule } from '@/composable/validation';
import { withDefaultOnError } from '@/utils/defaults';

const { t } = useI18n();

const typedValues = ref(false);

function transformer(value: string) {
  return withDefaultOnError(() => {
    if (value === '') {
      return '';
    }
    return JSON.stringify(convertCsvToArray(value, typedValues.value), null, 2);
  }, '');
}

const rules: UseValidationRule<string>[] = [
  {
    validator: (v: string) => v === '' || ((v.includes(',') || v.includes(';') || v.includes('\t') || v.includes('|')) && v.includes('\n')),
    message: t('tools.csv-to-json.validation.invalid-csv'),
  },
];
</script>

<template>
  <n-form-item :label="t('tools.csv-to-json.options.typed-values')" label-placement="left">
    <n-checkbox v-model:checked="typedValues" />
  </n-form-item>
  <FormatTransformer
    :input-label="t('tools.csv-to-json.input.label')"
    :input-placeholder="t('tools.csv-to-json.input.placeholder')"
    :output-label="t('tools.csv-to-json.output.label')"
    :input-validation-rules="rules"
    :transformer="transformer"
  />
</template>

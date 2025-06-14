<script setup lang="ts">
import { getTextFromHtml, validateHtml } from './extract-text-from-html.service';
import { withDefaultOnError } from '@/utils/defaults';
import type { UseValidationRule } from '@/composable/validation';

const { t } = useI18n();

function transformer(value: string) {
  return withDefaultOnError(() => {
    if (value === '') {
      return '';
    }
    return getTextFromHtml(value);
  }, '');
}

const rules: UseValidationRule<string>[] = [
  {
    validator: (value: string) => value === '' || validateHtml(value),
    message: t('tools.extract-text-from-html.invalid-html'),
  },
];
</script>

<template>
  <format-transformer
    :input-label="t('tools.extract-text-from-html.input-label')"
    :input-placeholder="t('tools.extract-text-from-html.input-placeholder')"
    :output-label="t('tools.extract-text-from-html.output-label')"
    :input-validation-rules="rules"
    :transformer="transformer"
  />
</template>

<script setup lang="ts">
import _ from 'lodash';
import { useQueryParamOrStorage } from '@/composable/queryParams';
import { useValidation } from '@/composable/validation';

const { t } = useI18n();

const input = ref('');
const cleaningRegex = useQueryParamOrStorage({ name: 'clean', storageName: 'dedup:clean', defaultValue: '' });
const regexValidation = useValidation({
  source: cleaningRegex,
  rules: [
    {
      message: t('tools.duplicate-line-finder.invalid-regex'),
      validator: value => new RegExp(value),
      getErrorMessage: (value) => {
        const _ = new RegExp(value);
        return '';
      },
    },
  ],
});

const duplicatedLines = computed(() => {
  const clean = new RegExp(cleaningRegex.value, 'g');
  const lines = input.value.split('\n');
  return _.uniq(_.filter(lines.map(val => val.replace(clean, '')), (val, i, iteratee) => val && _.includes(iteratee, val, i + 1))).join('\n');
});
</script>

<template>
  <div>
    <c-input-text
      v-model:value="input"
      :placeholder="t('tools.duplicate-line-finder.input-placeholder')"
      raw-text
      multiline
      rows="10"
      :label="t('tools.duplicate-line-finder.input-label')"
      mb-2
    />
    <c-input-text
      v-model:value="cleaningRegex"
      :placeholder="t('tools.duplicate-line-finder.regex-placeholder')"
      raw-text
      :label="t('tools.duplicate-line-finder.regex-label')"
      label-position="left"
      label-align="right"
      label-width="120px"
      :validation="regexValidation"
      mb-2
    />

    <n-form-item :label="t('tools.duplicate-line-finder.output-label')">
      <textarea-copyable :value="duplicatedLines" />
    </n-form-item>
  </div>
</template>

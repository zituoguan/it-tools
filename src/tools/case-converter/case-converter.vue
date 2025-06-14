<script setup lang="ts">
import {
  camelCase,
  capitalCase,
  constantCase,
  dotCase,
  kebabCase,
  noCase,
  pascalCase,
  pathCase,
  sentenceCase,
  snakeCase,
  trainCase,
} from 'change-case';
import InputCopyable from '../../components/InputCopyable.vue';
import { useQueryParamOrStorage } from '@/composable/queryParams';
import { useValidation } from '@/composable/validation';

const { t } = useI18n();

const cleaningRegex = useQueryParamOrStorage({ name: 'clean', storageName: 'case-conv:cl', defaultValue: '[^\\w\\d\\s]' });
const cleaningRegexValidation = useValidation({
  source: cleaningRegex,
  rules: [
    {
      message: t('tools.case-converter.invalidCleaningRegex'), // Use t() directly for the static part
      validator: (value: string) => {
        try {
          // eslint-disable-next-line no-new
          new RegExp(value);
          return true;
        }
        catch {
          return false;
        }
      },
      getErrorMessage: (value: string) => {
        try {
          // eslint-disable-next-line no-new
          new RegExp(value);
          return ''; // No error
        }
        catch (e: any) {
          // Return the specific error message from the RegExp constructor
          return t('tools.case-converter.invalidCleaningRegexDetailed', [e.message]);
        }
      },
    },
  ],
});

const input = ref('lorem ipsum dolor sit amet');
const inputCleaned = computed(() => {
  if (!cleaningRegexValidation.isValid) {
    return input.value;
  }
  return input.value.replace(new RegExp(cleaningRegex.value, 'g'), '');
});

const formats = computed(() => [
  {
    label: t('tools.case-converter.formats.lowercase'),
    value: inputCleaned.value.toLocaleLowerCase(),
  },
  {
    label: t('tools.case-converter.formats.uppercase'),
    value: inputCleaned.value.toLocaleUpperCase(),
  },
  {
    label: t('tools.case-converter.formats.camelcase'),
    value: camelCase(inputCleaned.value),
  },
  {
    label: t('tools.case-converter.formats.capitalcase'),
    value: capitalCase(inputCleaned.value),
  },
  {
    label: t('tools.case-converter.formats.constantcase'),
    value: constantCase(inputCleaned.value),
  },
  {
    label: t('tools.case-converter.formats.dotcase'),
    value: dotCase(inputCleaned.value),
  },
  {
    label: t('tools.case-converter.formats.kebabparamcase'),
    value: kebabCase(inputCleaned.value),
  },
  {
    label: t('tools.case-converter.formats.nocase'),
    value: noCase(inputCleaned.value),
  },
  {
    label: t('tools.case-converter.formats.trainheadercase'),
    value: trainCase(inputCleaned.value),
  },
  {
    label: t('tools.case-converter.formats.pascalcase'),
    value: pascalCase(inputCleaned.value),
  },
  {
    label: t('tools.case-converter.formats.pathcase'),
    value: pathCase(inputCleaned.value),
  },
  {
    label: t('tools.case-converter.formats.sentencecase'),
    value: sentenceCase(inputCleaned.value),
  },
  {
    label: t('tools.case-converter.formats.snakecase'),
    value: snakeCase(inputCleaned.value),
  },
  {
    label: t('tools.case-converter.formats.mockingcase'),
    value: inputCleaned.value
      .split('')
      .map((char, index) => (index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()))
      .join(''),
  },
]);

const inputLabelAlignmentConfig = {
  labelPosition: 'left',
  labelWidth: '125px',
  labelAlign: 'right',
};
</script>

<template>
  <c-card>
    <c-input-text
      v-model:value="input"
      :label="t('tools.case-converter.yourStringLabel')"
      :placeholder="t('tools.case-converter.yourStringPlaceholder')"
      raw-text
      v-bind="inputLabelAlignmentConfig"
      mb-1
    />

    <c-input-text
      v-model:value="cleaningRegex"
      :label="t('tools.case-converter.cleaningRegexLabel')"
      :placeholder="t('tools.case-converter.cleaningRegexPlaceholder')"
      raw-text
      v-bind="inputLabelAlignmentConfig"
      mb-1
      :error="cleaningRegexValidation.message"
    />

    <div my-16px divider />

    <InputCopyable
      v-for="format in formats"
      :key="format.label"
      :value="format.value"
      :label="format.label"
      v-bind="inputLabelAlignmentConfig"
      mb-1
    />
  </c-card>
</template>

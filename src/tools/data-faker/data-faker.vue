<script setup lang="ts">
import { type Faker, allFakers } from '@faker-js/faker';
import JSON5 from 'json5';
import { objectArrayToData } from '@/utils/objectarray.export';
import type { ExportFormat } from '@/utils/objectarray.export';
import type { UseValidationRule } from '@/composable/validation';
import { useQueryParamOrStorage } from '@/composable/queryParams';

const { t } = useI18n();

const jsonInput = useQueryParamOrStorage({
  name: 'template',
  storageName: 'faker:tmpl',
  defaultValue: JSON.stringify({
    name: 'faker.person.fullName',
    email: 'faker.internet.email',
    address: {
      street: 'faker.location.streetAddress',
      city: 'faker.location.city',
      country: 'faker.location.country',
    },
    phone: 'faker.phone.number',
  }, null, 2),
});

const generatedData = ref<string>('');
const itemCount = useQueryParamOrStorage({ name: 'count', storageName: 'faker:c', defaultValue: 1 });
const error = ref('');
const selectedFormat = useQueryParamOrStorage({ name: 'fmt', storageName: 'faker:f', defaultValue: 'json' });
const tableName = ref<string>('TableName');
const nestify = ref(false);

const allLocales = Object.keys(allFakers);
const selectedLocale = useQueryParamOrStorage({ name: 'locale', storageName: 'faker:l', defaultValue: 'en' });
const faker = computed(() => (allFakers as Record<string, Faker>)[selectedLocale.value]);

const formats = [
  { label: 'JSON', value: 'json' },
  { label: 'YAML', value: 'yaml' },
  { label: 'SQL INSERT', value: 'sql' },
  { label: t('tools.data-faker.formats.csv-comma'), value: 'csv' },
  { label: t('tools.data-faker.formats.csv-semicolon'), value: 'csv_semicolon' },
  { label: t('tools.data-faker.formats.csv-tab'), value: 'tsv' },
  { label: 'Markdown', value: 'markdown' },
  { label: 'XML', value: 'xml' },
];

// Extract all faker methods dynamically
const fakerMethods = computed(() => {
  const methods: string[] = [];
  const fakerObj = (faker as Record<string, any>);
  Object.keys(fakerObj).forEach((category) => {
    if (typeof fakerObj[category] === 'object') {
      Object.keys(fakerObj[category]).forEach((method) => {
        methods.push(`faker.${category}.${method}`);
      });
    }
  });
  return methods.map(method => ({ label: method, value: method }));
});

// Selected faker method for insertion
const selectedMethod = ref<string>('');

function resolveFakerValue(value: string) {
  try {
    return value.startsWith('faker.')
      ? value.split('.').slice(1).reduce((acc: any, prop: string) => acc[prop], faker.value)()
      : value;
  }
  catch {
    return value; // Fallback for invalid faker function names
  }
}

function generateFakeData(template: Record<string, any>): Record<string, any> {
  return Object.entries(template).reduce((result, [key, value]) => {
    result[key] = typeof value === 'object' && value !== null
      ? generateFakeData(value) // Recursive handling for nested objects
      : resolveFakerValue(value);
    return result;
  }, {} as Record<string, any>);
}

function handleGenerate() {
  try {
    error.value = '';
    const parsedTemplate = JSON.parse(jsonInput.value);
    generatedData.value = objectArrayToData(
      Array.from({ length: itemCount.value },
        () => generateFakeData(parsedTemplate)),
      selectedFormat.value as ExportFormat, {
        tableName: tableName.value,
        nestify: nestify.value,
      });
  }
  catch (e: any) {
    error.value = e.toString();
  }
}

function insertMethodIntoJson() {
  if (selectedMethod.value) {
    jsonInput.value = jsonInput.value.replace(/\n?\}$/, `,\n  "newField": "${selectedMethod.value}"\n}`);
  }
}

const rules: UseValidationRule<string>[] = [
  {
    validator: (v: string) => v === '' || JSON5.parse(v),
    message: t('tools.data-faker.validation.invalid-json'),
  },
];
</script>

<template>
  <NCard :title="t('tools.data-faker.title')">
    <c-input-text v-model:value="jsonInput" :label="t('tools.data-faker.json-template.label')" multiline mb-1 rows="10" :placeholder="t('tools.data-faker.json-template.placeholder')" :validation-rules="rules" />

    <c-card :title="t('tools.data-faker.faker-method-insertion.title')" mb-1>
      <n-space>
        <c-select v-model:value="selectedMethod" style="width: 200px" :options="fakerMethods" searchable :placeholder="t('tools.data-faker.faker-method-insertion.placeholder')" />
        <NButton @click="insertMethodIntoJson">
          {{ t('tools.data-faker.faker-method-insertion.insert-button') }}
        </NButton>
      </n-space>
    </c-card>

    <n-space mb-1>
      <NFormItem :label="t('tools.data-faker.options.number-of-objects')" label-placement="left">
        <NInputNumber v-model:value="itemCount" :min="1" :placeholder="t('tools.data-faker.options.number-placeholder')" />
      </NFormItem>
      <n-form-item :label="t('tools.data-faker.options.nestify')" label-placement="left">
        <n-checkbox v-model:checked="nestify" />
      </n-form-item>
    </n-space>

    <c-select v-model:value="selectedLocale" :label="t('tools.data-faker.locale.label')" label-position="left" :options="allLocales" searchable mb-1 :placeholder="t('tools.data-faker.locale.placeholder')" />

    <NFormItem :label="t('tools.data-faker.output-format.label')" label-placement="left" mb-1>
      <NSelect v-model:value="selectedFormat" :options="formats" :placeholder="t('tools.data-faker.output-format.placeholder')" />
    </NFormItem>

    <c-input-text v-if="selectedFormat === 'sql'" v-model:value="tableName" :label="t('tools.data-faker.table-name.label')" label-placement="left" mb-1 />

    <NButton mb-2 mt-2 @click="handleGenerate">
      {{ t('tools.data-faker.generate-button') }}
    </NButton>

    <c-alert v-if="error">
      {{ error }}
    </c-alert>

    <c-card v-if="generatedData" :title="t('tools.data-faker.generated-data.title')">
      <textarea-copyable :value="generatedData" :language="selectedFormat" />
    </c-card>
  </NCard>
</template>

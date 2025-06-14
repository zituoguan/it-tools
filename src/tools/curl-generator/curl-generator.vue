<script setup lang="ts">
import JSON5 from 'json5';
import { useValidation } from '@/composable/validation';

const { t } = useI18n();

const url = ref('');
const method = ref('POST'); // Default method set to POST for body support
const bodyType = ref('json'); // Default body type
const jsonData = ref('');

const headers = ref([{ key: '', value: '' }]);
const formData = ref([{ key: '', value: '' }]);

const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

const optionsList = [
  { key: 'compressed', description: t('tools.curl-generator.options.compressed') },
  { key: 'compressed-ssh', description: t('tools.curl-generator.options.compressed-ssh') },
  { key: 'fail', description: t('tools.curl-generator.options.fail') },
  { key: 'fail-early', description: t('tools.curl-generator.options.fail-early') },
  { key: 'head', description: t('tools.curl-generator.options.head') },
  { key: 'include', description: t('tools.curl-generator.options.include') },
  { key: 'insecure', description: t('tools.curl-generator.options.insecure') },
  { key: 'ipv4', description: t('tools.curl-generator.options.ipv4') },
  { key: 'ipv6', description: t('tools.curl-generator.options.ipv6') },
  { key: 'list-only', description: t('tools.curl-generator.options.list-only') },
  { key: 'location', description: t('tools.curl-generator.options.location') },
  { key: 'location-trusted', description: t('tools.curl-generator.options.location-trusted') },
  { key: 'no-keepalive', description: t('tools.curl-generator.options.no-keepalive') },
  { key: 'show-error', description: t('tools.curl-generator.options.show-error') },
  { key: 'silent', description: t('tools.curl-generator.options.silent') },
  { key: 'ssl', description: t('tools.curl-generator.options.ssl') },
  { key: 'sslv2', description: t('tools.curl-generator.options.sslv2') },
  { key: 'sslv3', description: t('tools.curl-generator.options.sslv3') },
  { key: 'verbose', description: t('tools.curl-generator.options.verbose') },
];

const selectedOptions = ref<Record<string, boolean>>({});

const curlCommand = computed(() => {
  let command = `curl -X ${method.value} "${url.value}"`;

  headers.value.forEach(({ key, value }) => {
    if (key && value) {
      command += ` -H "${key}: ${value}"`;
    }
  });

  if (bodyType.value === 'json' && jsonData.value) {
    command += ` -H "Content-Type: application/json" --data '${JSON.stringify(JSON5.parse(jsonData.value))}'`;
  }
  else if (bodyType.value === 'form-data') {
    formData.value.forEach(({ key, value }) => {
      if (key && value) {
        command += ` -F "${key}=${value}"`;
      }
    });
  }

  optionsList.forEach(({ key }) => {
    if (selectedOptions.value[key]) {
      command += ` --${key}`;
    }
  });

  return command;
});

const jsonBodyValidation = useValidation({
  source: jsonData,
  rules: [
    {
      message: t('tools.curl-generator.validation.invalid-json'),
      validator: value => !value || JSON5.parse(value),
    },
  ],
});
</script>

<template>
  <div>
    <NFormItem :label="t('tools.curl-generator.url.label')" label-placement="left">
      <NInput v-model:value="url" :placeholder="t('tools.curl-generator.url.placeholder')" />
    </NFormItem>
    <NFormItem :label="t('tools.curl-generator.method.label')" label-placement="left">
      <NSelect v-model:value="method" :options="methods.map(m => ({ label: m, value: m }))" />
    </NFormItem>

    <NRadioGroup v-model:value="bodyType" mb-2>
      <NRadio value="json">
        {{ t('tools.curl-generator.body-type.json') }}
      </NRadio>
      <NRadio value="form-data">
        {{ t('tools.curl-generator.body-type.form-data') }}
      </NRadio>
    </NRadioGroup>

    <c-card v-if="bodyType === 'json'" :title="t('tools.curl-generator.json-body.title')" mb-2>
      <c-input-text
        v-model:value="jsonData" multiline rows="6"
        :placeholder="t('tools.curl-generator.json-body.placeholder')" :validation="jsonBodyValidation"
      />
    </c-card>

    <c-card v-else :title="t('tools.curl-generator.form-entries.title')" mb-2>
      <NDynamicInput v-model:value="formData" preset="pair" :key-placeholder="t('tools.curl-generator.form-entries.key-placeholder')" :value-placeholder="t('tools.curl-generator.form-entries.value-placeholder')" />
    </c-card>

    <c-card :title="t('tools.curl-generator.headers.title')" mb-2>
      <NDynamicInput v-model:value="headers" preset="pair" :key-placeholder="t('tools.curl-generator.headers.key-placeholder')" :value-placeholder="t('tools.curl-generator.headers.value-placeholder')" />
    </c-card>

    <c-card :title="t('tools.curl-generator.options.title')" mb-2>
      <template v-for="option in optionsList" :key="option.key">
        <NCheckbox v-model:checked="selectedOptions[option.key]">
          {{ `--${option.key}` }} <em>({{ option.description }})</em>
        </NCheckbox>
      </template>
    </c-card>

    <c-card :title="t('tools.curl-generator.generated-command.title')">
      <textarea-copyable :value="curlCommand" />
    </c-card>
  </div>
</template>

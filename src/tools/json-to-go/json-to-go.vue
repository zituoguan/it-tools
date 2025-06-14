<script setup lang="ts">
import JSON5 from 'json5';
import { InputData, jsonInputForTargetLanguage, quicktype } from 'quicktype-core';
import type { UseValidationRule } from '@/composable/validation';
import TextareaCopyable from '@/components/TextareaCopyable.vue';
import { useQueryParamOrStorage } from '@/composable/queryParams';

const { t } = useI18n();

const defaultValue = `{
  a:"n",
  arr: [1, 2], 
  nested: {
    a:1,
    b:"2"
  }
}`;
const jsonInput = ref(defaultValue);
const rootName = useQueryParamOrStorage({ name: 'root', storageName: 'json-go:r', defaultValue: 'MyType' });
const packageName = useQueryParamOrStorage({ name: 'package', storageName: 'json-go:p', defaultValue: 'main' });
const tags = useQueryParamOrStorage({ name: 'tags', storageName: 'json-go:t', defaultValue: 'json' });
const plainTypesOnly = useQueryParamOrStorage({ name: 'plainTypes', storageName: 'json-go:pt', defaultValue: false });
const plainTypesWithPackageOnly = useQueryParamOrStorage({ name: 'plainTypesPackage', storageName: 'json-go:ptp', defaultValue: false });
const optionalProperties = useQueryParamOrStorage({ name: 'optional', storageName: 'json-go:op', defaultValue: false });
const omitEmpty = useQueryParamOrStorage({ name: 'omit', storageName: 'json-go:oe', defaultValue: false });

async function convertJsonToGo(
  json: string,
  options: {
    rootName: string
    packageName?: string
    tags?: string
    plainTypesOnly?: boolean
    plainTypesWithPackageOnly?: boolean
    optionalProperties?: boolean
    omitEmpty?: boolean
  },
): Promise<string> {
  const targetLanguage = 'go';
  const inputData = new InputData();
  const jsonInput = jsonInputForTargetLanguage(targetLanguage);

  await jsonInput.addSource({ name: options.rootName, samples: [JSON.stringify(JSON5.parse(json))] });
  inputData.addInput(jsonInput);

  const result = await quicktype({
    inputData,
    lang: targetLanguage,
    topLevel: options.rootName,
    allPropertiesOptional: options.optionalProperties,
    rendererOptions: {
      'package': options.packageName ?? 'main',
      'field-tags': options.tags ?? false,
      'just-types': options.plainTypesOnly ?? false,
      'just-types-and-package': options.plainTypesWithPackageOnly ?? false,
      'omit-empty': options.optionalProperties ?? false,
    },
  } as any);

  return result.lines.join('\n');
}

const goOutput = computedAsync(async () => {
  try {
    return await convertJsonToGo(jsonInput.value,
      {
        rootName: rootName.value,
        packageName: packageName.value,
        tags: tags.value,
        plainTypesOnly: plainTypesOnly.value,
        plainTypesWithPackageOnly: plainTypesWithPackageOnly.value,
        optionalProperties: optionalProperties.value,
        omitEmpty: omitEmpty.value,
      },
    );
  }
  catch (e: any) {
    return e.toString();
  }
});

const rules: UseValidationRule<string>[] = [
  {
    validator: (v: string) => v === '' || JSON5.parse(v),
    message: t('tools.json-to-go.invalid-json'),
  },
];
</script>

<template>
  <c-card :title="t('tools.json-to-go.card-title')">
    <c-input-text
      v-model:value="jsonInput"
      multiline
      :placeholder="t('tools.json-to-go.input-placeholder')"
      rows="20"
      :label="t('tools.json-to-go.input-label')"
      :validation-rules="rules"
      raw-text
      mb-5
    />
    <n-space justify="center">
      <c-input v-model:value="rootName" :label="t('tools.json-to-go.root-name-label')" />
      <c-input v-model:value="packageName" :label="t('tools.json-to-go.package-name-label')" />
      <c-input v-model:value="tags" :label="t('tools.json-to-go.tags-label')" />
      <n-checkbox v-model:checked="plainTypesOnly">
        {{ t('tools.json-to-go.plain-types-only') }}
      </n-checkbox>
      <n-checkbox v-model:checked="plainTypesWithPackageOnly">
        {{ t('tools.json-to-go.plain-types-with-package-only') }}
      </n-checkbox>
      <n-checkbox v-model:checked="omitEmpty">
        {{ t('tools.json-to-go.omit-empty') }}
      </n-checkbox>
      <n-checkbox v-model:checked="optionalProperties">
        {{ t('tools.json-to-go.make-all-properties-optional') }}
      </n-checkbox>
    </n-space>
  </c-card>
  <c-card :title="t('tools.json-to-go.output-card-title')">
    <TextareaCopyable
      :value="goOutput"
      language="go"
    />
  </c-card>
</template>

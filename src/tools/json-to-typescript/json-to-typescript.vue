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
const rootName = useQueryParamOrStorage({ name: 'root', storageName: 'json-ts:r', defaultValue: 'MyType' });
const interfacesOnly = useQueryParamOrStorage({ name: 'interfaces', storageName: 'json-ts:i', defaultValue: false });
const transformPropertyNames = useQueryParamOrStorage({ name: 'js', storageName: 'json-ts:t', defaultValue: false });
const explicitlyNameUnions = useQueryParamOrStorage({ name: 'nameunion', storageName: 'json-ts:eu', defaultValue: false });
const verifyJsonParseResults = useQueryParamOrStorage({ name: 'valid', storageName: 'json-ts:v', defaultValue: true });
const preferUnionTypeOverEnum = useQueryParamOrStorage({ name: 'unionenum', storageName: 'json-ts:u', defaultValue: false });
const preferTypesOverInterfaces = useQueryParamOrStorage({ name: 'types', storageName: 'json-ts:typ', defaultValue: false });
const useStringInsteadOfEnumForSingleValueEnums = useQueryParamOrStorage({ name: 'stringenums', storageName: 'json-ts:str', defaultValue: false });
const useReadonlyTypeMembers = useQueryParamOrStorage({ name: 'ro', storageName: 'json-ts:ro', defaultValue: false });
const optionalProperties = useQueryParamOrStorage({ name: 'optional', storageName: 'json-ts:opt', defaultValue: false });

async function convertJsonToTypescript(
  json: string,
  options: {
    rootName: string
    optionalProperties?: boolean
    interfacesOnly?: boolean
    transformPropertyNames?: boolean
    explicitlyNameUnions?: boolean
    verifyJsonParseResults?: boolean
    preferUnionTypeOverEnum?: boolean
    preferTypesOverInterfaces?: boolean
    useStringInsteadOfEnumForSingleValueEnums?: boolean
    useReadonlyTypeMembers?: boolean
  },
): Promise<string> {
  const targetLanguage = 'typescript';
  const inputData = new InputData();
  const jsonInput = jsonInputForTargetLanguage(targetLanguage);

  await jsonInput.addSource({ name: options.rootName, samples: [JSON.stringify(JSON5.parse(json))] });
  inputData.addInput(jsonInput);

  const { lines } = await quicktype({
    inputData,
    lang: targetLanguage,
    topLevel: options.rootName,
    allPropertiesOptional: options.optionalProperties,
    rendererOptions: {
      'just-types': options.interfacesOnly,
      'prefer-unions': options.preferUnionTypeOverEnum,
      'explicit-unions': options.explicitlyNameUnions,
      'runtime-typecheck': options.verifyJsonParseResults,
      'nice-property-names': options.transformPropertyNames,
      'prefer-const-values': options.useStringInsteadOfEnumForSingleValueEnums,
      'readonly': options.useReadonlyTypeMembers,
      'prefer-types': options.preferTypesOverInterfaces,
    },
  } as any);

  return lines.join('\n');
}

const tsOutput = computedAsync(async () => {
  try {
    return await convertJsonToTypescript(jsonInput.value,
      {
        rootName: rootName.value,
        interfacesOnly: interfacesOnly.value,
        transformPropertyNames: transformPropertyNames.value,
        explicitlyNameUnions: explicitlyNameUnions.value,
        verifyJsonParseResults: verifyJsonParseResults.value,
        preferUnionTypeOverEnum: preferUnionTypeOverEnum.value,
        preferTypesOverInterfaces: preferTypesOverInterfaces.value,
        useStringInsteadOfEnumForSingleValueEnums: useStringInsteadOfEnumForSingleValueEnums.value,
        useReadonlyTypeMembers: useReadonlyTypeMembers.value,
        optionalProperties: optionalProperties.value,
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
    message: t('tools.json-to-typescript.invalid-json'),
  },
];
</script>

<template>
  <c-card :title="t('tools.json-to-typescript.card-title')">
    <c-input-text
      v-model:value="jsonInput"
      multiline
      :placeholder="t('tools.json-to-typescript.input-placeholder')"
      rows="20"
      :label="t('tools.json-to-typescript.input-label')"
      :validation-rules="rules"
      raw-text
      mb-5
    />
    <n-space justify="center">
      <c-input v-model:value="rootName" :label="t('tools.json-to-typescript.root-name-label')" />
      <n-checkbox v-model:checked="interfacesOnly">
        {{ t('tools.json-to-typescript.use-interfaces-only') }}
      </n-checkbox>
      <n-checkbox v-model:checked="transformPropertyNames">
        {{ t('tools.json-to-typescript.transform-property-names') }}
      </n-checkbox>
      <n-checkbox v-model:checked="explicitlyNameUnions">
        {{ t('tools.json-to-typescript.explicitly-name-unions') }}
      </n-checkbox>
      <n-checkbox v-model:checked="verifyJsonParseResults">
        {{ t('tools.json-to-typescript.verify-json-parse-results') }}
      </n-checkbox>
      <n-checkbox v-model:checked="preferUnionTypeOverEnum">
        {{ t('tools.json-to-typescript.prefer-union-type-over-enum') }}
      </n-checkbox>
      <n-checkbox v-model:checked="preferTypesOverInterfaces">
        {{ t('tools.json-to-typescript.prefer-types-over-interfaces') }}
      </n-checkbox>
      <n-checkbox v-model:checked="useStringInsteadOfEnumForSingleValueEnums">
        {{ t('tools.json-to-typescript.use-string-instead-of-enum') }}
      </n-checkbox>
      <n-checkbox v-model:checked="useReadonlyTypeMembers">
        {{ t('tools.json-to-typescript.use-readonly-type-members') }}
      </n-checkbox>
      <n-checkbox v-model:checked="optionalProperties">
        {{ t('tools.json-to-typescript.make-all-properties-optional') }}
      </n-checkbox>
    </n-space>
  </c-card>
  <c-card :title="t('tools.json-to-typescript.output-card-title')">
    <TextareaCopyable
      :value="tsOutput"
      language="typescript"
    />
  </c-card>
</template>

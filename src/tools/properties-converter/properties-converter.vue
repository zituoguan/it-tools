<script setup lang="ts">
import yaml from 'yaml';
import properties from 'properties';
import { flatten } from 'flatten-anything';

const { t } = useI18n();

const defaultPropertiesValue = `app_name App

[web]
hostname 10.10.10.10
port 1234

[db]
hostname 10.10.10.20
port 4321`;
const defaultYamlValue = `app_name: App
web:
  hostname: 10.10.10.10
  port: 1234
db:
  hostname: 10.10.10.20
  port: 4321
`;
function fromProperties(value: string) {
  try {
    return yaml.stringify(properties.parse(value, { sections: true, namespaces: true }));
  }
  catch (e: any) {
    return e.toString();
  }
}
function toProperties(value: string) {
  try {
    return properties.stringify(flatten(yaml.parse(value)));
  }
  catch (e: any) {
    return e.toString();
  }
}
</script>

<template>
  <c-card :title="t('tools.properties-converter.toYamlTitle')">
    <format-transformer
      :input-label="t('tools.properties-converter.inputLabelProperties')"
      :input-default="defaultPropertiesValue"
      :input-placeholder="t('tools.properties-converter.inputPlaceholderProperties')"
      :output-label="t('tools.properties-converter.outputLabelYaml')"
      output-language="yaml"
      :transformer="fromProperties"
    />
  </c-card>
  <c-card :title="t('tools.properties-converter.toPropertiesTitle')">
    <format-transformer
      :input-label="t('tools.properties-converter.inputLabelYaml')"
      :input-default="defaultYamlValue"
      :input-placeholder="t('tools.properties-converter.inputPlaceholderYaml')"
      :output-label="t('tools.properties-converter.outputLabelProperties')"
      output-language="ini"
      :transformer="toProperties"
    />
  </c-card>
</template>

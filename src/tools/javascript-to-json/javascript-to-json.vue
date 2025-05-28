<script setup lang="ts">
import JSON5 from 'json5';
import type { UseValidationRule } from '@/composable/validation';
import { isNotThrowing } from '@/utils/boolean';
import { withDefaultOnError } from '@/utils/defaults';

function parseJSON(value: string) {
  try {
    return JSON5.parse(value);
  }
  catch {
    return JSON5.parse(value.replace(/`((?:[^`]|\\`)*)`/g, (_m, s) => `"${s.replace(/"/g, '\\""').replace(/\r/g, '\\r').replace(/\n/g, '\\n')}"`));
  }
}

const indentSize = useStorage('json-prettify:indent-size', 3);
const transformer = (value: string) => withDefaultOnError(() => JSON.stringify(parseJSON(value), null, indentSize.value), '');

const rules: UseValidationRule<string>[] = [
  {
    validator: (value: string) => value === '' || isNotThrowing(() => JSON.stringify(parseJSON(value))),
    message: 'Provided JS Object is not valid.',
  },
];
</script>

<template>
  <div style="flex: 0 0 100%">
    <div style="margin: 0 auto;" flex justify-center gap-3>
      <n-form-item label="Indent size :" label-placement="left" label-width="100" :show-feedback="false">
        <n-input-number v-model:value="indentSize" min="0" max="10" style="width: 100px" />
      </n-form-item>
    </div>
  </div>

  <format-transformer
    input-label="Your JavaScript Object"
    input-placeholder="Paste your JS Object here..."
    output-label="JSON from your JavaScript Object"
    output-language="json"
    :input-validation-rules="rules"
    :transformer="transformer"
  />
</template>

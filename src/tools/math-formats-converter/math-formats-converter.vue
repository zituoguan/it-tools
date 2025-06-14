<script setup lang="ts">
import { useScriptTag } from '@vueuse/core';
import { convert_math } from 'mitex-wasm';
import { useQueryParamOrStorage } from '@/composable/queryParams';

const { t } = useI18n();

const { load: loadPlurimath } = useScriptTag('/plurimath/index.js', undefined, { type: 'module', manual: true });

const formats = computed(() => [
  { value: 'asciimath', label: t('tools.math-formats-converter.formats.asciimath') },
  { value: 'latex', label: t('tools.math-formats-converter.formats.latex') },
  { value: 'mathml', label: t('tools.math-formats-converter.formats.mathml') },
  { value: 'html', label: t('tools.math-formats-converter.formats.html') },
  { value: 'omml', label: t('tools.math-formats-converter.formats.omml') },
]);

const source = ref('');
const sourceFormat = useQueryParamOrStorage({ name: 'src', storageName: 'math-fmts-conv:src', defaultValue: 'latex' });
const targetFormat = useQueryParamOrStorage({ name: 'target', storageName: 'math-fmts-conv:target', defaultValue: 'mathml' });
const target = computedAsync(async () => {
  const sourceValue = source.value;
  const sourceFormatValue = sourceFormat.value;
  const targetFormatValue = targetFormat.value;
  if (!sourceValue) {
    return '';
  }
  if (sourceFormatValue === targetFormatValue) {
    return sourceValue;
  }
  await loadPlurimath();
  return new Promise<string>((resolve, _reject) => {
    try {
      const formula = new Plurimath(sourceValue, sourceFormatValue);
      let result;
      switch (targetFormatValue) {
        case 'asciimath':
          result = formula.toAsciimath();
          break;
        case 'latex':
          result = formula.toLatex();
          break;
        case 'mathml':
          result = formula.toMathml();
          break;
        case 'html':
          result = formula.toHtml();
          break;
        case 'omml':
          result = formula.toOmml();
          break;
        case 'typst':
          result = convert_math(formula.toLatex(), new Uint8Array());
          break;
        default:
          result = '# unknown format';
          break;
      }
      resolve(result);
    }
    catch (e: any) {
      resolve(`# error converting formula: ${e.toString()}`);
    }
  });
});
</script>

<template>
  <div>
    <c-input-text
      v-model:value="source"
      multiline
      :placeholder="t('tools.math-formats-converter.input-placeholder')"
      rows="5"
      :label="t('tools.math-formats-converter.input-label')"
      raw-text
      mb-5
    />
    <c-select
      v-model:value="sourceFormat"
      :label="t('tools.math-formats-converter.source-format')"
      :options="formats"
      :placeholder="t('tools.math-formats-converter.source-format-placeholder')"
      mb-2
    />

    <c-select
      v-model:value="targetFormat"
      :label="t('tools.math-formats-converter.target-format')"
      :options="[...formats, { value: 'typst', label: t('tools.math-formats-converter.formats.typst') }]"
      :placeholder="t('tools.math-formats-converter.target-format-placeholder')"
      mb-2
    />

    <c-card :title="t('tools.math-formats-converter.converted-expression')">
      <textarea-copyable :value="target" :language="targetFormat" word-wrap />
    </c-card>
  </div>
</template>

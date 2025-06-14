<script setup lang="ts">
import beautify from 'js-beautify';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

const { t } = useI18n();
const inputJS = ref('');
const outputJS = computed(() => {
  return beautify(inputJS.value, {
    indent_char: ' ',
    indent_size: 2,
    eol: '\n',
  });
});
</script>

<template>
  <div>
    <c-input-text
      v-model:value="inputJS"
      multiline raw-text
      :placeholder="t('tools.javascript-prettifier.inputPlaceholder')"
      rows="8"
      autofocus
      :label="t('tools.javascript-prettifier.inputLabel')"
    />

    <n-divider />

    <n-form-item :label="t('tools.javascript-prettifier.outputLabel')">
      <TextareaCopyable
        :value="outputJS"
        multiline
        language="javascript"
        word-wrap
      />
    </n-form-item>
  </div>
</template>

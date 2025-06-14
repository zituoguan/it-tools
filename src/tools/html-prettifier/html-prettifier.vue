<script setup lang="ts">
import beautify from 'js-beautify';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

const { t } = useI18n();

const inputHtml = ref('');
const outputHtml = computed(() => {
  return beautify.html(inputHtml.value, {
    unformatted: ['code', 'pre', 'em', 'strong', 'span'],
    indent_inner_html: true,
    indent_char: ' ',
    indent_size: 2,
    eol: '\n',
  });
});
</script>

<template>
  <div>
    <c-input-text
      v-model:value="inputHtml"
      multiline raw-text
      :placeholder="t('tools.html-prettifier.inputPlaceholder')"
      rows="8"
      autofocus
      :label="t('tools.html-prettifier.inputLabel')"
      paste-html
    />

    <n-divider />

    <n-form-item :label="t('tools.html-prettifier.outputLabel')">
      <TextareaCopyable
        :value="outputHtml"
        multiline
        language="html"
        :word-wrap="true"
      />
    </n-form-item>
  </div>
</template>

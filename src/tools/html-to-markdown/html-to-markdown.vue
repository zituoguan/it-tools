<script setup lang="ts">
import TurndownService from 'turndown';
import { gfm as addGFM } from '@guyplusplus/turndown-plugin-gfm';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

const { t } = useI18n();

const turndownService = new TurndownService();
addGFM(turndownService);

const inputHtml = ref('');
const outputMarkdown = computed(() => {
  try {
    return turndownService.turndown(inputHtml.value ?? '');
  }
  catch (e: any) {
    return e.toString();
  }
});
</script>

<template>
  <div>
    <c-input-text
      v-model:value="inputHtml"
      multiline raw-text
      :placeholder="t('tools.html-to-markdown.inputPlaceholder')"
      rows="8"
      autofocus
      :label="t('tools.html-to-markdown.inputLabel')"
      paste-html
    />

    <n-divider />

    <n-form-item :label="t('tools.html-to-markdown.outputLabel')">
      <TextareaCopyable :value="outputMarkdown" />
    </n-form-item>
  </div>
</template>

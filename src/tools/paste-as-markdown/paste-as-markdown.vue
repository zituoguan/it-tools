<script setup lang="ts">
import { subscribe } from '@github/paste-markdown';
import CInputText from '@/ui/c-input-text/c-input-text.vue';

const inputElement = ref<typeof CInputText>();
const markdown = ref('');

// Subscribe the behavior to the textarea.
onMounted(() => {
  subscribe(inputElement.value?.textareaRef as never);
});
const { t } = useI18n();
</script>

<template>
  <c-card :title="t('tools.paste-as-markdown.title')" class="paste-zone">
    <n-ul>
      <n-li>{{ t('tools.paste-as-markdown.tip-table') }}</n-li>
      <n-li>{{ t('tools.paste-as-markdown.tip-link') }}</n-li>
      <n-li>{{ t('tools.paste-as-markdown.tip-link-text') }}</n-li>
      <n-li>{{ t('tools.paste-as-markdown.tip-image') }}</n-li>
    </n-ul>
    <CInputText
      ref="inputElement"
      v-model:value="markdown"
      multiline
      :placeholder="t('tools.paste-as-markdown.placeholder')"
      rows="10"
      w-full
    />
  </c-card>
</template>

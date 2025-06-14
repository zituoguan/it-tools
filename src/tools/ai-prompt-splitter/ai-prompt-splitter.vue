<script setup lang="ts">
import promptSplitter from 'chatgpt-prompt-splitter';
import { useValidation } from '@/composable/validation';

const { t } = useI18n();

const prompt = ref('');
const splitLength = ref(1024);

const splittedPrompts = computed(() => {
  try {
    return promptSplitter({
      prompt: prompt.value,
      splitLength: splitLength.value,
      newLine: true,
    });
  }
  catch (e: any) {
    return [e.toString()];
  }
});

const promptValidation = useValidation({
  source: prompt,
  rules: [
    {
      validator: v => v !== '',
      message: t('tools.ai-prompt-splitter.promptNotEmpty'),
    },
  ],
});
</script>

<template>
  <div>
    <c-card :title="t('tools.ai-prompt-splitter.promptAndOptions')" mb-2>
      <c-input-text
        v-model:value="prompt"
        :label="t('tools.ai-prompt-splitter.fullPrompt')"
        multiline
        :placeholder="t('tools.ai-prompt-splitter.promptPlaceholder')"
        rows="10"
        :validation="promptValidation"
        mb-2
      />
      <n-form-item :label="t('tools.ai-prompt-splitter.chunkLength')">
        <n-input-number v-model:value="splitLength" :min="1" />
      </n-form-item>
    </c-card>

    <c-card :title="t('tools.ai-prompt-splitter.dividedPrompts')">
      <div v-for="(splittedPrompt, index) in splittedPrompts" :key="index">
        <TextareaCopyable :value="splittedPrompt" />
      </div>
    </c-card>
  </div>
</template>

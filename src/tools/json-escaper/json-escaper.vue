<script setup lang="ts">
import { addSlashes, removeSlashes } from 'slashes';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

const { t } = useI18n();
const unescapedInput = ref('');
const escapedOutput = computed(
  () => {
    try {
      return addSlashes(unescapedInput.value);
    }
    catch (e: any) {
      return e.toString();
    }
  },
);

const escapedInput = ref('');
const unescapedOutput = computed(
  () => {
    try {
      return removeSlashes(escapedInput.value);
    }
    catch (e: any) {
      return e.toString();
    }
  },
);
</script>

<template>
  <div max-w-600>
    <c-card :title="t('tools.json-escaper.escapeJsonString')">
      <c-input-text
        v-model:value="unescapedInput"
        :placeholder="t('tools.json-escaper.escapeInputPlaceholder')"
        :label="t('tools.json-escaper.escapeInputLabel')"
        raw-text
        multiline
        rows="5"
        mb-5
      />

      <n-divider />

      <TextareaCopyable
        :label="t('tools.json-escaper.escapedStringLabel')"
        :value="escapedOutput"
        multiline
        readonly
        rows="5"
        mb-5
      />
    </c-card>

    <c-card :title="t('tools.json-escaper.unescapeJsonString')" mt-5>
      <c-input-text
        v-model:value="escapedInput"
        :placeholder="t('tools.json-escaper.unescapeInputPlaceholder')"
        :label="t('tools.json-escaper.unescapeInputLabel')"
        raw-text
        multiline
        rows="5"
        mb-5
      />

      <n-divider />

      <TextareaCopyable
        :label="t('tools.json-escaper.unescapedStringLabel')"
        :value="unescapedOutput"
        multiline
        readonly
        rows="5"
        mb-5
      />
    </c-card>
  </div>
</template>

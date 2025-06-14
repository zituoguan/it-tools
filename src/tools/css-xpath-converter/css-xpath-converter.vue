<script setup lang="ts">
import xPathToCss from 'xpath-to-css';
import cssToXpath from 'csstoxpath';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

const { t } = useI18n();

const cssInput = ref('');
const xpathOutput = computed(
  () => {
    try {
      return cssToXpath(cssInput.value);
    }
    catch (e: any) {
      return e.toString();
    }
  },
);

const xpathInput = ref('');
const cssOutput = computed(
  () => {
    try {
      return xPathToCss(xpathInput.value);
    }
    catch (e: any) {
      return e.toString();
    }
  },
);
</script>

<template>
  <div max-w-600>
    <c-card :title="t('tools.css-xpath-converter.cssToXpath')">
      <c-input-text
        v-model:value="cssInput"
        :placeholder="t('tools.css-xpath-converter.cssPlaceholder')"
        :label="t('tools.css-xpath-converter.cssLabel')"
        raw-text
        mb-5
      />

      <router-link target="_blank" to="/css-selectors-memo" mb-1 mt-1>
        {{ t('tools.css-xpath-converter.cssCheatsheet') }}
      </router-link>

      <n-divider />

      <TextareaCopyable
        :label="t('tools.css-xpath-converter.xpathExpression')"
        :value="xpathOutput"
        readonly
        mb-5
      />
    </c-card>

    <c-card :title="t('tools.css-xpath-converter.xpathToCss')" mt-5>
      <c-input-text
        v-model:value="xpathInput"
        :placeholder="t('tools.css-xpath-converter.xpathPlaceholder')"
        :label="t('tools.css-xpath-converter.xpathLabel')"
        raw-text
        mb-5
      />

      <router-link target="_blank" to="/xpath-memo" mb-1 mt-1>
        {{ t('tools.css-xpath-converter.xpathCheatsheet') }}
      </router-link>

      <n-divider />

      <TextareaCopyable
        :label="t('tools.css-xpath-converter.cssSelector')"
        :value="cssOutput"
        readonly
        mb-5
      />
    </c-card>
  </div>
</template>

<script setup lang="ts">
import { useThemeVars } from 'naive-ui';
import { computed, defineAsyncComponent } from 'vue';
import { useI18n } from 'vue-i18n';

const themeVars = useThemeVars();
const { locale } = useI18n();

const MemoContent = computed(() => {
  const lang = locale.value;
  // Try to load the .md file for the specific language
  // If it fails, fall back to the default .md file
  return defineAsyncComponent(() =>
    import(`./common-regex.${lang}.md`)
      .catch(() => import('./common-regex.md')),
  );
});
</script>

<template>
  <div>
    <component :is="MemoContent" style="overflow-x: auto;" />
  </div>
</template>

<style lang="less" scoped>
::v-deep(pre) {
  margin: 0;
  padding: 15px 22px;
  background-color: v-bind('themeVars.cardColor');
  border-radius: 4px;
  white-space: pre-wrap;
}
::v-deep(a) {
  color: v-bind('themeVars.textColor3');
}
</style>

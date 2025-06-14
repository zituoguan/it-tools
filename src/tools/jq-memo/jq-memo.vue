<script setup lang="ts">
import { useThemeVars } from 'naive-ui';
import { computed, defineAsyncComponent } from 'vue';

const themeVars = useThemeVars();
const { locale } = useI18n();

const MemoContent = computed(() => {
  const lang = locale.value;
  // 尝试加载特定语言的 .md 文件
  // 如果失败，则回退到原始的 .md 文件 (如果存在)
  return defineAsyncComponent(() =>
    import(`./jq.${lang}.md`)
      .catch(() => import('./jq.md')), // 最后的备选方案
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
  overflow: auto;
}
::v-deep(table) {
  border-collapse: collapse;
}
::v-deep(table), ::v-deep(td), ::v-deep(th) {
  border: 1px solid v-bind('themeVars.textColor1');
  padding: 5px;
}
::v-deep(a) {
  color: v-bind('themeVars.textColor1');
}
</style>

<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import { useThemeVars } from 'naive-ui';
import { RouterLink, useRoute } from 'vue-router';
import MenuIconItem from './MenuIconItem.vue';
import type { Tool, ToolCategory } from '@/tools/tools.types';

const props = withDefaults(defineProps<{ toolsByCategory?: ToolCategory[] }>(), { toolsByCategory: () => [] });
const { toolsByCategory } = toRefs(props);
const route = useRoute();

const makeLabel = (tool: Tool) => () => h(RouterLink, { to: tool.path }, { default: () => tool.name });
const makeIcon = (tool: Tool) => () => h(MenuIconItem, { tool });

const collapsedCategories = useStorage<Record<string, boolean>>(
  'menu-tool-option:collapsed-categories', // 菜单工具选项：折叠的分类
  {},
  undefined,
  {
    deep: true,
    serializer: {
      read: v => (v ? JSON.parse(v) : null),
      write: v => JSON.stringify(v),
    },
  },
);

function toggleCategoryCollapse({ name }: { name: string }) {
  collapsedCategories.value[name] = !collapsedCategories.value[name];
}

/**
 * areAllCollapsed (新增)
 * --------------------------------------------------------------------------
 * 一个计算属性，用于检查是否所有分类都已折叠。
 * - 如果有一个分类是展开的 (false)，则此属性为 false。
 * - 如果没有找到分类或所有分类都已折叠 (true)，则此属性为 true。
 */
const areAllCollapsed = computed(() => {
  return toolsByCategory.value.every(({ name }) => collapsedCategories.value[name] !== false);
});

/**
 * toggleAllCategories (新增)
 * --------------------------------------------------------------------------
 * 如果所有分类都已折叠，则展开所有分类；否则，折叠所有分类。
 */
function toggleAllCategories() {
  const nextState = !areAllCollapsed.value;
  toolsByCategory.value.forEach(({ name }) => {
    collapsedCategories.value[name] = nextState;
  });
};

const menuOptions = computed(() =>
  toolsByCategory.value.map(({ name, components }) => ({
    name,
    isCollapsed: collapsedCategories.value[name] === undefined ? true : collapsedCategories.value[name], // 如果未设置，则默认为折叠
    tools: components.map(tool => ({
      label: makeLabel(tool),
      icon: makeIcon(tool),
      key: tool.path,
    })),
  })),
);

const themeVars = useThemeVars();
</script>

<template>
  <!--
    顶部的按钮，用于一次性展开或折叠所有分类。
    - 使用 areAllCollapsed 来确定标签（“展开所有工具” vs “折叠所有工具”）。
    - 点击时调用 toggleAllCategories()。
  -->
  <div class="top-controls" ml-6px>
    <c-button @click="toggleAllCategories">
      {{ areAllCollapsed ? '展开所有工具' : '折叠所有工具' }}
    </c-button>
  </div>

  <div v-for="{ name, tools, isCollapsed } of menuOptions" :key="name">
    <div ml-6px mt-12px flex cursor-pointer items-center op-60 @click="toggleCategoryCollapse({ name })">
      <span :class="{ 'rotate-0': isCollapsed, 'rotate-90': !isCollapsed }" text-16px lh-1 op-50 transition-transform>
        <icon-mdi-chevron-right />
      </span>

      <span ml-8px text-13px>
        {{ name }}
      </span>
    </div>

    <n-collapse-transition :show="!isCollapsed">
      <div class="menu-wrapper">
        <div class="toggle-bar" @click="toggleCategoryCollapse({ name })" />

        <n-menu
          class="menu"
          :value="route.path"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="tools"
          :indent="8"
          :default-expand-all="true"
        />
      </div>
    </n-collapse-transition>
  </div>
</template>

<style scoped lang="less">
.menu-wrapper {
  display: flex;
  flex-direction: row;
  .menu {
    flex: 1;
    margin-bottom: 5px;

    ::v-deep(.n-menu-item-content::before) {
      left: 0;
      right: 13px;
    }
  }

  .toggle-bar {
    width: 24px;
    opacity: 0.1;
    transition: opacity ease 0.2s;
    position: relative;
    cursor: pointer;

    &::before {
      width: 2px;
      height: 100%;
      content: ' ';
      background-color: v-bind('themeVars.textColor3');
      border-radius: 2px;
      position: absolute;
      top: 0;
      left: 14px;
    }

    &:hover {
      opacity: 0.5;
    }
  }
}
</style>

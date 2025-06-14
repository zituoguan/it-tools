<script setup lang="ts">
import { generateTree } from './lib/generate-tree';
import { parseInput } from './lib/parse-input';
import { withDefaultOnError } from '@/utils/defaults';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

const { t } = useI18n();

const inputStructure = ref([
  'my-app',
  '  src',
  '    index.html',
  '    main.ts',
  '   main.scss',
  '  - build',
  '    - index.html',
  '    main.js',
  '    main.css',
  '',
  '  ',
  '  .prettierrc.json',
  '  .gitlab-ci.yml',
  '  README.md',
  'empty dir',
].join('\n'));
const outputTree = computed(() => withDefaultOnError(() => generateTree(parseInput(inputStructure.value)), ''));

const MONACO_EDITOR_OPTIONS = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
};
</script>

<template>
  <div>
    <c-card :title="t('tools.folder-structure-diagram.inputTitle')" w-full>
      <c-monaco-editor
        v-model:value="inputStructure"
        theme="vs-dark"
        height="250px"
        :placeholder="t('tools.folder-structure-diagram.placeholder')"
        :options="MONACO_EDITOR_OPTIONS"
      />
    </c-card>

    <n-divider />

    <n-form-item :label="t('tools.folder-structure-diagram.outputLabel')">
      <TextareaCopyable :value="outputTree" />
    </n-form-item>
  </div>
</template>

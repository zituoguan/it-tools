<script setup lang="ts">
import { generateTree } from './lib/generate-tree';
import { parseInput } from './lib/parse-input';
import { withDefaultOnError } from '@/utils/defaults';

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
    <c-card title="Your indented structure" w-full>
      <c-monaco-editor
        v-model:value="inputStructure"
        theme="vs-dark"
        height="250px"
        placeholder="Paste your indented structure here..."
        :options="MONACO_EDITOR_OPTIONS"
      />
    </c-card>

    <n-divider />

    <n-form-item label="Your tree-like structure:">
      <TextareaCopyable :value="outputTree" />
    </n-form-item>
  </div>
</template>

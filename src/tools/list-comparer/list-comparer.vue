<script setup lang="ts">
import { compareLists } from './list-comparer.service';

const { t } = useI18n();

const compareConfig = useStorage<{ ignoreCase: boolean; trimItems: boolean; noDuplicate: boolean; separator: string }>('list-cmp:conf', {
  ignoreCase: false,
  trimItems: true,
  noDuplicate: false,
  separator: '',
});
const list1 = ref('');
const list2 = ref('');

const compareResult = computed(() => {
  return compareLists({
    list1: list1.value,
    list2: list2.value,
    ignoreCase: compareConfig.value.ignoreCase,
    trimItems: compareConfig.value.trimItems,
    separator: compareConfig.value.separator,
  });
});
</script>

<template>
  <div>
    <n-space justify="center" gap-1 align="baseline">
      <n-form-item
        :label="t('tools.list-comparer.trimItems')"
        label-placement="left"
      >
        <n-switch v-model:value="compareConfig.trimItems" />
      </n-form-item>

      <n-form-item
        :label="t('tools.list-comparer.ignoreCase')"
        label-placement="left"
        mb-2
      >
        <n-switch v-model:value="compareConfig.ignoreCase" />
      </n-form-item>

      <n-form-item
        :label="t('tools.list-comparer.separator')"
        label-placement="left"
      >
        <n-input
          v-model:value="compareConfig.separator"
          :placeholder="t('tools.list-comparer.separatorPlaceholder')"
        />
      </n-form-item>
    </n-space>

    <div flex gap-1>
      <c-input-text
        v-model:value="list1"
        multiline
        rows="10"
        :label="t('tools.list-comparer.list1')"
      />
      <c-input-text
        v-model:value="list2"
        multiline
        rows="10"
        :label="t('tools.list-comparer.list2')"
      />
    </div>

    <div v-if="list1 || list2">
      <n-divider />

      <c-card :title="t('tools.list-comparer.itemsInBoth')" mb-2>
        <textarea-copyable :value="compareResult.same.join('\n')" />
      </c-card>
      <c-card :title="t('tools.list-comparer.itemsInList1NotList2')" mb-2>
        <textarea-copyable :value="compareResult.list1Not2.join('\n')" />
      </c-card>
      <c-card :title="t('tools.list-comparer.itemsInList2NotList1')" mb-2>
        <textarea-copyable :value="compareResult.list2Not1.join('\n')" />
      </c-card>
    </div>
  </div>
</template>

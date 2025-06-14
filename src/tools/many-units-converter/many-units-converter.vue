<script setup lang="ts">
import _ from 'lodash';
import { type Unit, convertMany } from 'convert';
import allUnits from './allunits.json';

const { t } = useI18n();

const allUnitsSorted = _.uniq(allUnits).sort();

const inputExpression = ref('');
const outputUnit = ref('');
const result = computed(() => {
  try {
    const best = convertMany(inputExpression.value).to('best');
    try {
      return {
        best,
        selected: outputUnit.value
          ? convertMany(inputExpression.value).to(outputUnit.value as Unit)
          : '',
      };
    }
    catch (e: any) {
      return {
        best,
        error: e.toString(),
      };
    }
  }
  catch (e: any) {
    return {
      error: e.toString(),
    };
  }
});
</script>

<template>
  <div>
    <c-input-text
      v-model:value="inputExpression"
      :label="t('tools.many-units-converter.unitsExpression')"
      :placeholder="t('tools.many-units-converter.placeholder')"
      mb-2
    />
    <c-select
      v-model:value="outputUnit"
      label-position="left"
      label-width="100px"
      :label="t('tools.many-units-converter.targetUnit')"
      :options="allUnitsSorted"
      :placeholder="t('tools.many-units-converter.selectTargetUnit')"
      searchable
    />

    <n-divider />

    <c-card v-if="result.best" :title="t('tools.many-units-converter.result')" mb-2>
      <input-copyable :label="t('tools.many-units-converter.bestTargetUnit')" :value="result.best" mb-1 />
      <input-copyable v-if="result.selected" :label="t('tools.many-units-converter.selectedTargetUnit', { unit: outputUnit })" :value="result.selected" />
    </c-card>
    <c-alert v-if="result.error && inputExpression">
      {{ result.error }}
    </c-alert>
  </div>
</template>

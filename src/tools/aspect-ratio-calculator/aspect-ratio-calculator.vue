<!-- AspectRatioCalculator.vue -->
<script setup lang="ts">
import { ref } from 'vue';
import { NButton, NInputNumber, NRadio, NRadioGroup, NSpace } from 'naive-ui';
import {
  calculateAspectRatio,
  calculateDimensions,
} from './aspect-ratio-calculator.service';

const { t } = useI18n();

const width = ref<number | null>(null);
const height = ref<number | null>(null);
const r1 = ref<number | null>(null);
const r2 = ref<number | null>(null);
const mode = ref<'ratio' | 'dimensions'>('ratio');
const result = ref<string | null>(null);

function calculateResult() {
  if (mode.value === 'ratio' && width.value && height.value) {
    const ratio = calculateAspectRatio(width.value, height.value);
    if (r2.value) {
      r1.value = ratio.r1 / ratio.r2;
    }
    else if (r1.value) {
      r2.value = ratio.r2 / ratio.r1;
    }
    else {
      r1.value = ratio.r1;
      r2.value = ratio.r2;
    }
    if (ratio.r1 !== r1.value) {
      result.value = t('tools.aspect-ratio-calculator.resultAspectRatioOr', { r1: r1.value, r2: r2.value, ratioR1: ratio.r1, ratioR2: ratio.r2 });
    }
    else {
      result.value = t('tools.aspect-ratio-calculator.resultAspectRatio', { r1: ratio.r1, r2: ratio.r2 });
    }
  }
  else if (mode.value === 'dimensions' && r1.value && r2.value) {
    if (width.value) {
      const dimensions = calculateDimensions(width.value, { r1: r1.value, r2: r2.value }, true);
      height.value = dimensions.height;
      result.value = t('tools.aspect-ratio-calculator.resultDimensions', { width: dimensions.width, height: dimensions.height });
    }
    else if (height.value) {
      const dimensions = calculateDimensions(height.value, { r1: r1.value, r2: r2.value }, false);
      width.value = dimensions.width;
      result.value = t('tools.aspect-ratio-calculator.resultDimensions', { width: dimensions.width, height: dimensions.height });
    }
    else {
      result.value = t('tools.aspect-ratio-calculator.errorEnterWidthOrHeight');
    }
  }
  else {
    result.value = t('tools.aspect-ratio-calculator.errorFillRequiredFields');
  }
}

function clearAll() {
  width.value = null;
  height.value = null;
  r1.value = null;
  r2.value = null;
  result.value = null;
}
function clearRatio() {
  r1.value = null;
  r2.value = null;
  result.value = null;
}
</script>

<template>
  <NSpace vertical :size="24">
    <NRadioGroup v-model:value="mode">
      <NRadio value="ratio">
        {{ t('tools.aspect-ratio-calculator.calculateAspectRatioLabel') }}
      </NRadio>
      <NRadio value="dimensions">
        {{ t('tools.aspect-ratio-calculator.calculateDimensionsLabel') }}
      </NRadio>
    </NRadioGroup>

    <div class="input-group">
      <div class="input-pair">
        <label>{{ t('tools.aspect-ratio-calculator.pixelsWidthLabel') }}</label>
        <NInputNumber v-model:value="width" :placeholder="t('tools.aspect-ratio-calculator.pixelsWidthPlaceholder')" :min="1" />
      </div>
      <div class="input-pair">
        <label>{{ t('tools.aspect-ratio-calculator.pixelsHeightLabel') }}</label>
        <NInputNumber v-model:value="height" :placeholder="t('tools.aspect-ratio-calculator.pixelsHeightPlaceholder')" :min="1" />
      </div>
    </div>

    <div class="input-group">
      <div class="input-pair">
        <label>{{ t('tools.aspect-ratio-calculator.ratioWidthLabel') }}</label>
        <NInputNumber v-model:value="r1" :placeholder="t('tools.aspect-ratio-calculator.ratioWidthPlaceholder')" :min="1" />
      </div>
      <div class="separator">
        :
      </div>
      <div class="input-pair">
        <label>{{ t('tools.aspect-ratio-calculator.ratioHeightLabel') }}</label>
        <NInputNumber v-model:value="r2" :placeholder="t('tools.aspect-ratio-calculator.ratioHeightPlaceholder')" :min="1" />
      </div>
    </div>

    <div class="button-container">
      <NButton type="primary" @click="calculateResult">
        {{ t('tools.aspect-ratio-calculator.calculateButton') }}
      </NButton>
      <NButton v-if="mode === 'ratio'" @click="clearRatio">
        {{ t('tools.aspect-ratio-calculator.clearRatioButton') }}
      </NButton>
      <NButton @click="clearAll">
        {{ t('tools.aspect-ratio-calculator.clearAllButton') }}
      </NButton>
    </div>

    <div v-if="result" class="result">
      {{ result }}
    </div>
  </NSpace>
</template>

<style scoped>
.input-group {
  display: flex;
  align-items: flex-end;
  gap: 16px;
}

.input-pair {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.input-pair label {
  margin-bottom: 4px;
}

.separator {
  align-self: flex-end;
  margin-bottom: 7px;
  font-size: 24px;
  font-weight: bold;
}

.button-container {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.button-container .n-button {
  flex: 1;
}

.result {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}

:deep(.n-input-number) {
  width: 100%;
}
</style>

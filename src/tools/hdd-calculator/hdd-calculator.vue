<script setup lang="ts">
import InputCopyable from '../../components/InputCopyable.vue';
import type { Units } from './hdd-calculator.service';
import { getRealSize } from './hdd-calculator.service';

const { t } = useI18n();

const dec_units = [
  { value: 'kb', label: 'kB' },
  { value: 'mb', label: 'MB' },
  { value: 'gb', label: 'GB' },
  { value: 'tb', label: 'TB' },
  { value: 'pb', label: 'PB' },
];
const bin_units = [
  { value: 'kb', label: 'KiB' },
  { value: 'mb', label: 'MiB' },
  { value: 'gb', label: 'GiB' },
  { value: 'tb', label: 'TiB' },
  { value: 'pb', label: 'PiB' },
];

const claimedCapacity = ref(1);
const claimedUnit = ref('tb');
</script>

<template>
  <div>
    <n-form-item :label="t('tools.hdd-calculator.claimedCapacityLabel')">
      <n-input-number v-model:value="claimedCapacity" :min="1" />
    </n-form-item>
    <c-select
      v-model:value="claimedUnit"
      :label="t('tools.hdd-calculator.unitLabel')"
      :options="dec_units"
    />
    <n-p>
      {{ t('tools.hdd-calculator.unitExplanation') }}
      <n-a href="https://en.wikipedia.org/wiki/Byte" target="_blank" rel="noopener">
        {{ t('tools.hdd-calculator.seeDetails') }}
      </n-a>
    </n-p>

    <n-divider />

    <InputCopyable
      v-for="({ value, label }) in bin_units"
      :key="value"
      :label="t('tools.hdd-calculator.capacityInUnit', { unit: label })"
      :value="getRealSize(claimedCapacity, claimedUnit as Units, value as Units).toFixed(5)"
    />
  </div>
</template>

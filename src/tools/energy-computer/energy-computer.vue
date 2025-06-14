<script setup lang="ts">
import { computeCost } from './energy-computer.service';

const { t } = useI18n();

const wattage = ref(100);
const durationHours = ref(2);
const kWhCost = ref(0.1);
const totalCost = computed(() => computeCost(wattage.value, durationHours.value, kWhCost.value));
</script>

<template>
  <div>
    <n-form-item :label="t('tools.energy-computer.device-wattage')" mb-1>
      <n-input-number v-model:value="wattage" :min="0" />
    </n-form-item>
    <n-form-item :label="t('tools.energy-computer.usage-duration')" mb-1>
      <n-input-number v-model:value="durationHours" :min="0" />
    </n-form-item>
    <n-form-item :label="t('tools.energy-computer.kwh-cost')" mb-1>
      <n-input-number v-model:value="kWhCost" :min="0" />
    </n-form-item>

    <n-divider />

    <input-copyable :label="t('tools.energy-computer.total-cost')" :value="totalCost" />
  </div>
</template>

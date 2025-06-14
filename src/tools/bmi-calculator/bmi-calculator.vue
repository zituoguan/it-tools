<script setup lang="ts">
const { t } = useI18n();

const units = ref('metric');
const weight = ref<number | null>(null);
const height = ref<number | null>(null);

const options = computed(() => [
  { label: t('tools.bmi-calculator.options.metric'), value: 'metric' },
  { label: t('tools.bmi-calculator.options.us'), value: 'us' },
]);

const bmi = computed(() => {
  if (!weight.value || !height.value) {
    return null;
  }
  let convertedWeight = weight.value;
  let convertedHeight = height.value;

  if (units.value === 'us') {
    convertedWeight = weight.value * 0.453592; // lbs to kg
    convertedHeight = height.value * 0.0254; // inches to meters
  }

  return (convertedWeight / (convertedHeight * convertedHeight)).toFixed(2);
});

const bmiCategory = computed(() => {
  if (!bmi.value) {
    return '';
  }
  const value = Number.parseFloat(bmi.value);
  if (value < 18.5) {
    return t('tools.bmi-calculator.category.underweight');
  }
  if (value < 24.999) {
    return t('tools.bmi-calculator.category.normal');
  }
  if (value < 29.999) {
    return t('tools.bmi-calculator.category.overweight');
  }
  if (value < 34.999) {
    return t('tools.bmi-calculator.category.obesity1');
  }
  if (value < 39.999) {
    return t('tools.bmi-calculator.category.obesity2');
  }
  return t('tools.bmi-calculator.category.obesity3');
});
</script>

<template>
  <c-card :title="t('tools.bmi-calculator.cardTitle')" max-w-800px>
    <c-select v-model:value="units" :label="t('tools.bmi-calculator.selectUnits')" :options="options" mb-2 label-position="left" />
    <n-space justify="space-evenly">
      <n-form-item :label="`${t('tools.bmi-calculator.weightLabel')} (${(units === 'metric' ? 'kg' : 'lbs')}):`" label-placement="left" mb-2>
        <n-input-number v-model:value="weight" :placeholder="t('tools.bmi-calculator.enterWeight')" />
      </n-form-item>
      <n-form-item :label="`${t('tools.bmi-calculator.heightLabel')} (${(units === 'metric' ? 'm' : 'in')}):`" label-placement="left" mb-2>
        <n-input-number v-model:value="height" :placeholder="t('tools.bmi-calculator.enterHeight')" />
      </n-form-item>
    </n-space>
    <c-card v-if="bmi" :title="t('tools.bmi-calculator.resultCardTitle')">
      <input-copyable :label="t('tools.bmi-calculator.bmiLabel')" label-position="left" label-width="100px" :value="bmi" mb-1 />
      <input-copyable :label="t('tools.bmi-calculator.categoryLabel')" label-position="left" label-width="100px" :value="bmiCategory" />
    </c-card>
  </c-card>
</template>

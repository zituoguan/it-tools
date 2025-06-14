<script setup lang="ts">
import { computeDuration } from './duration-calculator.service';

const { t } = useI18n();

const inputDurations = ref('');
const result = computed(() => computeDuration(inputDurations.value));
const errors = computed(() => result.value.errors.join('\n'));
</script>

<template>
  <div>
    <c-input-text
      v-model:value="inputDurations"
      multiline
      rows="5"
      :label="t('tools.duration-calculator.input-label')"
      :placeholder="t('tools.duration-calculator.input-placeholder')"
      mb-2
    />
    <n-p>{{ t('tools.duration-calculator.supports-info') }}</n-p>

    <n-divider />

    <c-card :title="t('tools.duration-calculator.total-title')">
      <input-copyable :label="t('tools.duration-calculator.prettified')" :value="result.total.prettified" />
      <input-copyable :label="t('tools.duration-calculator.prettified-full')" :value="result.total.prettifiedVerbose" />
      <input-copyable :label="t('tools.duration-calculator.prettified-colon')" :value="result.total.prettifiedColonNotation" />
      <input-copyable :label="t('tools.duration-calculator.prettified-days')" :value="result.total.prettifiedDaysColon" />
      <input-copyable :label="t('tools.duration-calculator.prettified-hours')" :value="result.total.prettifiedHoursColon" />
      <input-copyable :label="t('tools.duration-calculator.prettified-iso8601')" :value="result.total.iso8601Duration" />
      <input-copyable :label="t('tools.duration-calculator.milliseconds')" :value="result.total.milliseconds" />
      <input-copyable :label="t('tools.duration-calculator.seconds')" :value="result.total.seconds" />
      <input-copyable :label="t('tools.duration-calculator.minutes')" :value="result.total.minutes" />
      <input-copyable :label="t('tools.duration-calculator.hours')" :value="result.total.hours" />
      <input-copyable :label="t('tools.duration-calculator.days')" :value="result.total.days" />
      <input-copyable :label="t('tools.duration-calculator.weeks')" :value="result.total.weeks" />
      <input-copyable :label="t('tools.duration-calculator.years')" :value="result.total.years" />
    </c-card>

    <c-card :title="t('tools.duration-calculator.errors-title')" mb-2>
      <textarea-copyable :value="errors" />
    </c-card>
  </div>
</template>

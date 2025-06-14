<script setup lang="ts">
import { addToDate } from './date-duration-calculator.service';

const { t } = useI18n();
const now = Date.now();

const inputReferenceDate = ref(now);
const inputDurations = ref('');
const resultDateAdder = computed(() => addToDate(new Date(inputReferenceDate.value), inputDurations.value));
const errorsDateAdder = computed(() => resultDateAdder.value.errors.join('\n'));
</script>

<template>
  <div>
    <c-card :title="t('tools.date-duration-calculator.card-title')" mb-2>
      <n-form-item :label="t('tools.date-duration-calculator.reference-date-label')" label-placement="left" mb-1>
        <n-date-picker v-model:value="inputReferenceDate" type="datetime" />
      </n-form-item>

      <c-input-text
        v-model:value="inputDurations"
        multiline
        rows="5"
        :label="t('tools.date-duration-calculator.duration-label')"
        :placeholder="t('tools.date-duration-calculator.duration-placeholder')"
        mb-2
      />
      <n-p>{{ t('tools.date-duration-calculator.supported-formats') }}</n-p>

      <c-card v-if="errorsDateAdder" :title="t('tools.date-duration-calculator.lines-errors')">
        <textarea-copyable :value="errorsDateAdder" />
      </c-card>

      <n-divider />

      <input-copyable v-if="resultDateAdder" :label="t('tools.date-duration-calculator.result-date-label')" label-position="left" label-width="150px" :value="resultDateAdder.date.toString()" mb-1 />
      <input-copyable v-if="resultDateAdder" :label="t('tools.date-duration-calculator.result-iso-date-label')" label-position="left" label-width="150px" :value="resultDateAdder.date.toISOString()" mb-1 />
      <input-copyable v-if="resultDateAdder" :label="t('tools.date-duration-calculator.duration-seconds-label')" label-position="left" label-width="150px" :value="resultDateAdder.durationSeconds" mb-1 />
      <input-copyable v-if="resultDateAdder" :label="t('tools.date-duration-calculator.duration-result-label')" label-position="left" label-width="150px" :value="resultDateAdder.durationPretty" mb-1 />
    </c-card>
  </div>
</template>

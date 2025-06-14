<script setup lang="ts">
import { dateFromObjectId, generateMongoFilter, objectIdFromDate, objectIdSyntaxFromDate } from './mongo-objectid-converter.service';
import { withDefaultOnError } from '@/utils/defaults';

const { t } = useI18n();

const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const objectIdInput = ref(objectIdFromDate(new Date()));
const dateOutput = computed(() =>
  withDefaultOnError(() => dateFromObjectId(objectIdInput.value), t('tools.mongo-objectid-converter.invalid-objectid')),
);

const dateInput = ref(Date.now());
const dateValue = computed(() => new Date(dateInput.value));
const tableName = ref('tbl');
const objectIdOutput = computed(() =>
  withDefaultOnError(() => objectIdFromDate(dateValue.value), t('tools.mongo-objectid-converter.invalid-date')),
);
const objectIdSyntaxOutput = computed(() =>
  withDefaultOnError(() => objectIdSyntaxFromDate(dateValue.value), t('tools.mongo-objectid-converter.invalid-date')),
);
const objectIdQueryOutput = computed(() =>
  withDefaultOnError(() => generateMongoFilter({ date: dateValue.value, tableName: tableName.value }), t('tools.mongo-objectid-converter.invalid-date')),
);
const objectIdUTCDate = computed(() =>
  dateValue.value.toISOString(),
);
</script>

<template>
  <c-card :title="t('tools.mongo-objectid-converter.objectid-to-date', { timeZone: currentTimeZone })">
    <c-input-text
      v-model:value="objectIdInput"
      :placeholder="t('tools.mongo-objectid-converter.put-your-objectid-here')"
      :label="t('tools.mongo-objectid-converter.objectid-to-encode')"
      raw-text
      mb-5
    />

    <n-divider />

    <textarea-copyable
      :value="dateOutput instanceof Date ? dateOutput.toLocaleString(undefined, { timeZoneName: 'short' }) : dateOutput"
    />
    <textarea-copyable
      :value="dateOutput instanceof Date ? dateOutput.toISOString() : dateOutput"
    />
  </c-card>

  <c-card :title="t('tools.mongo-objectid-converter.date-to-objectid', { timeZone: currentTimeZone })">
    <n-form-item :label="t('tools.mongo-objectid-converter.date-and-time')" label-placement="left" mb-2 flex-1>
      <n-date-picker v-model:value="dateInput" type="datetime" />
    </n-form-item>

    <c-input-text
      v-model:value="tableName"
      :placeholder="t('tools.mongo-objectid-converter.put-your-table-name-here')"
      :label="t('tools.mongo-objectid-converter.table-name')"
      label-position="left"
      raw-text
      mb-5
    />

    <textarea-copyable :value="objectIdUTCDate" />
    <textarea-copyable :value="objectIdOutput" />
    <textarea-copyable :value="objectIdSyntaxOutput" />
    <textarea-copyable :value="objectIdQueryOutput" />
  </c-card>
</template>

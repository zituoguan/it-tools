<script setup lang="ts">
import { formatDuration, intervalToDuration } from 'date-fns';
import { type AllSupportedUnits, displayStorageAndRateUnits } from '../data-storage-unit-converter/data-storage-unit-converter.service';
import { amountTransferable, transferSpeedRate, transferTimeSeconds } from './data-transfer-rate-converter.service';

const { t } = useI18n();

const allStorateUnits = [
  { value: 'B', label: t('tools.data-transfer-rate-converter.units.bytes') },
  { value: 'iB', label: t('tools.data-transfer-rate-converter.units.bibytes') },
  { value: 'KB', label: t('tools.data-transfer-rate-converter.units.kilobytes') },
  { value: 'KiB', label: t('tools.data-transfer-rate-converter.units.kibibytes') },
  { value: 'MB', label: t('tools.data-transfer-rate-converter.units.megabytes') },
  { value: 'MiB', label: t('tools.data-transfer-rate-converter.units.mebibytes') },
  { value: 'GB', label: t('tools.data-transfer-rate-converter.units.gigabytes') },
  { value: 'GiB', label: t('tools.data-transfer-rate-converter.units.gibibytes') },
  { value: 'TB', label: t('tools.data-transfer-rate-converter.units.terabytes') },
  { value: 'TiB', label: t('tools.data-transfer-rate-converter.units.tebibytes') },
  { value: 'PB', label: t('tools.data-transfer-rate-converter.units.petabytes') },
  { value: 'PiB', label: t('tools.data-transfer-rate-converter.units.pebibytes') },
  { value: 'EB', label: t('tools.data-transfer-rate-converter.units.exabytes') },
  { value: 'EiB', label: t('tools.data-transfer-rate-converter.units.exbibytes') },
  { value: 'ZB', label: t('tools.data-transfer-rate-converter.units.zettabytes') },
  { value: 'ZiB', label: t('tools.data-transfer-rate-converter.units.zebibytes') },
  { value: 'YB', label: t('tools.data-transfer-rate-converter.units.yottabytes') },
  { value: 'YiB', label: t('tools.data-transfer-rate-converter.units.yobibytes') },
];
const allBitsUnits = [
  { value: 'b', label: t('tools.data-transfer-rate-converter.units.bits') },
  { value: 'Kb', label: t('tools.data-transfer-rate-converter.units.kilobits') },
  { value: 'Mb', label: t('tools.data-transfer-rate-converter.units.megabits') },
  { value: 'Gb', label: t('tools.data-transfer-rate-converter.units.gigabits') },
  { value: 'Tb', label: t('tools.data-transfer-rate-converter.units.terabits') },
  { value: 'Pb', label: t('tools.data-transfer-rate-converter.units.petabits') },
  { value: 'Eb', label: t('tools.data-transfer-rate-converter.units.exabits') },
  { value: 'Zb', label: t('tools.data-transfer-rate-converter.units.zettabits') },
  { value: 'Yb', label: t('tools.data-transfer-rate-converter.units.yottabits') },
];

const allRateUnits = [...allBitsUnits, ...allStorateUnits];

function convertToTimeDisplay(seconds: number) {
  if (seconds === 0) {
    return '0';
  }
  return formatDuration(intervalToDuration({ start: 0, end: seconds * 1000 }));
}

const transferTimeInput = ref<{
  dataSize: string
  dataSizeUnit: string
  bitRate: string
  bitRateUnit: string
}>({
  dataSize: '0',
  dataSizeUnit: 'MB',
  bitRate: '1',
  bitRateUnit: 'Mb',
});
const transferTimeOutput = computed(() => {
  try {
    return convertToTimeDisplay(transferTimeSeconds({
      dataSize: Number(transferTimeInput.value.dataSize),
      dataSizeUnit: transferTimeInput.value.dataSizeUnit as AllSupportedUnits,
      bitRate: Number(transferTimeInput.value.bitRate),
      bitRateUnit: transferTimeInput.value.bitRateUnit as AllSupportedUnits,
    }));
  }
  catch (e: any) {
    return e.toString();
  }
});

const transferSpeedRateInput = ref<{
  dataSize: string
  dataSizeUnit: string
  hours: number
  minutes: number
  seconds: number
  bitRateUnit: string
}>({
  dataSize: '0',
  dataSizeUnit: 'GB',
  hours: 0,
  minutes: 0,
  seconds: 0,
  bitRateUnit: 'Mb',
});
const transferSpeedRateOutput = computed(() => {
  try {
    return displayStorageAndRateUnits({
      unit: transferSpeedRateInput.value.bitRateUnit as AllSupportedUnits,
      appendUnit: true,
      value: transferSpeedRate({
        dataSize: Number(transferSpeedRateInput.value.dataSize),
        dataSizeUnit: transferSpeedRateInput.value.dataSizeUnit as AllSupportedUnits,
        hours: transferSpeedRateInput.value.hours,
        minutes: transferSpeedRateInput.value.minutes,
        seconds: transferSpeedRateInput.value.seconds,
        bitRateUnit: transferSpeedRateInput.value.bitRateUnit as AllSupportedUnits,
      }),
    });
  }
  catch (e: any) {
    return e.toString();
  }
});

const amountTransferableInput = ref<{
  bitRate: string
  bitRateUnit: string
  hours: number
  minutes: number
  seconds: number
  dataSizeUnit: string
}>({
  bitRate: '0',
  bitRateUnit: 'Mb',
  hours: 0,
  minutes: 0,
  seconds: 0,
  dataSizeUnit: 'MB',
});
const amountTransferableOutput = computed(() => {
  try {
    return displayStorageAndRateUnits({
      unit: amountTransferableInput.value.dataSizeUnit as AllSupportedUnits,
      appendUnit: true,
      value: amountTransferable({
        bitRate: Number(amountTransferableInput.value.bitRate),
        bitRateUnit: amountTransferableInput.value.bitRateUnit as AllSupportedUnits,
        hours: amountTransferableInput.value.hours,
        minutes: amountTransferableInput.value.minutes,
        seconds: amountTransferableInput.value.seconds,
        dataSizeUnit: amountTransferableInput.value.dataSizeUnit as AllSupportedUnits,
      }),
    });
  }
  catch (e: any) {
    return e.toString();
  }
});
</script>

<template>
  <div>
    <n-p text-center>
      {{ t('tools.data-transfer-rate-converter.info.conversion-examples') }}
      <n-a href="https://en.wikipedia.org/wiki/Byte" target="_blank" rel="noopener">
        {{ t('tools.data-transfer-rate-converter.info.see-details') }}
      </n-a>
    </n-p>

    <c-card :title="t('tools.data-transfer-rate-converter.transfer-time.title')" mb-2>
      <n-form-item :label="t('tools.data-transfer-rate-converter.transfer-time.data-size-label')" label-placement="left">
        <n-input v-model:value="transferTimeInput.dataSize" :placeholder="t('tools.data-transfer-rate-converter.transfer-time.data-size-placeholder')" :min="0" w-full />
        <c-select
          v-model:value="transferTimeInput.dataSizeUnit"
          searchable
          :options="allStorateUnits"
          :placeholder="t('tools.data-transfer-rate-converter.transfer-time.storage-unit-placeholder')"
          ml-1
          style="min-width: 200px"
        />
      </n-form-item>

      <n-form-item :label="t('tools.data-transfer-rate-converter.transfer-time.bit-rate-label')" label-placement="left">
        <n-input v-model:value="transferTimeInput.bitRate" :placeholder="t('tools.data-transfer-rate-converter.transfer-time.bit-rate-placeholder')" :min="0" w-full />
        <c-select
          v-model:value="transferTimeInput.bitRateUnit"
          searchable
          :options="allRateUnits"
          :placeholder="t('tools.data-transfer-rate-converter.transfer-time.bit-rate-unit-placeholder')"
          ml-1
          style="min-width: 200px"
        />
      </n-form-item>

      <n-divider />

      <InputCopyable
        :label="t('tools.data-transfer-rate-converter.transfer-time.transfer-time-label')"
        :value="transferTimeOutput"
        :placeholder="t('tools.data-transfer-rate-converter.transfer-time.transfer-time-placeholder')"
      />
    </c-card>
    <c-card :title="t('tools.data-transfer-rate-converter.transfer-speed.title')" mb-2>
      <n-form-item :label="t('tools.data-transfer-rate-converter.transfer-speed.data-size-label')" label-placement="left">
        <n-input v-model:value="transferSpeedRateInput.dataSize" :placeholder="t('tools.data-transfer-rate-converter.transfer-speed.data-size-placeholder')" :min="0" w-full />
        <c-select
          v-model:value="transferSpeedRateInput.dataSizeUnit"
          :options="allStorateUnits"
          :placeholder="t('tools.data-transfer-rate-converter.transfer-speed.storage-unit-placeholder')"
          ml-1
          style="min-width: 200px"
        />
      </n-form-item>

      <n-form-item :label="t('tools.data-transfer-rate-converter.transfer-speed.duration-label')" label-placement="left">
        <n-input-number v-model:value="transferSpeedRateInput.hours" mr-1 :placeholder="t('tools.data-transfer-rate-converter.transfer-speed.hours-placeholder')" :min="0" w-full />
        <n-input-number v-model:value="transferSpeedRateInput.minutes" mr-1 :placeholder="t('tools.data-transfer-rate-converter.transfer-speed.minutes-placeholder')" :min="0" w-full />
        <n-input-number v-model:value="transferSpeedRateInput.seconds" mr-1 :placeholder="t('tools.data-transfer-rate-converter.transfer-speed.seconds-placeholder')" :min="0" w-full />
      </n-form-item>

      <n-divider />

      <div flex items-baseline gap-2>
        <InputCopyable
          :label="t('tools.data-transfer-rate-converter.transfer-speed.speed-label')"
          label-position="left"
          :value="transferSpeedRateOutput"
          :placeholder="t('tools.data-transfer-rate-converter.transfer-speed.speed-placeholder')"
        />
        <c-select
          v-model:value="transferSpeedRateInput.bitRateUnit"
          :options="allRateUnits"
          :placeholder="t('tools.data-transfer-rate-converter.transfer-speed.bit-rate-unit-placeholder')"
          ml-1
          style="min-width: 200px"
        />
      </div>
    </c-card>
    <c-card :title="t('tools.data-transfer-rate-converter.amount-transferable.title')" mb-2>
      <n-form-item :label="t('tools.data-transfer-rate-converter.amount-transferable.bit-rate-label')" label-placement="left">
        <n-input v-model:value="amountTransferableInput.bitRate" :placeholder="t('tools.data-transfer-rate-converter.amount-transferable.bit-rate-placeholder')" :min="0" w-full />
        <c-select
          v-model:value="amountTransferableInput.bitRateUnit"
          :options="allRateUnits"
          :placeholder="t('tools.data-transfer-rate-converter.amount-transferable.bit-rate-unit-placeholder')"
          ml-1
          style="min-width: 200px"
        />
      </n-form-item>

      <n-form-item :label="t('tools.data-transfer-rate-converter.amount-transferable.duration-label')" label-placement="left">
        <n-input-number v-model:value="amountTransferableInput.hours" mr-1 :placeholder="t('tools.data-transfer-rate-converter.amount-transferable.hours-placeholder')" :min="0" w-full />
        <n-input-number v-model:value="amountTransferableInput.minutes" mr-1 :placeholder="t('tools.data-transfer-rate-converter.amount-transferable.minutes-placeholder')" :min="0" w-full />
        <n-input-number v-model:value="amountTransferableInput.seconds" mr-1 :placeholder="t('tools.data-transfer-rate-converter.amount-transferable.seconds-placeholder')" :min="0" w-full />
      </n-form-item>

      <n-divider />

      <div flex items-baseline gap-2>
        <InputCopyable
          :label="t('tools.data-transfer-rate-converter.amount-transferable.amount-label')"
          label-position="left"
          :value="amountTransferableOutput"
          :placeholder="t('tools.data-transfer-rate-converter.amount-transferable.amount-placeholder')"
        />
        <c-select
          v-model:value="amountTransferableInput.dataSizeUnit"
          searchable
          :options="allStorateUnits"
          :placeholder="t('tools.data-transfer-rate-converter.amount-transferable.storage-unit-placeholder')"
          ml-1
          style="min-width: 200px"
        />
      </div>
    </c-card>
  </div>
</template>

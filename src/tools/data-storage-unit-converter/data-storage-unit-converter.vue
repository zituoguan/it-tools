<script setup lang="ts">
import InputCopyable from '../../components/InputCopyable.vue';
import { type AllSupportedUnits, convertStorageAndRateUnitsDisplay } from './data-storage-unit-converter.service';

const { t } = useI18n();

const input = ref<{ size: string; unit: string }>({ size: '0', unit: 'KB' });
const output = ref<{ unit: string; precision: number; appendUnit: boolean }>({ unit: 'MB', precision: 3, appendUnit: false });

const allUnits = [
  { value: 'B', label: t('tools.data-storage-unit-converter.units.bytes') },
  { value: 'b', label: t('tools.data-storage-unit-converter.units.bits') },
  { value: 'iB', label: t('tools.data-storage-unit-converter.units.bibytes') },
  { value: 'KB', label: t('tools.data-storage-unit-converter.units.kilobytes') },
  { value: 'Kb', label: t('tools.data-storage-unit-converter.units.kilobits') },
  { value: 'KiB', label: t('tools.data-storage-unit-converter.units.kibibytes') },
  { value: 'MB', label: t('tools.data-storage-unit-converter.units.megabytes') },
  { value: 'Mb', label: t('tools.data-storage-unit-converter.units.megabits') },
  { value: 'MiB', label: t('tools.data-storage-unit-converter.units.mebibytes') },
  { value: 'GB', label: t('tools.data-storage-unit-converter.units.gigabytes') },
  { value: 'Gb', label: t('tools.data-storage-unit-converter.units.gigabits') },
  { value: 'GiB', label: t('tools.data-storage-unit-converter.units.gibibytes') },
  { value: 'TB', label: t('tools.data-storage-unit-converter.units.terabytes') },
  { value: 'Tb', label: t('tools.data-storage-unit-converter.units.terabits') },
  { value: 'TiB', label: t('tools.data-storage-unit-converter.units.tebibytes') },
  { value: 'PB', label: t('tools.data-storage-unit-converter.units.petabytes') },
  { value: 'Pb', label: t('tools.data-storage-unit-converter.units.petabits') },
  { value: 'PiB', label: t('tools.data-storage-unit-converter.units.pebibytes') },
  { value: 'EB', label: t('tools.data-storage-unit-converter.units.exabytes') },
  { value: 'Eb', label: t('tools.data-storage-unit-converter.units.exabits') },
  { value: 'EiB', label: t('tools.data-storage-unit-converter.units.exbibytes') },
  { value: 'ZB', label: t('tools.data-storage-unit-converter.units.zettabytes') },
  { value: 'Zb', label: t('tools.data-storage-unit-converter.units.zettabits') },
  { value: 'ZiB', label: t('tools.data-storage-unit-converter.units.zebibytes') },
  { value: 'YB', label: t('tools.data-storage-unit-converter.units.yottabytes') },
  { value: 'Yb', label: t('tools.data-storage-unit-converter.units.yottabits') },
  { value: 'YiB', label: t('tools.data-storage-unit-converter.units.yobibytes') },
];

const convertedValue = computed(() => {
  try {
    return convertStorageAndRateUnitsDisplay({
      value: Number(input.value.size),
      fromUnit: input.value.unit as AllSupportedUnits,
      toUnit: output.value.unit as AllSupportedUnits,
      precision: output.value.precision,
      appendUnit: output.value.appendUnit,
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
      {{ t('tools.data-storage-unit-converter.info.conversion-examples') }}
      <n-a href="https://en.wikipedia.org/wiki/Byte" target="_blank" rel="noopener">
        {{ t('tools.data-storage-unit-converter.info.see-details') }}
      </n-a>
    </n-p>

    <c-card>
      <n-form-item :label="t('tools.data-storage-unit-converter.input.label')" label-placement="left" mb-1>
        <c-input-text
          v-model:value="input.size"
          :placeholder="t('tools.data-storage-unit-converter.input.placeholder')"
          mr-2
        />
        <c-select
          v-model:value="input.unit"
          :options="allUnits"
          :placeholder="t('tools.data-storage-unit-converter.input.unit-placeholder')"
          style="min-width: 200px;"
        />
      </n-form-item>

      <div flex items-baseline gap-2>
        <c-select
          v-model:value="output.unit"
          :label="t('tools.data-storage-unit-converter.output.label')" label-position="left"
          :options="allUnits"
          :placeholder="t('tools.data-storage-unit-converter.output.unit-placeholder')"
          style="min-width: 240px;"
        />

        <n-form-item :label="t('tools.data-storage-unit-converter.output.precision-label')" label-placement="left">
          <n-input-number v-model:value="output.precision" style="width:100px" :placeholder="t('tools.data-storage-unit-converter.output.precision-placeholder')" :max="10" :min="0" />
        </n-form-item>

        <n-checkbox v-model:checked="output.appendUnit">
          {{ t('tools.data-storage-unit-converter.output.show-unit') }}
        </n-checkbox>
      </div>

      <n-divider />

      <InputCopyable
        :label="t('tools.data-storage-unit-converter.output.value-label')"
        :value="convertedValue"
        :placeholder="t('tools.data-storage-unit-converter.output.value-placeholder')"
      />
    </c-card>
  </div>
</template>

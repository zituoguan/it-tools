<script setup lang="ts">
import type { Colord } from 'colord';
import { colord, extend } from 'colord';
import _ from 'lodash';
import cmykPlugin from 'colord/plugins/cmyk';
import hwbPlugin from 'colord/plugins/hwb';
import namesPlugin from 'colord/plugins/names';
import lchPlugin from 'colord/plugins/lch';
import xyzPlugin from 'colord/plugins/xyz';
import labPlugin from 'colord/plugins/lab';
import { buildColorFormat } from './color-converter.models';

extend([cmykPlugin, hwbPlugin, namesPlugin, lchPlugin, xyzPlugin, labPlugin]);

const { t } = useI18n();

const formats = {
  picker: buildColorFormat({
    label: t('tools.color-converter.colorPicker'),
    format: (v: Colord) => v.toHex(),
    type: 'color-picker',
  }),
  hex: buildColorFormat({
    label: 'hex',
    format: (v: Colord) => v.toHex(),
    placeholder: t('tools.color-converter.hexPlaceholder'),
  }),
  rgb: buildColorFormat({
    label: 'rgb',
    format: (v: Colord) => v.toRgbString(),
    placeholder: t('tools.color-converter.rgbPlaceholder'),
  }),
  hsl: buildColorFormat({
    label: 'hsl',
    format: (v: Colord) => v.toHslString(),
    placeholder: t('tools.color-converter.hslPlaceholder'),
  }),
  hwb: buildColorFormat({
    label: 'hwb',
    format: (v: Colord) => v.toHwbString(),
    placeholder: t('tools.color-converter.hwbPlaceholder'),
  }),
  lch: buildColorFormat({
    label: 'lch',
    format: (v: Colord) => v.toLchString(),
    placeholder: t('tools.color-converter.lchPlaceholder'),
  }),
  cmyk: buildColorFormat({
    label: 'cmyk',
    format: (v: Colord) => v.toCmykString(),
    placeholder: t('tools.color-converter.cmykPlaceholder'),
  }),
  lab: buildColorFormat({
    label: 'lab',
    format: (v: Colord) => JSON.stringify(v.toLab()),
    placeholder: t('tools.color-converter.labPlaceholder'),
    parse: value => colord(JSON.parse(value)),
  }),
  xyz: buildColorFormat({
    label: 'xyz',
    format: (v: Colord) => JSON.stringify(v.toXyz()),
    placeholder: t('tools.color-converter.xyzPlaceholder'),
    parse: value => colord(JSON.parse(value)),
  }),
  name: buildColorFormat({
    label: t('tools.color-converter.name'),
    format: (v: Colord) => v.toName({ closest: true }) ?? t('tools.color-converter.unknown'),
    placeholder: t('tools.color-converter.namePlaceholder'),
  }),
};

const saturation = ref(0);
const brightness = ref(0);
const grayscale = ref(false);
const invert = ref(false);

let lastColor = colord('#1ea54c');
watch([saturation, brightness, grayscale, invert],
  () => updateColorValue(lastColor),
);

updateColorValue(lastColor);

function updateColorValue(value: Colord | undefined, omitLabel?: string) {
  if (value === undefined) {
    return;
  }

  if (!value.isValid()) {
    return;
  }

  lastColor = value;

  let correctedValue = value;
  if (grayscale.value) {
    correctedValue = correctedValue.grayscale();
  }
  if (invert.value) {
    correctedValue = correctedValue.invert();
  }

  const saturationFloat = saturation.value / 100.0;
  if (saturationFloat > 0) {
    correctedValue = correctedValue.saturate(saturationFloat);
  }
  else if (saturationFloat < 0) {
    correctedValue = correctedValue.desaturate(-saturationFloat);
  }

  const brightnessFloat = brightness.value / 100.0;
  if (brightnessFloat > 0) {
    correctedValue = correctedValue.lighten(brightnessFloat);
  }
  else if (brightnessFloat < 0) {
    correctedValue = correctedValue.darken(-brightnessFloat);
  }

  _.forEach(formats, ({ value: valueRef, format }, key) => {
    if (key !== omitLabel) {
      valueRef.value = format(correctedValue);
    }
  });
}
</script>

<template>
  <div>
    <c-card :title="t('tools.color-converter.transformationsTitle')">
      <n-form-item :label="t('tools.color-converter.saturationLabel')" label-placement="left">
        <n-slider v-model:value="saturation" :step="1" :min="-100" :max="100" mr-2 />
        <n-input-number v-model:value="saturation" size="small" />
      </n-form-item>

      <n-form-item :label="t('tools.color-converter.brightnessLabel')" label-placement="left">
        <n-slider v-model:value="brightness" :step="1" :min="-100" :max="100" mr-2 />
        <n-input-number v-model:value="brightness" size="small" />
      </n-form-item>

      <n-space>
        <n-form-item :label="t('tools.color-converter.grayscaleLabel')" label-placement="left">
          <n-checkbox v-model:checked="grayscale" mr-2 />
        </n-form-item>

        <n-form-item :label="t('tools.color-converter.invertLabel')" label-placement="left">
          <n-checkbox v-model:checked="invert" mr-2 />
        </n-form-item>
      </n-space>
    </c-card>
    <c-card>
      <template v-for="({ label, parse, placeholder, validation, type }, key) in formats" :key="key">
        <input-copyable
          v-if="type === 'text'"
          v-model:value="formats[key].value.value"
          :test-id="`input-${key}`"
          :label="`${label}:`"
          label-position="left"
          label-width="100px"
          label-align="right"
          :placeholder="placeholder"
          :validation="validation"
          raw-text
          clearable
          mt-2
          @update:value="(v:string) => updateColorValue(parse(v), key)"
        />

        <n-form-item v-else-if="type === 'color-picker'" :label="`${label}:`" label-width="100" label-placement="left" :show-feedback="false">
          <n-color-picker
            v-model:value="formats[key].value.value"
            placement="bottom-end"
            @update:value="(v:string) => updateColorValue(parse(v), key)"
          />
        </n-form-item>
      </template>
    </c-card>
  </div>
</template>

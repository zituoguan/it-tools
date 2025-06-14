<script setup lang="ts">
import UnitsConverter from '@/components/UnitsConverter.vue';

const { t } = useI18n();

const supportedUnits = {
  J: t('tools.energy-converter.joule'),
  PJ: t('tools.energy-converter.petajoule'),
  TJ: t('tools.energy-converter.terajoule'),
  GJ: t('tools.energy-converter.gigajoule'),
  MJ: t('tools.energy-converter.megajoule'),
  kJ: t('tools.energy-converter.kilojoule'),
  hJ: t('tools.energy-converter.hectojoule'),
  daJ: t('tools.energy-converter.decajoule'),
  dJ: t('tools.energy-converter.decijoule'),
  cJ: t('tools.energy-converter.centijoule'),
  mJ: t('tools.energy-converter.millijoule'),
  µJ: t('tools.energy-converter.microjoule'),
  nJ: t('tools.energy-converter.nanojoule'),
  pJ: t('tools.energy-converter.picojoule'),
  fJ: t('tools.energy-converter.femtojoule'),
  Wh: t('tools.energy-converter.watt-hour'),
  PWh: t('tools.energy-converter.petawatt-hour'),
  TWh: t('tools.energy-converter.terawatt-hour'),
  GWh: t('tools.energy-converter.gigawatt-hour'),
  MWh: t('tools.energy-converter.megawatt-hour'),
  kWh: t('tools.energy-converter.kilowatt-hour'),
  hWh: t('tools.energy-converter.hectowatt-hour'),
  daWh: t('tools.energy-converter.decawatt-hour'),
  dWh: t('tools.energy-converter.deciwatt-hour'),
  cWh: t('tools.energy-converter.centiwatt-hour'),
  mWh: t('tools.energy-converter.milliwatt-hour'),
  µWh: t('tools.energy-converter.microwatt-hour'),
  nWh: t('tools.energy-converter.nanowatt-hour'),
  pWh: t('tools.energy-converter.picowatt-hour'),
  fWh: t('tools.energy-converter.femtowatt-hour'),
};
</script>

<template>
  <UnitsConverter default-unit="J" :supported-units="supportedUnits" label-width="150px" />
</template>

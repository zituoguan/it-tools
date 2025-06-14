<script setup lang="ts">
import UnitsConverter from '@/components/UnitsConverter.vue';

const { t } = useI18n();

const supportedUnits = {
  W: t('tools.power-converter.units.watt'),
  PW: t('tools.power-converter.units.petawatt'),
  TW: t('tools.power-converter.units.terawatt'),
  GW: t('tools.power-converter.units.gigawatt'),
  MW: t('tools.power-converter.units.megawatt'),
  kW: t('tools.power-converter.units.kilowatt'),
  hW: t('tools.power-converter.units.hectowatt'),
  daW: t('tools.power-converter.units.decawatt'),
  dW: t('tools.power-converter.units.deciwatt'),
  cW: t('tools.power-converter.units.centiwatt'),
  mW: t('tools.power-converter.units.milliwatt'),
  μW: t('tools.power-converter.units.microwatt'),
  nW: t('tools.power-converter.units.nanowatt'),
  pW: t('tools.power-converter.units.picowatt'),
  fW: t('tools.power-converter.units.femtowatt'),
  horsepower: t('tools.power-converter.units.horsepower'),
  hp: t('tools.power-converter.units.mechanicalHorsepower'),
}; ;
</script>

<template>
  <UnitsConverter default-unit="W" :supported-units="supportedUnits" label-width="150px" />
</template>

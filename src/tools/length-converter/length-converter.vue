<script setup lang="ts">
import UnitsConverter from '@/components/UnitsConverter.vue';

const { t } = useI18n();

const supportedUnits = {
  m: t('tools.length-converter.meter'),
  Pm: t('tools.length-converter.petameter'),
  Tm: t('tools.length-converter.terameter'),
  Gm: t('tools.length-converter.gigameter'),
  Mm: t('tools.length-converter.megameter'),
  km: t('tools.length-converter.kilometer'),
  hm: t('tools.length-converter.hectometer'),
  dam: t('tools.length-converter.decameter'),
  dm: t('tools.length-converter.decimeter'),
  cm: t('tools.length-converter.centimeter'),
  mm: t('tools.length-converter.millimeter'),
  µm: t('tools.length-converter.micrometer'),
  nm: t('tools.length-converter.nanometer'),
  pm: t('tools.length-converter.picometer'),
  fm: t('tools.length-converter.femtometer'),
  ft: t('tools.length-converter.foot'),
  in: t('tools.length-converter.inch'),
  yd: t('tools.length-converter.yard'),
  mi: t('tools.length-converter.mile'),
  nmi: t('tools.length-converter.nauticalMile'),
  ly: t('tools.length-converter.lightYear'),
  pc: t('tools.length-converter.pica'),
};
</script>

<template>
  <UnitsConverter default-unit="m" :supported-units="supportedUnits" label-width="150px" />
</template>

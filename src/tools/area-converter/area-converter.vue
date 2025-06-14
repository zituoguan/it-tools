<script setup lang="ts">
import UnitsConverter from '@/components/UnitsConverter.vue';

const { t } = useI18n();

const supportedUnits = {
  'm²': t('tools.area-converter.m2'),
  'Pm²': t('tools.area-converter.Pm2'),
  'Tm²': t('tools.area-converter.Tm2'),
  'Gm²': t('tools.area-converter.Gm2'),
  'Mm²': t('tools.area-converter.Mm2'),
  'km²': t('tools.area-converter.km2'),
  'hm²': t('tools.area-converter.hm2'),
  'dam²': t('tools.area-converter.dam2'),
  'dm²': t('tools.area-converter.dm2'),
  'cm²': t('tools.area-converter.cm2'),
  'mm²': t('tools.area-converter.mm2'),
  'μm²': t('tools.area-converter.um2'),
  'nm²': t('tools.area-converter.nm2'),
  'pm²': t('tools.area-converter.pm2'),
  'fm²': t('tools.area-converter.fm2'),
  'ac': t('tools.area-converter.ac'),
  'ca': t('tools.area-converter.ca'),
  'da': t('tools.area-converter.da'),
  'are': t('tools.area-converter.are'),
  'daa': t('tools.area-converter.daa'),
  'ha': t('tools.area-converter.ha'),
  'ft²': t('tools.area-converter.ft2'),
  'in²': t('tools.area-converter.in2'),
  'yd²': t('tools.area-converter.yd2'),
  'mi²': t('tools.area-converter.mi2'),
};
</script>

<template>
  <UnitsConverter default-unit="m²" :supported-units="supportedUnits" label-width="150px" />
</template>

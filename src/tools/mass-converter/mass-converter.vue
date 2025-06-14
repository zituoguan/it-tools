<script setup lang="ts">
import UnitsConverter from '@/components/UnitsConverter.vue';

const { t } = useI18n();

const supportedUnits = computed(() => ({
  'g': t('tools.mass-converter.units.gram'),
  'Pg': t('tools.mass-converter.units.petagram'),
  'Tg': t('tools.mass-converter.units.teragram'),
  'Gg': t('tools.mass-converter.units.gigagram'),
  'Mg': t('tools.mass-converter.units.megagram'),
  'kg': t('tools.mass-converter.units.kilogram'),
  'hg': t('tools.mass-converter.units.hectogram'),
  'dag': t('tools.mass-converter.units.decagram'),
  'dg': t('tools.mass-converter.units.decigram'),
  'cg': t('tools.mass-converter.units.centigram'),
  'mg': t('tools.mass-converter.units.milligram'),
  'μg': t('tools.mass-converter.units.microgram'),
  'ng': t('tools.mass-converter.units.nanogram'),
  'pg': t('tools.mass-converter.units.picogram'),
  'fg': t('tools.mass-converter.units.femtogram'),
  'tonne': t('tools.mass-converter.units.tonne'),
  't': t('tools.mass-converter.units.metric-ton'),
  'kt': t('tools.mass-converter.units.kilotonne'),
  'Mt': t('tools.mass-converter.units.megatonne'),
  'Gt': t('tools.mass-converter.units.gigatonne'),
  'lb': t('tools.mass-converter.units.pound'),
  'st': t('tools.mass-converter.units.stone'),
  'oz': t('tools.mass-converter.units.ounce'),
  'short ton': t('tools.mass-converter.units.short-ton'),
  'US ton': t('tools.mass-converter.units.us-ton'),
  'long ton': t('tools.mass-converter.units.long-ton'),
  'imperial ton': t('tools.mass-converter.units.imperial-ton'),
  'displacement ton': t('tools.mass-converter.units.displacement-ton'),
}));
</script>

<template>
  <UnitsConverter default-unit="g" :supported-units="supportedUnits" label-width="150px" />
</template>

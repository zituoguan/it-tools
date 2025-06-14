<script setup lang="ts">
import UnitsConverter from '@/components/UnitsConverter.vue';

const { t } = useI18n();

const supportedUnits = {
  deg: t('tools.angle-converter.deg'),
  rad: t('tools.angle-converter.rad'),
  turn: t('tools.angle-converter.turn'),
  gradian: t('tools.angle-converter.gradian'),
  grad: t('tools.angle-converter.grad'),
  gon: t('tools.angle-converter.gon'),
};
</script>

<template>
  <UnitsConverter default-unit="deg" :supported-units="supportedUnits" label-width="150px" />
</template>

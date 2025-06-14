<script setup lang="ts">
import UnitsConverter from '@/components/UnitsConverter.vue';

const { t } = useI18n();

const supportedUnits = computed(() => ({
  'N': t('tools.force-converter.units.newton'),
  'PN': t('tools.force-converter.units.petanewton'),
  'TN': t('tools.force-converter.units.teranewton'),
  'GN': t('tools.force-converter.units.giganewton'),
  'MN': t('tools.force-converter.units.meganewton'),
  'kN': t('tools.force-converter.units.kilonewton'),
  'hN': t('tools.force-converter.units.hectonewton'),
  'daN': t('tools.force-converter.units.decanewton'),
  'dN': t('tools.force-converter.units.decinewton'),
  'cN': t('tools.force-converter.units.centinewton'),
  'mN': t('tools.force-converter.units.millinewton'),
  'µN': t('tools.force-converter.units.micronewton'),
  'nN': t('tools.force-converter.units.nanonewton'),
  'pN': t('tools.force-converter.units.piconewton'),
  'fN': t('tools.force-converter.units.femtonewton'),
  'dyn': t('tools.force-converter.units.dyne'),
  'lbf': t('tools.force-converter.units.poundOfForce'),
  'kip': t('tools.force-converter.units.kip'),
  'klb': t('tools.force-converter.units.klb'),
  'kipf': t('tools.force-converter.units.kipf'),
  'klbf': t('tools.force-converter.units.klbf'),
  'pdl': t('tools.force-converter.units.poundal'),
  'kgf': t('tools.force-converter.units.kilogramForce'),
  'kp': t('tools.force-converter.units.kilopond'),
  'Mp': t('tools.force-converter.units.megapond'),
  'tf': t('tools.force-converter.units.tonneForce'),
  'metric tf': t('tools.force-converter.units.metricTonForce'),
  'megagram-force': t('tools.force-converter.units.megagramForce'),
}));
</script>

<template>
  <UnitsConverter default-unit="N" :supported-units="supportedUnits" label-width="150px" />
</template>

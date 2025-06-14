<script setup lang="ts">
import UnitsConverter from '@/components/UnitsConverter.vue';

const { t } = useI18n();

const supportedUnits = {
  'Pa': t('tools.pressure-converter.units.pascal'),
  'PPa': t('tools.pressure-converter.units.pettapascal'),
  'TPa': t('tools.pressure-converter.units.terapascal'),
  'GPa': t('tools.pressure-converter.units.gigapascal'),
  'MPa': t('tools.pressure-converter.units.megapascal'),
  'kPa': t('tools.pressure-converter.units.kilopascal'),
  'hPa': t('tools.pressure-converter.units.hectopascal'),
  'daPa': t('tools.pressure-converter.units.decapascal'),
  'dPa': t('tools.pressure-converter.units.decipascal'),
  'cPa': t('tools.pressure-converter.units.centipascal'),
  'mPa': t('tools.pressure-converter.units.millipascal'),
  'μPa': t('tools.pressure-converter.units.micropascal'),
  'nPa': t('tools.pressure-converter.units.nanopascal'),
  'pPa': t('tools.pressure-converter.units.picopascal'),
  'fPa': t('tools.pressure-converter.units.femtopascal'),
  'bar': t('tools.pressure-converter.units.bar'),
  'Pbar': t('tools.pressure-converter.units.petabar'),
  'Tbar': t('tools.pressure-converter.units.terabar'),
  'Gbar': t('tools.pressure-converter.units.gigabar'),
  'Mbar': t('tools.pressure-converter.units.megabar'),
  'kbar': t('tools.pressure-converter.units.kilobar'),
  'hbar': t('tools.pressure-converter.units.hectobar'),
  'dabar': t('tools.pressure-converter.units.decabar'),
  'dbar': t('tools.pressure-converter.units.decibar'),
  'cbar': t('tools.pressure-converter.units.centibar'),
  'mbar': t('tools.pressure-converter.units.millibar'),
  'μbar': t('tools.pressure-converter.units.microbar'),
  'nbar': t('tools.pressure-converter.units.nanobar'),
  'pbar': t('tools.pressure-converter.units.picobar'),
  'fbar': t('tools.pressure-converter.units.femtobar'),
  'Torr': t('tools.pressure-converter.units.torr'),
  'mTorr': t('tools.pressure-converter.units.millitorr'),
  'atm': t('tools.pressure-converter.units.atmosphere'),
  'psi': t('tools.pressure-converter.units.psi'),
  'lbf/in2': t('tools.pressure-converter.units.lbfIn2'),
};
</script>

<template>
  <UnitsConverter default-unit="Pa" :supported-units="supportedUnits" label-width="150px" />
</template>

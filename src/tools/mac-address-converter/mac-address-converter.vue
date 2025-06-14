<script setup lang="ts">
import InputCopyable from '../../components/InputCopyable.vue';
import {
  convertMacCISCO, convertMacCanonical,
  convertMacCanonicalIEEE, convertMacCanonicalIETF,
  convertMacToEUI64CISCO, convertMacToEUI64CanonicalIEEE,
  convertMacToEUI64CanonicalIETF, convertMacToLinkLocalIPv6,
  convertMacToNumber,
} from './mac-address-converter.service';

const { t } = useI18n();

const input = ref('AA:BB:CC:DD:EE:FF');

const formats = computed(() => [
  {
    label: t('tools.mac-address-converter.canonicalIETF'),
    value: convertMacCanonicalIETF(input.value),
  },
  {
    label: t('tools.mac-address-converter.canonical'),
    value: convertMacCanonical(input.value),
  },
  {
    label: t('tools.mac-address-converter.canonicalIEEE'),
    value: convertMacCanonicalIEEE(input.value),
  },
  {
    label: t('tools.mac-address-converter.cisco'),
    value: convertMacCISCO(input.value),
  },
  {
    label: t('tools.mac-address-converter.hex'),
    value: convertMacToNumber(input.value).toString(16),
  },
  {
    label: t('tools.mac-address-converter.decimal'),
    value: convertMacToNumber(input.value).toString(10),
  },
  {
    label: t('tools.mac-address-converter.eui64CanonicalIETF'),
    value: convertMacToEUI64CanonicalIETF(input.value, false),
  },
  {
    label: t('tools.mac-address-converter.eui64CanonicalIEEE'),
    value: convertMacToEUI64CanonicalIEEE(input.value, false),
  },
  {
    label: t('tools.mac-address-converter.eui64Cisco'),
    value: convertMacToEUI64CISCO(input.value, false),
  },
  {
    label: t('tools.mac-address-converter.eui64IPv6CanonicalIETF'),
    value: convertMacToEUI64CanonicalIETF(input.value, true),
  },
  {
    label: t('tools.mac-address-converter.eui64IPv6CanonicalIEEE'),
    value: convertMacToEUI64CanonicalIEEE(input.value, true),
  },
  {
    label: t('tools.mac-address-converter.eui64IPv6Cisco'),
    value: convertMacToEUI64CISCO(input.value, true),
  },
  {
    label: t('tools.mac-address-converter.linkLocalIPv6'),
    value: convertMacToLinkLocalIPv6(input.value),
  },
]);

const inputLabelAlignmentConfig = {
  labelPosition: 'left',
  labelWidth: '120px',
  labelAlign: 'right',
};
</script>

<template>
  <c-card>
    <c-input-text
      v-model:value="input"
      :label="t('tools.mac-address-converter.macAddress')"
      size="large"
      :placeholder="t('tools.mac-address-converter.placeholder')"
      clearable
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      mb-5
    />

    <div my-16px divider />

    <InputCopyable
      v-for="format in formats"
      :key="format.label"
      :value="format.value"
      :label="format.label"
      v-bind="inputLabelAlignmentConfig"
      mb-1
    />
  </c-card>
</template>

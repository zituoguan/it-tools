<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import { Address6 } from 'ip-address';
import { getIPNetworkType, parseAsCIDR } from '@/utils/ip';
import { withDefaultOnError } from '@/utils/defaults';
import SpanCopyable from '@/components/SpanCopyable.vue';
import { isNotThrowing } from '@/utils/boolean';

const { t } = useI18n();
const ip = useStorage('ipv6-subnet-calculator:ip', '2001:db8:0:85a3:0:0:ac1f:8001/32'); // NOSONAR

const getNetworkInfo = (address: string) => new Address6(parseAsCIDR(address.trim()) || address.trim());
const networkInfo = computed(() => withDefaultOnError(() => getNetworkInfo(ip.value), undefined));

const ipValidationRules = [
  {
    message: t('tools.ipv6-subnet-calculator.validationError'),
    validator: (value: string) => isNotThrowing(() => getNetworkInfo(value)),
  },
];

const sections: {
  label: string
  getValue: (blocks: Address6) => string | undefined
  undefinedFallback?: string
}[] = [
  {
    label: t('tools.ipv6-subnet-calculator.fullAddress'),
    getValue: (block: Address6) => block.canonicalForm(),
  },
  {
    label: t('tools.ipv6-subnet-calculator.shortAddress'),
    getValue: (block: Address6) => block.correctForm(),
  },
  {
    label: t('tools.ipv6-subnet-calculator.addressAsBinary'),
    getValue: (block: Address6) => (block.binaryZeroPad()).match(/.{8}/g)?.join(':') ?? '',
  },
  {
    label: t('tools.ipv6-subnet-calculator.addressAsInteger'),
    getValue: (block: Address6) => BigInt(`0x${block.getBitsBase16(0, 128)}`).toString(),
  },
  {
    label: t('tools.ipv6-subnet-calculator.addressAsDecimal'),
    getValue: (block: Address6) => block.decimal(),
  },
  {
    label: t('tools.ipv6-subnet-calculator.addressAsHex'),
    getValue: (block: Address6) => (block.getBitsBase16(0, 128)),
  },
  {
    label: t('tools.ipv6-subnet-calculator.networkMaskSize'),
    getValue: (block: Address6) => block.subnetMask.toString(),
  },
  {
    label: t('tools.ipv6-subnet-calculator.networkMask'),
    getValue: (block: Address6) => BigInt(`0b${'1'.repeat(block.subnetMask).padEnd(128, '0')}`).toString(16).match(/.{4}/g)?.join(':') ?? '',
  },
  {
    label: t('tools.ipv6-subnet-calculator.networkMaskAsInteger'),
    getValue: (block: Address6) => BigInt(`0b${'1'.repeat(block.subnetMask).padEnd(128, '0')}`).toString(),
  },
  {
    label: t('tools.ipv6-subnet-calculator.networkMaskAsBinary'),
    getValue: (block: Address6) => '1'.repeat(block.subnetMask).padEnd(128, '0').match(/.{8}/g)?.join(':') ?? '',
  },
  {
    label: t('tools.ipv6-subnet-calculator.totalIpAddresses'),
    getValue: (block: Address6) => {
      const totalAddresses = BigInt(2) ** BigInt(128 - block.subnetMask);
      return totalAddresses.toString();
    },
  },
  {
    label: t('tools.ipv6-subnet-calculator.totalNetworks'),
    getValue: ({ subnetMask }) => subnetMask <= 64 ? (BigInt(2) ** BigInt(64 - subnetMask)).toString() : '',
  },
  {
    label: t('tools.ipv6-subnet-calculator.firstAddress'),
    getValue: (block: Address6) => block.startAddress().correctForm(),
  },
  {
    label: t('tools.ipv6-subnet-calculator.lastAddress'),
    getValue: (block: Address6) => block.endAddress().correctForm(),
  },
  {
    label: t('tools.ipv6-subnet-calculator.scope'),
    getValue: (block: Address6) => block.getScope(),
  },
  {
    label: t('tools.ipv6-subnet-calculator.sixToFourProperties'),
    getValue: (block: Address6) => JSON.stringify(block.inspect6to4()),
  },
  {
    label: t('tools.ipv6-subnet-calculator.teredoProperties'),
    getValue: (block: Address6) => JSON.stringify(block.inspectTeredo()),
  },
  {
    label: t('tools.ipv6-subnet-calculator.arpa'),
    getValue: (block: Address6) => block.reverseForm(),
  },
  {
    label: t('tools.ipv6-subnet-calculator.microsoftUncTranscription'),
    getValue: (block: Address6) => block.microsoftTranscription(),
  },
  {
    label: t('tools.ipv6-subnet-calculator.type'),
    getValue: (block: Address6) => getIPNetworkType(block.correctForm()),
  },
];
</script>

<template>
  <div w-600>
    <c-input-text
      v-model:value="ip"
      :label="t('tools.ipv6-subnet-calculator.inputLabel')"
      :placeholder="t('tools.ipv6-subnet-calculator.inputPlaceholder')"
      :validation-rules="ipValidationRules"
      mb-4
    />

    <div v-if="networkInfo">
      <n-table>
        <tbody>
          <tr v-for="{ getValue, label, undefinedFallback } in sections" :key="label">
            <td font-bold style="min-width: 180px;">
              {{ label }}
            </td>
            <td>
              <SpanCopyable v-if="networkInfo" :value="getValue(networkInfo)" />
              <span v-else op-70>
                {{ undefinedFallback }}
              </span>
            </td>
          </tr>
        </tbody>
      </n-table>
    </div>
  </div>
</template>

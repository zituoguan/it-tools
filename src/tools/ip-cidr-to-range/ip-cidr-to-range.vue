<script setup lang="ts">
import isCidr from 'is-cidr';
import { expandCidr } from 'cidr-tools';
import { getIPNetworkType, parseAsCIDR } from '@/utils/ip';
import { useValidation } from '@/composable/validation';

const { t } = useI18n();

const rawCIDR = useStorage('ip-cidr-to-range:cidr', '192.168.1.0/24'); // NOSONAR

const result = computed(() => {
  const parsedCIDR = parseAsCIDR(rawCIDR.value) || rawCIDR.value;
  const ips = [...expandCidr(parsedCIDR)];
  if (!ips || !ips.length) {
    return undefined;
  }

  return {
    startIpAddress: ips.slice(0, 1)[0],
    endIpAddress: ips.slice(-1)[0],
    parsedCIDR,
    networkType: getIPNetworkType(ips.slice(0, 1)[0]) || 'Public',
  };
});

const cidrValidation = useValidation({
  source: rawCIDR,
  rules: [{ message: t('tools.ip-cidr-to-range.invalidCidr'), validator: cidr => isCidr(parseAsCIDR(cidr) || cidr) }],
});

const showResult = computed(() => cidrValidation.isValid && result.value !== undefined);
</script>

<template>
  <div>
    <c-input-text
      v-model:value="rawCIDR"
      :label="t('tools.ip-cidr-to-range.inputLabel')"
      :placeholder="t('tools.ip-cidr-to-range.inputPlaceholder')"
      :validation="cidrValidation"
      clearable
    />

    <c-card v-if="showResult" :title="t('tools.ip-cidr-to-range.resultingCidr')" mt-4>
      <input-copyable
        :label="t('tools.ip-cidr-to-range.cidr')"
        label-position="left"
        label-width="150px"
        label-align="right"

        :value="result?.parsedCIDR"
        disabled mb-2
      />
    </c-card>

    <c-card v-if="showResult" :title="t('tools.ip-cidr-to-range.ipRange')" mt-4>
      <input-copyable
        :label="t('tools.ip-cidr-to-range.startIpAddress')"
        label-position="left"
        label-width="150px"
        label-align="right"

        :value="result?.startIpAddress"
        disabled mb-2
      />
      <input-copyable
        :label="t('tools.ip-cidr-to-range.endIpAddress')"
        label-position="left"
        label-width="150px"
        label-align="right"

        :value="result?.endIpAddress"
        disabled mb-2
      />

      <input-copyable
        :label="t('tools.ip-cidr-to-range.networkType')"
        label-position="left"
        label-width="150px"
        label-align="right"

        :value="result?.networkType"
        disabled mb-2
      />
    </c-card>
  </div>
</template>

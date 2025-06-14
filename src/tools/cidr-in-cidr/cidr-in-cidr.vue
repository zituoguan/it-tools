<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import { Check as CheckIcon, LetterX as CrossIcon } from '@vicons/tabler';
import { getMatch } from 'ip-matching';
import { cidrInCidr } from './cidr-in-cidr.service';
import { withDefaultOnError } from '@/utils/defaults';
import { isNotThrowing } from '@/utils/boolean';
import SpanCopyable from '@/components/SpanCopyable.vue';

const { t } = useI18n();

const baseRange = useStorage('cidr-in-cidr:range', '192.168.0.1/24'); // NOSONAR
const ipOrRangeToTest = useStorage('cidr-in-cidr:ip', '192.168.0.1'); // NOSONAR

const matchResult = computed(() => withDefaultOnError(
  () => cidrInCidr({ baseRange: baseRange.value, ipOrRangeToTest: ipOrRangeToTest.value }),
  { baseSubnets: [], isIncluded: false }));

const rangeValidationRules = [
  {
    message: t('tools.cidr-in-cidr.rangeValidationMessage'),
    validator: (value: string) => isNotThrowing(() => getMatch(value)) && getMatch(value),
  },
];
</script>

<template>
  <div>
    <c-input-text
      v-model:value="baseRange"
      :label="t('tools.cidr-in-cidr.baseRangeLabel')"
      :placeholder="t('tools.cidr-in-cidr.baseRangePlaceholder')"
      :validation-rules="rangeValidationRules"
      mb-4
    />

    <c-input-text
      v-model:value="ipOrRangeToTest"
      :label="t('tools.cidr-in-cidr.ipOrRangeToTestLabel')"
      :placeholder="t('tools.cidr-in-cidr.ipOrRangeToTestPlaceholder')"
      :validation-rules="rangeValidationRules"
      mb-4
    />

    <n-divider />

    <div flex justify-center>
      <span v-if="matchResult.isIncluded">
        <n-icon color="green">
          <CheckIcon />
        </n-icon>
        {{ t('tools.cidr-in-cidr.included') }}
      </span>
      <span v-else>
        <n-icon color="red">
          <CrossIcon />
        </n-icon>
        {{ t('tools.cidr-in-cidr.notIncluded') }}
      </span>
    </div>

    <n-divider />

    <c-card :title="t('tools.cidr-in-cidr.subnetsTitle')">
      <n-table>
        <tbody>
          <tr v-for="{ cidr, start, end } in matchResult.baseSubnets" :key="cidr">
            <td font-bold>
              <SpanCopyable :value="cidr" />
            </td>
            <td>
              <SpanCopyable :value="start" />
            </td>
            <td>
              <SpanCopyable :value="end" />
            </td>
          </tr>
        </tbody>
      </n-table>
    </c-card>
  </div>
</template>

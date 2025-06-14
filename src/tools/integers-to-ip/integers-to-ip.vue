<script setup lang="ts">
import { stringifyIp } from 'ip-bigint';
import InputCopyable from '../../components/InputCopyable.vue';
import { convertBase, hasNumberPrefix } from '../integer-base-converter/integer-base-converter.model';

const { t } = useI18n();

const input = ref('3232235777');
const inputBase = ref(10);

const hasInputNumberPrefix = computed(() => hasNumberPrefix(input.value));

function convertToIP({ value, fromBase, version }: { value: string; fromBase: number; version: 6 | 4 }): string {
  try {
    return stringifyIp({
      number: BigInt(convertBase({
        value,
        fromBase,
        toBase: 10,
      })),
      version,
    }) ?? t('tools.integers-to-ip.invalidIP');
  }
  catch (err) {
    return err?.toString() ?? t('tools.integers-to-ip.invalidIP');
  }
}
</script>

<template>
  <div>
    <c-card>
      <c-input-text v-model:value="input" :label="t('tools.integers-to-ip.inputNumber')" :placeholder="t('tools.integers-to-ip.inputNumberPlaceholder')" label-position="left" label-width="110px" mb-2 label-align="right" />

      <n-form-item v-if="!hasInputNumberPrefix" :label="t('tools.integers-to-ip.inputBase')" label-placement="left" label-width="110" :show-feedback="false">
        <c-select
          v-model:value="inputBase"
          :options="[
            { value: 2, label: t('tools.integers-to-ip.binary') },
            { value: 8, label: t('tools.integers-to-ip.octal') },
            { value: 10, label: t('tools.integers-to-ip.decimal') },
            { value: 16, label: t('tools.integers-to-ip.hexadecimal') },
          ]"
          :placeholder="t('tools.integers-to-ip.selectBase')"
          w-100px
        />
      </n-form-item>

      <n-divider />

      <InputCopyable
        :label="t('tools.integers-to-ip.formattedIPv4')"
        label-position="left" label-width="110px" mb-2 label-align="right"
        :value="convertToIP({ value: input, fromBase: inputBase, version: 4 })"
        :placeholder="t('tools.integers-to-ip.formattedIPv4Placeholder')"
      />

      <InputCopyable
        :label="t('tools.integers-to-ip.formattedIPv6')"
        label-position="left" label-width="110px" mb-2 label-align="right"
        :value="convertToIP({ value: input, fromBase: inputBase, version: 6 })"
        :placeholder="t('tools.integers-to-ip.formattedIPv6Placeholder')"
      />
    </c-card>
  </div>
</template>

<style lang="less" scoped>
.n-input-group:not(:first-child) {
  margin-top: 5px;
}
</style>

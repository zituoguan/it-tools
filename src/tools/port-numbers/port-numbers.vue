<script setup lang="ts">
import ports from 'port-numbers';
import SpanCopyable from '@/components/SpanCopyable.vue';

const { t } = useI18n();

const port = ref(80);
const protocol = ref('tcp');
const result = computed(() => {
  const [type, description] = ports[`${port.value}/${protocol.value}` as (keyof typeof ports)];
  return { type: type ?? t('tools.port-numbers.unknown'), description: description ?? t('tools.port-numbers.unknownDesc') };
});
</script>

<template>
  <div>
    <c-card :title="t('tools.port-numbers.portSearch')">
      <n-space>
        <n-form-item :label="t('tools.port-numbers.portNumber')">
          <n-input-number v-model:value="port" :min="1" />
        </n-form-item>
        <n-form-item :label="t('tools.port-numbers.protocol')">
          <c-select
            v-model:value="protocol"
            :options="[
              { value: 'tcp', label: t('tools.port-numbers.tcp') },
              { value: 'udp', label: t('tools.port-numbers.udp') },
            ]"
          />
        </n-form-item>
      </n-space>
    </c-card>

    <c-card>
      <n-form-item :label="t('tools.port-numbers.type')">
        <SpanCopyable :value="result?.type" />
      </n-form-item>
      <n-form-item :label="t('tools.port-numbers.portDescription')">
        <SpanCopyable :value="result?.description" />
      </n-form-item>
    </c-card>
  </div>
</template>

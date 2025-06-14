<script setup lang="ts">
import { combineTXT, query, wellknown } from 'dns-query';
import types from './dns.records.types.json';

const { t } = useI18n();
const type = ref('A');
const name = ref('google.com');
const answers = ref<string[]>([]);

// Create translated DNS record type options
const dnsTypeOptions = computed(() => {
  return Object.values(types).map(kv => ({
    value: kv.value,
    label: `${kv.value}: ${t(`tools.dns-queries.record-types.${kv.value.toLowerCase()}`, kv.label)}`,
  }));
});

async function queryDNS() {
  const endpoints = await wellknown.endpoints('doh');
  try {
    const response = await query({
      question: { type: type.value, name: name.value },
    }, {
      endpoints,
    });
    if (type.value === 'TXT') {
      answers.value = (response.answers || []).map(answer => `${answer.name} ${answer.type} ${combineTXT(answer.data as Uint8Array[])} (TTL=${answer.ttl})`);
    }
    else {
      answers.value = (response.answers || []).map(answer => `${answer.name} ${answer.type} ${answer.data} (TTL=${answer.ttl})`);
    }
  }
  catch (error: any) {
    answers.value = [error.toString()];
  }
}
</script>

<template>
  <div>
    <c-input-text
      v-model:value="name"
      :label="t('tools.dns-queries.name-label')"
      label-position="left"
      :placeholder="t('tools.dns-queries.name-placeholder')"
      mb-2
    />
    <c-select
      v-model:value="type"
      searchable
      :label="t('tools.dns-queries.record-type-label')"
      label-position="left"
      :options="dnsTypeOptions"
      mb-2
    />

    <div flex justify-center>
      <c-button
        @click="queryDNS"
      >
        {{ t('tools.dns-queries.send-query-button') }}
      </c-button>
    </div>

    <n-divider />

    <c-card :title="t('tools.dns-queries.results-title')">
      <textarea-copyable
        v-for="(answer, index) in answers"
        :key="index"
        :value="answer"
        word-wrap
        mb-2
      />
    </c-card>
  </div>
</template>

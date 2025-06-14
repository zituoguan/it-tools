<script setup lang="ts">
import { ref } from 'vue';

const { t } = useI18n();
const domain = ref('');
const policy = ref('none');
const subPolicy = ref('none');
const percentage = ref(100);
const rua = ref('');
const ruf = ref('');
const aspf = ref('r');
const adkim = ref('r');
const ri = ref(86400);
const dmarcRecord = computed(() => {
  const recordParts = ['v=DMARC1', `p=${policy.value}`, `sp=${subPolicy.value}`];

  if (percentage.value !== 100) {
    recordParts.push(`pct=${percentage.value}`);
  }
  if (rua.value) {
    recordParts.push(`rua=mailto:${rua.value}`);
  }
  if (ruf.value) {
    recordParts.push(`ruf=mailto:${ruf.value}`);
  }
  if (aspf.value) {
    recordParts.push(`aspf=${aspf.value}`);
  }
  if (adkim.value) {
    recordParts.push(`adkim=${adkim.value}`);
  }
  if (ri.value) {
    recordParts.push(`ri=${ri.value}`);
  }

  return recordParts.join('; ');
});

const policies = [
  { label: t('tools.dmarc-dns-generator.policies.none'), value: 'none' },
  { label: t('tools.dmarc-dns-generator.policies.quarantine'), value: 'quarantine' },
  { label: t('tools.dmarc-dns-generator.policies.reject'), value: 'reject' },
];

const alignments = [
  { label: t('tools.dmarc-dns-generator.alignments.relaxed'), value: 'r' },
  { label: t('tools.dmarc-dns-generator.alignments.strict'), value: 's' },
];
</script>

<template>
  <n-card :title="t('tools.dmarc-dns-generator.title')" max-w-600px>
    <n-form-item :label="t('tools.dmarc-dns-generator.domain-label')" label-placement="left">
      <n-input v-model:value="domain" :placeholder="t('tools.dmarc-dns-generator.domain-placeholder')" />
    </n-form-item>

    <n-form-item :label="t('tools.dmarc-dns-generator.policy-label')" label-placement="left">
      <n-select v-model:value="policy" :options="policies" :placeholder="t('tools.dmarc-dns-generator.policy-placeholder')" />
    </n-form-item>

    <n-form-item :label="t('tools.dmarc-dns-generator.subdomain-policy-label')" label-placement="left">
      <n-select v-model:value="subPolicy" :options="policies" :placeholder="t('tools.dmarc-dns-generator.policy-placeholder')" />
    </n-form-item>

    <n-form-item :label="t('tools.dmarc-dns-generator.percentage-label')" label-placement="top">
      <n-input-number v-model:value="percentage" :min="0" :max="100" :placeholder="t('tools.dmarc-dns-generator.percentage-placeholder')" />
    </n-form-item>

    <n-form-item :label="t('tools.dmarc-dns-generator.aggregate-email-label')" label-placement="top">
      <n-input v-model:value="rua" placeholder="admin@example.com" />
    </n-form-item>

    <n-form-item :label="t('tools.dmarc-dns-generator.forensic-email-label')" label-placement="top">
      <n-input v-model:value="ruf" placeholder="admin@example.com" />
    </n-form-item>

    <n-form-item :label="t('tools.dmarc-dns-generator.spf-alignment-label')" label-placement="left">
      <n-select v-model:value="aspf" :options="alignments" :placeholder="t('tools.dmarc-dns-generator.alignment-placeholder')" />
    </n-form-item>

    <n-form-item :label="t('tools.dmarc-dns-generator.dkim-alignment-label')" label-placement="left">
      <n-select v-model:value="adkim" :options="alignments" :placeholder="t('tools.dmarc-dns-generator.alignment-placeholder')" />
    </n-form-item>

    <n-form-item :label="t('tools.dmarc-dns-generator.reporting-interval-label')" label-placement="top">
      <n-input-number v-model:value="ri" :min="3600" :placeholder="t('tools.dmarc-dns-generator.interval-placeholder')">
        <template #suffix>
          {{ t('tools.dmarc-dns-generator.seconds-suffix') }}
        </template>
      </n-input-number>
    </n-form-item>

    <n-card v-if="dmarcRecord" :title="t('tools.dmarc-dns-generator.generated-record-title')">
      <textarea-copyable :value="dmarcRecord" />
    </n-card>
  </n-card>
</template>

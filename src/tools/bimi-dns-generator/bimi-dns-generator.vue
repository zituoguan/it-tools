<script setup lang="ts">
import { ref } from 'vue';
import { NCard, NForm, NFormItem, NInput } from 'naive-ui';

const { t } = useI18n();

const bimiData = ref({
  domain: '',
  logoUrl: '',
  vmcUrl: '',
});

const bimiRecord = computed(() => {
  if (!bimiData.value.domain || !bimiData.value.logoUrl) {
    return '';
  }

  let record = `default._bimi.${bimiData.value.domain} IN TXT "v=BIMI1; l=${bimiData.value.logoUrl}`;

  if (bimiData.value.vmcUrl) {
    record += `; a=${bimiData.value.vmcUrl}`;
  }

  record += '"';

  return record;
});
</script>

<template>
  <NCard :title="t('tools.bimi-dns-generator.titleText')">
    <NForm :model="bimiData" label-placement="left" label-width="150px">
      <NFormItem :label="t('tools.bimi-dns-generator.domainLabel')">
        <NInput v-model:value="bimiData.domain" :placeholder="t('tools.bimi-dns-generator.domainPlaceholder')" />
      </NFormItem>
      <NFormItem :label="t('tools.bimi-dns-generator.logoUrlLabel')">
        <NInput v-model:value="bimiData.logoUrl" :placeholder="t('tools.bimi-dns-generator.logoUrlPlaceholder')" />
      </NFormItem>
      <NFormItem :label="t('tools.bimi-dns-generator.vmcUrlLabel')">
        <NInput v-model:value="bimiData.vmcUrl" :placeholder="t('tools.bimi-dns-generator.vmcUrlPlaceholder')" />
      </NFormItem>
    </NForm>

    <c-card :title="t('tools.bimi-dns-generator.generatedBimiRecordTitle')">
      <textarea-copyable :value="bimiRecord" />
    </c-card>
  </NCard>
</template>

<script setup lang="ts">
const { t } = useI18n();

const zone = ref<string>('public');
const action = ref<string>('add');
const ruleType = ref<string>('service');
const value = ref<string>('http');
const permanent = ref<boolean>(true);

const ruleTypes = computed(() => [
  { label: t('tools.firewalld-generator.service'), value: 'service' },
  { label: t('tools.firewalld-generator.port'), value: 'port' },
  { label: t('tools.firewalld-generator.protocol'), value: 'protocol' },
  { label: t('tools.firewalld-generator.rich-rule'), value: 'rich-rule' },
]);

const actions = computed(() => [
  { label: t('tools.firewalld-generator.add'), value: 'add' },
  { label: t('tools.firewalld-generator.remove'), value: 'remove' },
]);

const zoneOptions = computed(() => [
  { label: t('tools.firewalld-generator.public'), value: 'public' },
  { label: t('tools.firewalld-generator.home'), value: 'home' },
  { label: t('tools.firewalld-generator.work'), value: 'work' },
]);

const permanentOptions = computed(() => [
  { label: t('tools.firewalld-generator.yes'), value: true },
  { label: t('tools.firewalld-generator.no'), value: false },
]);

const command = computed(() => {
  let result = `firewall-cmd --zone=${zone.value} --${action.value}-${ruleType.value}=${value.value}`;
  if (permanent.value) {
    result += ' --permanent';
  }
  result += ' && firewall-cmd --reload';
  return result;
});
</script>

<template>
  <div>
    <NForm label-width="120px" label-placement="left">
      <NFormItem :label="t('tools.firewalld-generator.zone-label')">
        <NSelect v-model:value="zone" :options="zoneOptions" />
      </NFormItem>

      <NFormItem :label="t('tools.firewalld-generator.action-label')">
        <NSelect v-model:value="action" :options="actions" />
      </NFormItem>

      <NFormItem :label="t('tools.firewalld-generator.rule-type-label')">
        <NSelect v-model:value="ruleType" :options="ruleTypes" />
      </NFormItem>

      <NFormItem :label="t('tools.firewalld-generator.value-label')">
        <NInput v-model:value="value" :placeholder="t('tools.firewalld-generator.value-placeholder')" />
      </NFormItem>

      <NFormItem :label="t('tools.firewalld-generator.permanent-label')">
        <NSelect v-model:value="permanent" :options="permanentOptions" />
      </NFormItem>
    </NForm>

    <c-card :title="t('tools.firewalld-generator.generated-command')" mt-2>
      <textarea-copyable :value="command" />
    </c-card>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

const actionOptions = [
  { label: 'ACCEPT', value: 'ACCEPT' },
  { label: 'DROP', value: 'DROP' },
  { label: 'REJECT', value: 'REJECT' },
];

const protocolOptions = [
  { label: 'TCP', value: 'tcp' },
  { label: 'UDP', value: 'udp' },
  { label: 'ICMP', value: 'icmp' },
  { label: 'IP', value: 'ip' },
];

const chainOptions = [
  { label: 'INPUT', value: 'INPUT' },
  { label: 'OUTPUT', value: 'OUTPUT' },
  { label: 'FORWARD', value: 'FORWARD' },
  { label: 'PREROUTING', value: 'PREROUTING' },
];

const action = ref('ACCEPT');
const protocol = ref('tcp');
const sourceIP = ref('');
const destinationIP = ref('');
const sourcePort = ref<number | null>(null);
const destinationPort = ref<number | null>(null);
const ruleOrder = ref<number | null>(null);
const chain = ref('INPUT');
const command = computed(() => {
  let cmd = `iptables -A ${chain.value}`;
  if (ruleOrder.value) {
    cmd += ` ${ruleOrder.value}`;
  }
  if (protocol.value) {
    cmd += ` -p ${protocol.value}`;
  }
  if (sourceIP.value) {
    cmd += ` -s ${sourceIP.value}`;
  }
  if (destinationIP.value) {
    cmd += ` -d ${destinationIP.value}`;
  }
  if (sourcePort.value !== null) {
    cmd += ` --sport ${sourcePort.value}`;
  }
  if (destinationPort.value !== null) {
    cmd += ` --dport ${destinationPort.value}`;
  }
  cmd += ` -j ${action.value}`;
  return cmd;
});
</script>

<template>
  <NForm label-placement="left" label-width="140px">
    <NFormItem :label="t('tools.iptables-generator.action')">
      <NSelect v-model:value="action" :options="actionOptions" />
    </NFormItem>
    <NFormItem :label="t('tools.iptables-generator.protocol')">
      <NSelect v-model:value="protocol" :options="protocolOptions" />
    </NFormItem>
    <NFormItem :label="t('tools.iptables-generator.sourceIP')">
      <NInput v-model:value="sourceIP" />
    </NFormItem>
    <NFormItem :label="t('tools.iptables-generator.destinationIP')">
      <NInput v-model:value="destinationIP" />
    </NFormItem>
    <NFormItem :label="t('tools.iptables-generator.sourcePort')">
      <NInputNumber v-model:value="sourcePort" />
    </NFormItem>
    <NFormItem :label="t('tools.iptables-generator.destinationPort')">
      <NInputNumber v-model:value="destinationPort" />
    </NFormItem>
    <NFormItem :label="t('tools.iptables-generator.chain')">
      <NSelect v-model:value="chain" :options="chainOptions" />
    </NFormItem>
    <NFormItem :label="t('tools.iptables-generator.ruleOrder')">
      <NInputNumber v-model:value="ruleOrder" />
    </NFormItem>
  </NForm>

  <c-card :title="t('tools.iptables-generator.generatedCommand')">
    <textarea-copyable :value="command" />
  </c-card>

  <n-divider />

  <table border="1" class="w-full border-collapse text-left text-sm text-gray-500 dark:text-gray-400">
    <thead>
      <tr>
        <td><strong>{{ t('tools.iptables-generator.expression') }}</strong></td>
        <td><strong>{{ t('tools.iptables-generator.meaning') }}</strong></td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>iptables -L</td>
        <td>{{ t('tools.iptables-generator.listAllRules') }}</td>
      </tr>
      <tr>
        <td>iptables -t nat -n -L</td>
        <td>{{ t('tools.iptables-generator.listNATRules') }}</td>
      </tr>
      <tr>
        <td>iptables -L -n --line-numbers</td>
        <td>{{ t('tools.iptables-generator.listRulesWithNumbers') }}</td>
      </tr>
      <tr>
        <td>iptables -F</td>
        <td>{{ t('tools.iptables-generator.deleteExistingRules') }}</td>
      </tr>
      <tr>
        <td>iptables -D INPUT 2</td>
        <td>{{ t('tools.iptables-generator.deleteSecondRule') }}</td>
      </tr>
      <tr>
        <td>iptables -t nat -D PREROUTING 2</td>
        <td>{{ t('tools.iptables-generator.deleteSecondNATRule') }}</td>
      </tr>
      <tr>
        <td>iptables -A INPUT -s "&lt;ip address&gt;" -j DROP</td>
        <td>{{ t('tools.iptables-generator.blockSpecificIP') }}</td>
      </tr>
      <tr>
        <td>iptables -A INPUT -p tcp --dport 80 -m limit --limit 25/minute --limit-burst 100 -j ACCEPT</td>
        <td>{{ t('tools.iptables-generator.limitConnections') }}</td>
      </tr>
      <tr>
        <td>iptables -N MYCHAIN</td>
        <td>{{ t('tools.iptables-generator.createNewChain') }}</td>
      </tr>
    </tbody>
  </table>
</template>

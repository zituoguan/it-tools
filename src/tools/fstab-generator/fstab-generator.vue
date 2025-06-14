<script setup lang="ts">
import { NForm, NFormItem, NInput, NSelect } from 'naive-ui';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

const { t } = useI18n();

const device = ref('');
const mountPoint = ref('');
const fsType = ref('auto');
const options = ref<string[]>([]);
const dump = ref('0');
const pass = ref('0');
const username = ref('');
const password = ref('');

const fileSystems = [
  'auto', 'ext2', 'ext3', 'ext4', 'xfs', 'btrfs', 'jfs', 'reiserfs', 'nfs', 'cifs', 'smbfs',
  'tmpfs', 'devtmpfs', 'overlay', 'aufs', 'iso9660', 'udf', 'vfat', 'ntfs',
  'swap',
];

const defaultOptions = computed(() => [
  { value: 'defaults', description: t('tools.fstab-generator.options.defaults') },
  { value: 'noatime', description: t('tools.fstab-generator.options.noatime') },
  { value: 'nodiratime', description: t('tools.fstab-generator.options.nodiratime') },
  { value: 'relatime', description: t('tools.fstab-generator.options.relatime') },
  { value: 'ro', description: t('tools.fstab-generator.options.ro') },
  { value: 'rw', description: t('tools.fstab-generator.options.rw') },
  { value: 'sync', description: t('tools.fstab-generator.options.sync') },
  { value: 'async', description: t('tools.fstab-generator.options.async') },
  { value: 'user', description: t('tools.fstab-generator.options.user') },
  { value: 'nouser', description: t('tools.fstab-generator.options.nouser') },
  { value: 'exec', description: t('tools.fstab-generator.options.exec') },
  { value: 'noexec', description: t('tools.fstab-generator.options.noexec') },
  { value: 'errors=remount-ro', description: t('tools.fstab-generator.options.errorsRemountRo') },
  { value: 'auto', description: t('tools.fstab-generator.options.auto') },
  { value: 'noauto', description: t('tools.fstab-generator.options.noauto') },
  { value: 'dev', description: t('tools.fstab-generator.options.dev') },
  { value: 'nodev', description: t('tools.fstab-generator.options.nodev') },
  { value: 'suid', description: t('tools.fstab-generator.options.suid') },
  { value: 'nosuid', description: t('tools.fstab-generator.options.nosuid') },
]);

const nfsOptions = computed(() => [
  { value: 'vers=3', description: t('tools.fstab-generator.nfsOptions.vers3') },
  { value: 'soft', description: t('tools.fstab-generator.nfsOptions.soft') },
  { value: 'hard', description: t('tools.fstab-generator.nfsOptions.hard') },
  { value: 'rsize=8192,wsize=8192', description: t('tools.fstab-generator.nfsOptions.rsizeWsize') },
]);

const cifsOptions = computed(() => [
  { value: 'sec=ntlm', description: t('tools.fstab-generator.cifsOptions.secNtlm') },
]);

const tmpfsOptions = computed(() => [
  { value: 'size=512M', description: t('tools.fstab-generator.tmpfsOptions.size') },
  { value: 'mode=1777', description: t('tools.fstab-generator.tmpfsOptions.mode') },
]);

const filesystemOptions = computed(() => {
  if (fsType.value === 'nfs') {
    return [...defaultOptions.value, ...nfsOptions.value];
  }
  if (fsType.value === 'cifs') {
    return [...defaultOptions.value, ...cifsOptions.value];
  }
  if (fsType.value === 'tmpfs') {
    return [...defaultOptions.value, ...tmpfsOptions.value];
  }
  return defaultOptions.value;
});

const fstabLine = computed(
  () => {
    if (!device.value || !mountPoint.value) {
      return '';
    }
    const allOptions = [...options.value];
    if (username.value) {
      allOptions.push(`user=${username.value}`);
    }
    if (password.value) {
      allOptions.push(`pass=${password.value}`);
    }
    if (!allOptions.length) {
      allOptions.push('defaults');
    }
    return `${device.value} ${mountPoint.value} ${fsType.value} ${allOptions.join(',')} ${dump.value} ${pass.value}`;
  });
</script>

<template>
  <NForm>
    <NFormItem :label="t('tools.fstab-generator.device')" label-placement="left" label-width="140px">
      <NInput v-model:value="device" :placeholder="t('tools.fstab-generator.devicePlaceholder')" />
    </NFormItem>

    <NFormItem :label="t('tools.fstab-generator.mountPoint')" label-placement="left" label-width="140px">
      <NInput v-model:value="mountPoint" :placeholder="t('tools.fstab-generator.mountPointPlaceholder')" />
    </NFormItem>

    <NFormItem :label="t('tools.fstab-generator.filesystemType')" label-placement="left" label-width="140px">
      <NSelect v-model:value="fsType" :options="fileSystems.map(fs => ({ label: fs, value: fs }))" />
    </NFormItem>

    <NFormItem :label="t('tools.fstab-generator.filesystemOptions')">
      <NSelect
        v-model:value="options" :placeholder="t('tools.fstab-generator.optionsPlaceholder')"
        multiple
        :options="filesystemOptions.map(o => ({ value: o.value, label: `${o.description} (${o.value})` }))"
      />
    </NFormItem>

    <NFormItem :label="t('tools.fstab-generator.dumpLabel')">
      <NSelect v-model:value="dump" :options="[{ label: t('tools.fstab-generator.dumpNo'), value: '0' }, { label: t('tools.fstab-generator.dumpYes'), value: '1' }]" />
    </NFormItem>

    <NFormItem :label="t('tools.fstab-generator.passLabel')">
      <NSelect
        v-model:value="pass"
        :options="[{ label: t('tools.fstab-generator.passNo'), value: '0' }, { label: t('tools.fstab-generator.passRoot'), value: '1' }, { label: t('tools.fstab-generator.passOther'), value: '2' }]"
      />
    </NFormItem>

    <c-input-text
      v-model:value="username"
      :placeholder="t('tools.fstab-generator.usernamePlaceholder')"
      :label="t('tools.fstab-generator.username')"
      label-position="left"
      label-width="140px"
      label-align="right"
      raw-text
      mb-1
      flex-1
    />

    <c-input-text
      v-model:value="password"
      :placeholder="t('tools.fstab-generator.passwordPlaceholder')"
      :label="t('tools.fstab-generator.password')"
      label-position="left"
      label-width="140px"
      label-align="right"
      raw-text
      flex-1
    />

    <c-card :title="t('tools.fstab-generator.generatedLine')" mt-5>
      <TextareaCopyable :value="fstabLine" />
    </c-card>
  </NForm>
</template>

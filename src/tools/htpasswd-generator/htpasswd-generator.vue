<script setup lang="ts">
import { generateHtpasswd } from './htpasswd-generator.service';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

const { t } = useI18n();

const username = ref('');
const password = ref('');
const hashMethod = ref('bcrypt');
const saltCount = ref(10);

const algos = [
  { value: 'bcrypt', label: 'Bcrypt' },
  { value: 'md5', label: 'MD5' },
  { value: 'apr1', label: 'Apache MD5 (apr1)' },
  { value: 'sha256', label: 'SHA256' },
  { value: 'sha512', label: 'SHA512' },
];

const htpasswd = computed(() => {
  if (username.value === '' || password.value === '') {
    return t('tools.htpasswd-generator.emptyFieldsMessage');
  }

  return generateHtpasswd({
    username: username.value,
    password: password.value,
    saltRounds: saltCount.value,
    algorithm: hashMethod.value as never,
  });
});
</script>

<template>
  <div>
    <c-input-text
      v-model:value="username"
      :label="t('tools.htpasswd-generator.usernameLabel')"
      :placeholder="t('tools.htpasswd-generator.usernamePlaceholder')"
      clearable raw-text mb-5
    />
    <c-input-text
      v-model:value="password"
      :label="t('tools.htpasswd-generator.passwordLabel')"
      :placeholder="t('tools.htpasswd-generator.passwordPlaceholder')"
      clearable
      raw-text
      mb-2
      type="password"
    />

    <c-select
      v-model:value="hashMethod"
      :label="t('tools.htpasswd-generator.hashMethodLabel')"
      :options="algos"
      mb-2
    />

    <n-form-item v-if="hashMethod === 'bcrypt'" :label="t('tools.htpasswd-generator.saltRoundsLabel')" label-placement="left" label-width="120">
      <n-input-number v-model:value="saltCount" :placeholder="t('tools.htpasswd-generator.saltRoundsPlaceholder')" :max="100" :min="0" w-full />
    </n-form-item>

    <n-divider />

    <n-form-item :label="t('tools.htpasswd-generator.outputLabel')">
      <TextareaCopyable :value="htpasswd" />
    </n-form-item>
  </div>
</template>

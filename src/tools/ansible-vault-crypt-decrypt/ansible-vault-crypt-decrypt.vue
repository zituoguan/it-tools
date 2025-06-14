<script setup lang="ts">
import { Vault } from 'ansible-vault';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

const { t } = useI18n();

const decryptedInput = ref('');
const encryptPassword = ref('');
const encryptId = ref('');
const cryptedOutput = computedAsync(
  async () => {
    try {
      const v = new Vault({ password: encryptPassword.value });
      return await v.encrypt(decryptedInput.value, encryptId.value);
    }
    catch (e: any) {
      return e.toString();
    }
  },
);

const cryptedInput = ref('');
const decryptPassword = ref('');
const decryptedOutput = computedAsync(
  async () => {
    try {
      const v = new Vault({ password: decryptPassword.value });
      // handle mac \r
      return (await v.decrypt(cryptedInput.value?.replace(/\r(?!\n)/, '\n'), undefined)) ?? '';
    }
    catch (e: any) {
      return e.toString();
    }
  },
);
</script>

<template>
  <c-card :title="t('tools.ansible-vault-crypt-decrypt.encryptTitle')">
    <c-input-text
      v-model:value="decryptedInput"
      :placeholder="t('tools.ansible-vault-crypt-decrypt.encryptPlaceholder')"
      :label="t('tools.ansible-vault-crypt-decrypt.stringToEncryptLabel')"
      raw-text
      mb-5
    />

    <n-space>
      <c-input-text
        v-model:value="encryptPassword"
        :placeholder="t('tools.ansible-vault-crypt-decrypt.encryptionPasswordPlaceholder')"
        :label="t('tools.ansible-vault-crypt-decrypt.encryptionPasswordLabel')"
        raw-text
        mb-5
      />
      <c-input-text
        v-model:value="encryptId"
        :placeholder="t('tools.ansible-vault-crypt-decrypt.encryptionIdPlaceholder')"
        :label="t('tools.ansible-vault-crypt-decrypt.encryptionIdLabel')"
        raw-text
        mb-5
      />
    </n-space>

    <n-divider />

    <TextareaCopyable
      :label="t('tools.ansible-vault-crypt-decrypt.encryptedStringLabel')"
      :value="cryptedOutput"
      multiline
      readonly
      rows="5"
      mb-5
    />
  </c-card>

  <c-card :title="t('tools.ansible-vault-crypt-decrypt.decryptTitle')">
    <c-input-text
      v-model:value="cryptedInput"
      :placeholder="t('tools.ansible-vault-crypt-decrypt.decryptPlaceholder')"
      :label="t('tools.ansible-vault-crypt-decrypt.stringToDecryptLabel')"
      raw-text multiline mb-5
      rows="5"
    />

    <c-input-text
      v-model:value="decryptPassword"
      :placeholder="t('tools.ansible-vault-crypt-decrypt.decryptionPasswordPlaceholder')"
      :label="t('tools.ansible-vault-crypt-decrypt.decryptionPasswordLabel')"
      raw-text
      mb-5
    />

    <n-divider />

    <TextareaCopyable
      :label="t('tools.ansible-vault-crypt-decrypt.decryptedStringLabel')"
      :value="decryptedOutput"
      multiline
      readonly
      rows="5"
      mb-5
    />
  </c-card>
</template>

<script setup lang="ts">
import { useScriptTag } from '@vueuse/core';
import ageWasmUrl from '/age-wasm/age.wasm?url';

declare global {
  interface Window {
    generateX25519Identity: () => {
      privateKey: string
      publicKey: string
    }
    encrypt: (publicKeys: string, message: string) => {
      error?: string
      output: string
    }
    decrypt: (privateKeys: string, message: string) => {
      error?: string
      output: string
    }
    encryptBinary: (publicKeys: string, buffer: Uint8Array) => string | Uint8Array
    decryptBinary: (privateKeys: string, buffer: Uint8Array) => string | Uint8Array
  }
}
/**
 * Go is the class as defined in the Golang `wasm_exec.js` distributable file required for WebAssembly.
 * Golang WebAssembly wiki: https://github.com/golang/go/wiki/WebAssembly
 */
declare class Go {
  argv: string[];
  env: { [envKey: string]: string };
  exit: (code: number) => void;
  importObject: WebAssembly.Imports;
  exited: boolean;
  mem: DataView;
  run(instance: WebAssembly.Instance): Promise<void>;
}

const { load: loadGo } = useScriptTag('/age-wasm/wasm_exec.js', undefined, { type: 'module', manual: true });

await loadGo();

const go = new Go();
const result = await WebAssembly.instantiateStreaming(fetch(ageWasmUrl), go.importObject);
go.run(result.instance);

const { t } = useI18n();

const privKey = ref('');
const pubKey = ref('');
const recipients = ref('');
const message = ref('');
const encryptedOutput = ref('');
const recipientsBinary = ref('');
const filesEncrypt = ref<File[]>([]);
const identities = ref('');
const encryptedText = ref('');
const decryptedOutput = ref('');
const identitiesBinary = ref('');
const filesDecrypt = ref<File[]>([]);
const error = ref('');

function downloadURL(data: string, fileName: string) {
  const a = document.createElement('a');
  a.href = data;
  a.download = fileName;
  document.body.appendChild(a);
  a.style.display = 'none';
  a.click();
  a.remove();
}

function downloadBlob(data: Uint8Array, fileName: string) {
  const blob = new Blob([data], {
    type: 'application/octet-stream',
  });
  const url = window.URL.createObjectURL(blob);
  downloadURL(url, fileName);
  setTimeout(() => window.URL.revokeObjectURL(url), 1000);
}

function generateKeys() {
  const keys = window.generateX25519Identity();
  privKey.value = keys.privateKey;
  pubKey.value = keys.publicKey;
}

function encrypt() {
  error.value = '';
  const result = window.encrypt(recipients.value, message.value);
  if (result.error) {
    error.value = result.error;
  }
  else {
    encryptedOutput.value = result.output;
  }
}

function encryptBinary() {
  error.value = '';
  const file = filesEncrypt.value;
  if (!file.length) {
    return;
  }

  file.forEach((f) => {
    const reader = new FileReader();
    reader.onload = () => {
      const buffer = new Uint8Array(reader.result as ArrayBuffer);
      const result = window.encryptBinary(recipientsBinary.value, buffer);
      if (typeof result === 'string') {
        error.value = result;
      }
      else {
        downloadBlob(result, `${f.name}.age`);
      }
    };
    reader.readAsArrayBuffer(f);
  });

  filesEncrypt.value = [];
}

function decrypt() {
  error.value = '';
  const result = window.decrypt(identities.value, encryptedText.value);
  if (result.error) {
    error.value = result.error;
  }
  else {
    decryptedOutput.value = result.output;
  }
}

function decryptBinary() {
  error.value = '';
  const file = filesDecrypt.value;
  if (!file.length) {
    return;
  }

  file.forEach((f) => {
    const reader = new FileReader();
    reader.onload = () => {
      const buffer = new Uint8Array(reader.result as ArrayBuffer);
      const result = window.decryptBinary(identitiesBinary.value, buffer);
      if (typeof result === 'string') {
        error.value = result;
      }
      else {
        downloadBlob(result, f.name.replace('.age', ''));
      }
    };
    reader.readAsArrayBuffer(f);
  });

  filesDecrypt.value = [];
}

function onEncryptFilesUploaded(uploadedFiles: File[]) {
  filesEncrypt.value = uploadedFiles;
}
function onDecryptFilesUploaded(uploadedFiles: File[]) {
  filesDecrypt.value = uploadedFiles;
}
</script>

<template>
  <n-tabs type="card">
    <!-- Generate Keys -->
    <n-tab-pane name="keys" :tab="t('tools.age-crypto.tabGenerateKeys')">
      <n-card :title="t('tools.age-crypto.generateKeys_cardTitle_privateKey')" mb-1>
        <textarea-copyable v-model:value="privKey" rows="3" multiline :placeholder="t('tools.age-crypto.generateKeys_placeholder_privateKey')" />
      </n-card>
      <n-card :title="t('tools.age-crypto.generateKeys_cardTitle_publicKey')" mb-1>
        <textarea-copyable v-model:value="pubKey" rows="3" multiline :placeholder="t('tools.age-crypto.generateKeys_placeholder_publicKey')" />
      </n-card>
      <n-button type="primary" @click="generateKeys">
        {{ t('tools.age-crypto.generateKeys_button_generate') }}
      </n-button>
    </n-tab-pane>

    <!-- Encrypt Text -->
    <n-tab-pane name="encrypt" :tab="t('tools.age-crypto.tabEncrypt')">
      <n-card :title="t('tools.age-crypto.encryptText_cardTitle_publicKeys')" mb-1>
        <n-input v-model:value="recipients" type="textarea" :placeholder="t('tools.age-crypto.encryptText_placeholder_recipients')" required />
      </n-card>
      <n-card :title="t('tools.age-crypto.encryptText_cardTitle_message')" mb-1>
        <n-input v-model:value="message" type="textarea" :placeholder="t('tools.age-crypto.encryptText_placeholder_message')" required />
      </n-card>
      <n-card :title="t('tools.age-crypto.encryptText_cardTitle_output')" mb-1>
        <textarea-copyable v-model:value="encryptedOutput" rows="3" multiline :placeholder="t('tools.age-crypto.encryptText_placeholder_output')" />
      </n-card>
      <n-button type="primary" @click="encrypt">
        {{ t('tools.age-crypto.encryptText_button_encrypt') }}
      </n-button>
    </n-tab-pane>

    <!-- Encrypt Binary -->
    <n-tab-pane name="encryptBinary" :tab="t('tools.age-crypto.tabEncryptBinary')">
      <n-card :title="t('tools.age-crypto.encryptBinary_cardTitle_publicKeys')" mb-1>
        <n-input v-model:value="recipientsBinary" type="textarea" :placeholder="t('tools.age-crypto.encryptBinary_placeholder_recipients')" required />
      </n-card>
      <n-card :title="t('tools.age-crypto.encryptBinary_cardTitle_files')" mb-1>
        <c-file-upload
          :title="t('tools.age-crypto.encryptBinary_fileUpload_title')"
          multiple
          @files-upload="onEncryptFilesUploaded"
        />
        <ul>
          <li v-for="(file, index) in filesEncrypt" :key="index">
            {{ file.name }}
          </li>
        </ul>
      </n-card>
      <n-card :title="t('tools.age-crypto.encryptBinary_cardTitle_output')" mb-1>
        <p>{{ t('tools.age-crypto.encryptBinary_outputText_download') }}</p>
      </n-card>
      <n-button type="primary" @click="encryptBinary">
        {{ t('tools.age-crypto.encryptBinary_button_encrypt') }}
      </n-button>
    </n-tab-pane>

    <!-- Decrypt Text -->
    <n-tab-pane name="decrypt" :tab="t('tools.age-crypto.tabDecrypt')">
      <n-card :title="t('tools.age-crypto.decryptText_cardTitle_privateKeys')" mb-1>
        <n-input v-model:value="identities" type="textarea" :placeholder="t('tools.age-crypto.decryptText_placeholder_identities')" required />
      </n-card>
      <n-card :title="t('tools.age-crypto.decryptText_cardTitle_encryptedText')" mb-1>
        <n-input v-model:value="encryptedText" type="textarea" :placeholder="t('tools.age-crypto.decryptText_placeholder_encryptedText')" required />
      </n-card>
      <n-card :title="t('tools.age-crypto.decryptText_cardTitle_output')" mb-1>
        <textarea-copyable v-model:value="decryptedOutput" rows="3" multiline :placeholder="t('tools.age-crypto.decryptText_placeholder_output')" />
      </n-card>
      <n-button type="primary" @click="decrypt">
        {{ t('tools.age-crypto.decryptText_button_decrypt') }}
      </n-button>
    </n-tab-pane>

    <!-- Decrypt Binary -->
    <n-tab-pane name="decryptBinary" :tab="t('tools.age-crypto.tabDecryptBinary')">
      <n-card :title="t('tools.age-crypto.decryptBinary_cardTitle_privateKeys')" mb-1>
        <n-input v-model:value="identitiesBinary" type="textarea" :placeholder="t('tools.age-crypto.decryptBinary_placeholder_identities')" required />
      </n-card>
      <n-card :title="t('tools.age-crypto.decryptBinary_cardTitle_encryptedFiles')" mb-1>
        <c-file-upload
          :title="t('tools.age-crypto.decryptBinary_fileUpload_title')"
          multiple
          @files-upload="onDecryptFilesUploaded"
        />
        <ul>
          <li v-for="(file, index) in filesDecrypt" :key="index">
            {{ file.name }}
          </li>
        </ul>
      </n-card>
      <n-card :title="t('tools.age-crypto.decryptBinary_cardTitle_output')" mb-1>
        <p>{{ t('tools.age-crypto.decryptBinary_outputText_download') }}</p>
      </n-card>
      <n-button type="primary" @click="decryptBinary">
        {{ t('tools.age-crypto.decryptBinary_button_decrypt') }}
      </n-button>
    </n-tab-pane>
  </n-tabs>
</template>

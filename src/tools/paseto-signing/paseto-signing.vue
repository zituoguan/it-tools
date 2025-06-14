<script setup lang="ts">
import JSON5 from 'json5';
import { generateKeys, sign, verify } from 'paseto-ts/v4';
import { useValidation } from '@/composable/validation';

const { t } = useI18n();

const payload = ref(`{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": "${(new Date()).toISOString()}"
}`);
const footer = ref('{}');

const secretKey = ref('');
const publicKey = ref('');
const addExp = ref(true);
const addIat = ref(true);
const validatePayload = ref(true);

function generateKeyPairs() {
  const keys = generateKeys('public');
  secretKey.value = keys.secretKey;
  publicKey.value = keys.publicKey;
}
generateKeyPairs();

const signedToken = computedAsync(async () => {
  const secretKeyValue = secretKey.value;
  const payloadValue = payload.value;
  const addExpValue = addExp.value;
  const addIatValue = addIat.value;
  const footerValue = footer.value;
  const validatePayloadValue = validatePayload.value;
  try {
    const token = await sign(
      secretKeyValue,
      payloadValue,
      {
        addExp: addExpValue,
        addIat: addIatValue,
        footer: footerValue,
        validatePayload: validatePayloadValue,
      },
    );
    return {
      token,
      error: '',
    };
  }
  catch (e: any) {
    return { error: e.toString(), token: '' };
  }
});

const jsonInputValidation = useValidation({
  source: payload,
  rules: [
    {
      message: 'Invalid JSON string',
      validator: value => JSON5.parse(value),
    },
  ],
});
const jsonFooterValidation = useValidation({
  source: footer,
  rules: [
    {
      message: 'Invalid JSON string',
      validator: value => JSON5.parse(value),
    },
  ],
});

const token = ref('');
const verifiedToken = computedAsync(async () => {
  const publicKeyValue = publicKey.value;
  const tokenValue = token.value;
  const validatePayloadValue = validatePayload.value;
  try {
    // generic type parameter is optional but will give you type safety on the payload
    const { payload, footer } = await verify<any>(
      publicKeyValue,
      tokenValue,
      {
        validatePayload: validatePayloadValue,
      },
    );
    return {
      payload,
      footer,
      error: '',
    };
  }
  catch (e: any) {
    return { error: e.toString(), payload: '', footer: '' };
  }
});
</script>

<template>
  <div>
    <c-card :title="t('tools.paseto-signing.key-pairs')" mb-2>
      <c-input-text
        v-model:value="secretKey"
        :label="t('tools.paseto-signing.secret-key')"
        label-position="left"
        :placeholder="t('tools.paseto-signing.secret-key-placeholder')"
        mb-1
      />
      <c-input-text
        v-model:value="publicKey"
        :label="t('tools.paseto-signing.public-key')"
        label-position="left"
        :placeholder="t('tools.paseto-signing.public-key-placeholder')"
        mb-1
      />
      <div flex justify-center>
        <n-button @click="generateKeyPairs()">
          {{ t('tools.paseto-signing.refresh-key') }}
        </n-button>
      </div>
    </c-card>

    <c-card :title="t('tools.paseto-signing.signing')" mb-2>
      <c-input-text
        v-model:value="payload"
        :label="t('tools.paseto-signing.payload')"
        multiline
        rows="5"
        autosize
        :placeholder="t('tools.paseto-signing.payload-placeholder')"
        :validation="jsonInputValidation"
      />
      <n-space justify="center">
        <n-form-item :label="t('tools.paseto-signing.validate-payload')" label-placement="left">
          <n-switch v-model:value="validatePayload" />
        </n-form-item>
        <n-form-item :label="t('tools.paseto-signing.add-exp')" label-placement="left">
          <n-switch v-model:value="addExp" />
        </n-form-item>
        <n-form-item :label="t('tools.paseto-signing.add-iat')" label-placement="left">
          <n-switch v-model:value="addIat" />
        </n-form-item>
      </n-space>

      <c-input-text
        v-model:value="footer"
        :label="t('tools.paseto-signing.footer')"
        multiline
        rows="2"
        autosize
        :placeholder="t('tools.paseto-signing.footer-placeholder')"
        :validation="jsonFooterValidation"
      />

      <c-card v-if="signedToken" :title="t('tools.paseto-signing.signed-token')" mb-2>
        <textarea-copyable v-if="signedToken.token" :value="signedToken.token" word-wrap />
        <c-alert v-if="signedToken.error">
          {{ signedToken.error }}
        </c-alert>
      </c-card>
    </c-card>

    <c-card :title="t('tools.paseto-signing.verifying')" mb-2>
      <c-input-text
        v-model:value="token"
        :label="t('tools.paseto-signing.token')"
        multiline
        rows="5"
        autosize
        :placeholder="t('tools.paseto-signing.token-placeholder')"
      />
      <n-space justify="center">
        <n-form-item :label="t('tools.paseto-signing.validate-payload')" label-placement="left">
          <n-switch v-model:value="validatePayload" />
        </n-form-item>
      </n-space>

      <c-card v-if="verifiedToken" :title="t('tools.paseto-signing.verification-result')" mb-2>
        <n-form-item v-if="verifiedToken.payload" :label="t('tools.paseto-signing.payload')">
          <textarea-copyable :value="JSON.stringify(verifiedToken.payload, null, 2)" word-wrap />
        </n-form-item>
        <n-form-item v-if="verifiedToken.footer" :label="t('tools.paseto-signing.footer')">
          <textarea-copyable :value="JSON.stringify(verifiedToken.footer, null, 2)" word-wrap />
        </n-form-item>
        <c-alert v-if="verifiedToken.error">
          {{ verifiedToken.error }}
        </c-alert>
      </c-card>
    </c-card>
  </div>
</template>

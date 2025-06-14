<script setup lang="ts">
import { generateCSR } from './csr-generator.service';
import TextareaCopyable from '@/components/TextareaCopyable.vue';
import { withDefaultOnErrorAsync } from '@/utils/defaults';
import { computedRefreshableAsync } from '@/composable/computedRefreshable';
import { useValidation } from '@/composable/validation';

const { t } = useI18n();

const commonName = ref('test.com');
const commonNameValidation = useValidation({
  source: commonName,
  rules: [
    {
      message: t('tools.csr-generator.commonNameRequired'),
      validator: value => value?.trim() !== '',
    },
  ],
});

const organizationName = ref('Test');
const organizationalUnit = ref('');
const password = ref('');
const city = ref('Paris');
const state = ref('FR');
const country = ref('France');
const contactEmail = ref('');
const subjectAlternativeNames = ref('');
const emptyCSR = { csrPem: '', privateKeyPem: '', publicKeyPem: '' };

const [certs, refreshCerts] = computedRefreshableAsync(
  () => withDefaultOnErrorAsync(() => {
    if (!commonNameValidation.isValid) {
      return emptyCSR;
    }

    return generateCSR({
      password: password.value,
      commonName: commonName.value,
      countryName: country.value,
      city: city.value,
      state: state.value,
      organizationName: organizationName.value,
      organizationalUnit: organizationalUnit.value,
      subjectAlternativeNames: subjectAlternativeNames.value,
      contactEmail: contactEmail.value,
    });
  },
  emptyCSR,
  ), emptyCSR);
</script>

<template>
  <div>
    <div mb-2>
      <n-form-item
        :label="t('tools.csr-generator.commonName')"
        label-placement="top"
        :feedback="commonNameValidation.message"
        :validation-status="commonNameValidation.status"
      >
        <n-input
          v-model:value="commonName"
          :placeholder="t('tools.csr-generator.commonNamePlaceholder')"
        />
      </n-form-item>
    </div>

    <div>
      <n-form-item
        :label="t('tools.csr-generator.organizationName')"
        label-placement="left" label-width="100"
      >
        <n-input
          v-model:value="organizationName"
          :placeholder="t('tools.csr-generator.organizationNamePlaceholder')"
        />
      </n-form-item>
    </div>

    <div>
      <n-form-item
        :label="t('tools.csr-generator.organizationUnit')"
        label-placement="left" label-width="100"
      >
        <n-input
          v-model:value="organizationalUnit"
          :placeholder="t('tools.csr-generator.organizationUnitPlaceholder')"
        />
      </n-form-item>
    </div>

    <div>
      <n-form-item
        :label="t('tools.csr-generator.state')"
        label-placement="left" label-width="100"
      >
        <n-input
          v-model:value="state"
          :placeholder="t('tools.csr-generator.statePlaceholder')"
        />
      </n-form-item>
    </div>

    <div>
      <n-form-item
        :label="t('tools.csr-generator.city')"
        label-placement="left" label-width="100"
      >
        <n-input
          v-model:value="city"
          :placeholder="t('tools.csr-generator.cityPlaceholder')"
        />
      </n-form-item>
    </div>

    <div>
      <n-form-item
        :label="t('tools.csr-generator.country')"
        label-placement="left" label-width="100"
      >
        <n-input
          v-model:value="country"
          :placeholder="t('tools.csr-generator.countryPlaceholder')"
        />
      </n-form-item>
    </div>

    <div>
      <n-form-item
        :label="t('tools.csr-generator.contactEmail')"
        label-placement="left" label-width="100"
      >
        <n-input
          v-model:value="contactEmail"
          :placeholder="t('tools.csr-generator.contactEmailPlaceholder')"
        />
      </n-form-item>
    </div>

    <div>
      <n-form-item
        :label="t('tools.csr-generator.subjectAlternativeNames')"
        label-placement="top"
      >
        <n-input
          v-model:value="subjectAlternativeNames"
          :placeholder="t('tools.csr-generator.subjectAlternativeNamesPlaceholder')"
          type="textarea"
        />
      </n-form-item>
    </div>

    <div>
      <n-form-item
        :label="t('tools.csr-generator.privateKeyPassphrase')"
        label-placement="top"
      >
        <n-input
          v-model:value="password"
          type="password"
          show-password-on="mousedown"
          :placeholder="t('tools.csr-generator.passphrasePlaceholder')"
        />
      </n-form-item>
    </div>

    <div flex justify-center>
      <c-button @click="refreshCerts">
        {{ t('tools.csr-generator.refreshCSR') }}
      </c-button>
    </div>

    <n-divider />

    <div v-if="commonNameValidation.isValid">
      <div>
        <h3>{{ t('tools.csr-generator.certificateSigningRequest') }}</h3>
        <TextareaCopyable :value="certs.csrPem" :download-file-name="`${organizationName}.csr`" />
      </div>

      <div>
        <h3>{{ t('tools.csr-generator.publicKey') }}</h3>
        <TextareaCopyable :value="certs.publicKeyPem" word-wrap :download-file-name="`${organizationName}.pem`" />
      </div>

      <div>
        <h3>{{ t('tools.csr-generator.privateKey') }}</h3>
        <TextareaCopyable :value="certs.privateKeyPem" :download-file-name="`${organizationName}.key`" />
      </div>
    </div>
  </div>
</template>

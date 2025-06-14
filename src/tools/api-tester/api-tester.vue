<script setup lang="ts">
import { useQueryParamOrStorage } from '@/composable/queryParams';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

const { t } = useI18n();

interface KeyValuePair {
  key: string
  value?: string
}
const baseUrl = useQueryParamOrStorage({ name: 'url', storageName: 'api-tester:url', defaultValue: '' });
const method = useQueryParamOrStorage({ name: 'method', storageName: 'api-tester:m', defaultValue: 'POST' });
const queryParams = useQueryParamOrStorage<KeyValuePair[]>({ name: 'params', storageName: 'api-tester:params', defaultValue: [] });
const headers = useQueryParamOrStorage<KeyValuePair[]>({ name: 'headers', storageName: 'api-tester:headers', defaultValue: [] });
const contentType = useQueryParamOrStorage({ name: 'ct', storageName: 'api-tester:ct', defaultValue: 'application/json' });
const body = useQueryParamOrStorage({ name: 'body', storageName: 'api-tester:body', defaultValue: '' });
const noCORS = ref(false);
const apiCallResult = ref();

const inprogress = ref(false);
async function callAPI() {
  const url = new URL(baseUrl.value);
  for (const kv of queryParams.value) {
    if (!kv.key) {
      continue;
    }
    url.searchParams.append(kv.key, kv.value || '');
  }
  const queryHeaders = [] as [string, string][];
  for (const kv of headers.value) {
    if (!kv.key) {
      continue;
    }
    queryHeaders.push([kv.key, kv.value || '']);
  }
  queryHeaders.push(['Content-Type', contentType.value || '']);

  try {
    const response = await fetch(url, {
      method: method.value,
      headers: queryHeaders,
      body: (method.value === 'GET' || method.value === 'HEAD') ? null : body.value,
      mode: noCORS.value ? 'no-cors' : 'cors',
    });

    let responseText = await response.text();
    try {
      responseText = JSON.stringify(JSON.parse(responseText), null, 2);
    }
    catch (_) {
    }
    apiCallResult.value = {
      code: response.status,
      error: '',
      result: responseText,
    };
  }
  catch (err: any) {
    apiCallResult.value = {
      code: -1,
      error: err.toString(),
      result: null,
    };
  }
}

function emptyKeyPair() {
  return {
    key: '',
    value: '',
  };
}
</script>

<template>
  <div>
    <c-card :title="t('tools.api-tester.apiCallingTitle')">
      <c-input-text
        v-model:value="baseUrl"
        :label="t('tools.api-tester.baseUrlLabel')"
        :placeholder="t('tools.api-tester.baseUrlPlaceholder')"
        mb-2
      />

      <c-select
        v-model:value="method"
        :label="t('tools.api-tester.httpMethodLabel')"
        :options="['GET', 'POST', 'PUT', 'DELETE', 'PATCH']"
        mb-2
      />

      <c-card :title="t('tools.api-tester.headersTitle')" mb-2>
        <n-dynamic-input v-model:value="headers" :on-create="emptyKeyPair">
          <template #create-button-default>
            {{ t('tools.api-tester.addNewHttpHeaderButton') }}
          </template>
          <template #default="{ value }">
            <div v-if="value" w-100 flex justify-center gap-2>
              <c-input-text v-model:value="value.key" :placeholder="t('tools.api-tester.headerNamePlaceholder')" type="text" />
              <c-input-text v-model:value="value.value" :placeholder="t('tools.api-tester.headerValuePlaceholder')" type="text" />
            </div>
          </template>
        </n-dynamic-input>
        <c-select
          v-model:value="contentType"
          :label="t('tools.api-tester.contentTypeLabel')"
          :options="['application/json', 'text/plain']"
          mt-2
        />
      </c-card>

      <c-card :title="t('tools.api-tester.queryParamsTitle')" mb-2>
        <n-dynamic-input v-model:value="queryParams" :on-create="emptyKeyPair">
          <template #create-button-default>
            {{ t('tools.api-tester.addNewQueryParamButton') }}
          </template>
          <template #default="{ value }">
            <div v-if="value" w-100 flex justify-center gap-2>
              <c-input-text v-model:value="value.key" :placeholder="t('tools.api-tester.paramNamePlaceholder')" type="text" />
              <c-input-text v-model:value="value.value" :placeholder="t('tools.api-tester.paramValuePlaceholder')" type="text" />
            </div>
          </template>
        </n-dynamic-input>
      </c-card>
      <c-input-text
        v-if="method !== 'GET' && method !== 'HEAD'"
        v-model:value="body"
        :label="t('tools.api-tester.bodyLabel')"
        :placeholder="t('tools.api-tester.httpQueryBodyPlaceholder')"
        multiline
        monospace
        mb-2
      />

      <n-checkbox v-model:checked="noCORS">
        {{ t('tools.api-tester.noCorsCheckbox') }}
      </n-checkbox>

      <div mt-5 flex justify-center>
        <c-button secondary @click="callAPI">
          {{ t('tools.api-tester.callApiButton') }}
        </c-button>
      </div>
    </c-card>
    <n-spin
      v-if="inprogress"
      size="small"
    />
    <c-alert v-if="!inprogress && apiCallResult && apiCallResult.code !== 200" type="error" mt-12 :title="t('tools.api-tester.errorCallingApiTitle')">
      <p><strong>Status code = {{ apiCallResult.code }}</strong></p>
      <TextareaCopyable :value="apiCallResult.error" copy-placement="none" />
    </c-alert>
    <c-card v-if="!inprogress && apiCallResult && apiCallResult.code === 200" mt-12 :title="t('tools.api-tester.apiCallResultTitle')">
      <TextareaCopyable :value="apiCallResult.result" word-wrap />
    </c-card>
  </div>
</template>

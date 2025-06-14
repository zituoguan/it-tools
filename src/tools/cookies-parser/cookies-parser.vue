<script lang="ts" setup>
import { useQueryParam } from '@/composable/queryParams';

const { t } = useI18n();
const cookieHeader = useQueryParam({ name: 'cookies', defaultValue: '' });

const parsedCookies = computed(() => {
  return (cookieHeader.value || '').replace(/^Cookie:\s*/, '').split('; ').map((cookie) => {
    const [name, ...values] = cookie.split('=');
    return { name, value: decodeURIComponent(values?.join('=') || '') };
  });
});
</script>

<template>
  <n-card :title="t('tools.cookies-parser.title')">
    <n-space vertical>
      <n-input v-model:value="cookieHeader" :placeholder="t('tools.cookies-parser.placeholder')" type="text" />
    </n-space>
    <n-p v-html="t('tools.cookies-parser.tip')" />
    <n-table v-if="parsedCookies.length">
      <thead><tr><th>{{ t('tools.cookies-parser.name') }}</th><th>{{ t('tools.cookies-parser.value') }}</th></tr></thead>
      <tbody>
        <tr v-for="cookie in parsedCookies" :key="cookie.name">
          <td>
            <n-a :href="`https://cookiedatabase.org/?s=${cookie.name}`" target="_blank">
              {{ cookie.name }}
            </n-a>
          </td>
          <td>{{ cookie.value }}</td>
        </tr>
      </tbody>
    </n-table>
    <n-alert v-else type="warning">
      {{ t('tools.cookies-parser.noCookiesFound') }}
    </n-alert>
  </n-card>
</template>

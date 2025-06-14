<script setup lang="ts">
import iesData from './ies-lighting-data.json';
import useDebouncedRef from '@/composable/debouncedref';
import { useFlexSearch } from '@/composable/flexSearch';

const { t } = useI18n();

const data = iesData;
const searchQuery = useDebouncedRef('', 250);

const { searchResult } = useFlexSearch({
  search: searchQuery,
  data,
  options: {
    keys: ['industryType', 'industryApplication', 'footCandlesRange', 'recommendedLighting'],
    filterEmpty: false,
  },
});

// 翻译函数，用于翻译 JSON 数据中的值
function translateIndustryType(industryType: string) {
  if (!industryType) {
    return '';
  }
  const key = industryType.toLowerCase().replace(/[^a-z0-9]/g, '-');
  return t(`tools.ies-lighting-guidelines.industry-types.${key}`, industryType);
}

function translateIndustryApplication(application: string) {
  if (!application) {
    return '';
  }
  const key = application.toLowerCase().replace(/[^a-z0-9]/g, '-');
  return t(`tools.ies-lighting-guidelines.applications.${key}`, application);
}

function translateRecommendedLighting(lighting: string) {
  if (!lighting) {
    return '';
  }
  const key = lighting.toLowerCase().replace(/[^a-z0-9]/g, '-');
  return t(`tools.ies-lighting-guidelines.lighting-types.${key}`, lighting);
}

// 处理搜索结果，添加翻译
const translatedSearchResult = computed(() => {
  return searchResult.value.map(item => ({
    ...item,
    translatedIndustryType: translateIndustryType(item.industryType),
    translatedIndustryApplication: translateIndustryApplication(item.industryApplication),
    translatedRecommendedLighting: translateRecommendedLighting(item.recommendedLighting),
  }));
});
</script>

<template>
  <div mx-auto max-w-2400px important:flex-1>
    <div flex items-center gap-3>
      <c-input-text
        v-model:value="searchQuery"
        :placeholder="t('tools.ies-lighting-guidelines.search-placeholder')"
        mx-auto max-w-600px
      >
        <template #prefix>
          <icon-mdi-search mr-6px color-black op-70 dark:color-white />
        </template>
      </c-input-text>
    </div>

    <n-p style="text-align: center">
      {{ t('tools.ies-lighting-guidelines.disclaimer-text') }} <n-a href="https://www.ies.org/standards/lighting-library/" target="_blank">
        {{ t('tools.ies-lighting-guidelines.handbook-link') }}
      </n-a> {{ t('tools.ies-lighting-guidelines.disclaimer-suffix') }}
    </n-p>

    <div>
      <div
        v-if="translatedSearchResult.length === 0"

        mt-4 text-center text-20px font-bold
      >
        {{ t('tools.ies-lighting-guidelines.no-results') }}
      </div>

      <div v-else>
        <div mt-4 text-20px font-bold>
          {{ t('tools.ies-lighting-guidelines.search-result') }}
        </div>

        <n-table>
          <thead>
            <th>{{ t('tools.ies-lighting-guidelines.table.industry') }}</th>
            <th>{{ t('tools.ies-lighting-guidelines.table.application') }}</th>
            <th>{{ t('tools.ies-lighting-guidelines.table.foot-candles') }}</th>
            <th>{{ t('tools.ies-lighting-guidelines.table.lighting-type') }}</th>
          </thead>
          <tbody>
            <tr v-for="(result, ix) in translatedSearchResult" :key="ix">
              <td>
                <input-copyable :readonly="true" :value="result.translatedIndustryType" />
              </td>
              <td>
                <input-copyable :readonly="true" :value="result.translatedIndustryApplication" />
              </td>
              <td>
                <input-copyable :readonly="true" :value="result.footCandlesRange" />
              </td>
              <td>
                <input-copyable :readonly="true" :value="result.translatedRecommendedLighting" />
              </td>
            </tr>
          </tbody>
        </n-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import { convert } from './list-converter.models';
import type { ConvertOptions } from './list-converter.types';

const { t } = useI18n();

const sortOrderOptions = [
  {
    label: t('tools.list-converter.noSort'),
    value: null,
    disabled: false,
  },
  {
    label: t('tools.list-converter.sortAscending'),
    value: 'asc',
  },
  {
    label: t('tools.list-converter.sortDescending'),
    value: 'desc',
  },
  {
    label: t('tools.list-converter.sortAscNumeric'),
    value: 'asc-num',
  },
  {
    label: t('tools.list-converter.sortDescNumeric'),
    value: 'desc-num',
  },
  {
    label: t('tools.list-converter.sortAscUpper'),
    value: 'asc-upper',
  },
  {
    label: t('tools.list-converter.sortDescUpper'),
    value: 'desc-upper',
  },
  {
    label: t('tools.list-converter.sortAscBinary'),
    value: 'asc-bin',
  },
  {
    label: t('tools.list-converter.sortDescBinary'),
    value: 'desc-bin',
  },
];

const conversionConfig = useStorage<ConvertOptions>('list-converter:conversionConfig', {
  lowerCase: false,
  trimItems: true,
  removeDuplicates: true,
  keepLineBreaks: false,
  itemPrefix: '',
  itemSuffix: '',
  removeItemPrefix: '',
  removeItemSuffix: '',
  listPrefix: '',
  listSuffix: '',
  reverseList: false,
  sortList: null,
  itemsSeparator: ', ',
  splitBySeparator: '',
});

function transformer(value: string) {
  return convert(value, conversionConfig.value);
}
</script>

<template>
  <div style="flex: 0 0 100%">
    <div style="margin: 0 auto; max-width: 600px">
      <c-card>
        <n-space>
          <div>
            <n-form-item :label="t('tools.list-converter.trimListItems')" label-placement="left" label-width="150" :show-feedback="false" mb-2>
              <n-switch v-model:value="conversionConfig.trimItems" />
            </n-form-item>
            <n-form-item :label="t('tools.list-converter.removeDuplicates')" label-placement="left" label-width="150" :show-feedback="false" mb-2>
              <n-switch v-model:value="conversionConfig.removeDuplicates" data-test-id="removeDuplicates" />
            </n-form-item>
            <n-form-item
              :label="t('tools.list-converter.convertToLowercase')"
              label-placement="left"
              label-width="150"
              :show-feedback="false"
              mb-2
            >
              <n-switch v-model:value="conversionConfig.lowerCase" />
            </n-form-item>
            <n-form-item :label="t('tools.list-converter.keepLineBreaks')" label-placement="left" label-width="150" :show-feedback="false" mb-2>
              <n-switch v-model:value="conversionConfig.keepLineBreaks" />
            </n-form-item>
          </div>
          <div>
            <c-select
              v-model:value="conversionConfig.sortList"
              :label="t('tools.list-converter.sortList')"
              label-position="left"
              label-width="120px"
              label-align="right"
              mb-2
              :options="sortOrderOptions"
              w-full
              :disabled="conversionConfig.reverseList"
              data-test-id="sortList"
              :placeholder="t('tools.list-converter.sortAlphabetically')"
            />

            <c-input-text
              v-model:value="conversionConfig.itemsSeparator"
              :label="t('tools.list-converter.itemsSeparator')"
              label-position="left"
              label-width="120px"
              label-align="right"
              mb-2
              :placeholder="t('tools.list-converter.itemsSeparatorPlaceholder')"
            />

            <c-input-text
              v-model:value="conversionConfig.splitBySeparator"
              :label="t('tools.list-converter.splitSeparator')"
              label-position="left"
              label-width="120px"
              label-align="right"
              mb-2
              :placeholder="t('tools.list-converter.splitSeparatorPlaceholder')"
            />

            <n-form-item :label="t('tools.list-converter.unwrapItem')" label-placement="left" label-width="120" :show-feedback="false" mb-2>
              <c-input-text
                v-model:value="conversionConfig.removeItemPrefix"
                :placeholder="t('tools.list-converter.removeItemPrefixPlaceholder')"
                test-id="removeItemPrefix"
              />
              <c-input-text
                v-model:value="conversionConfig.removeItemSuffix"
                :placeholder="t('tools.list-converter.removeItemSuffixPlaceholder')"
                test-id="removeItemSuffix"
              />
            </n-form-item>

            <n-form-item :label="t('tools.list-converter.wrapItem')" label-placement="left" label-width="120" :show-feedback="false" mb-2>
              <c-input-text
                v-model:value="conversionConfig.itemPrefix"
                :placeholder="t('tools.list-converter.itemPrefixPlaceholder')"
                test-id="itemPrefix"
              />
              <c-input-text
                v-model:value="conversionConfig.itemSuffix"
                :placeholder="t('tools.list-converter.itemSuffixPlaceholder')"
                test-id="itemSuffix"
              />
            </n-form-item>
            <n-form-item :label="t('tools.list-converter.wrapList')" label-placement="left" label-width="120" :show-feedback="false" mb-2>
              <c-input-text
                v-model:value="conversionConfig.listPrefix"
                :placeholder="t('tools.list-converter.listPrefixPlaceholder')"
                test-id="listPrefix"
              />
              <c-input-text
                v-model:value="conversionConfig.listSuffix"
                :placeholder="t('tools.list-converter.listSuffixPlaceholder')"
                test-id="listSuffix"
              />
            </n-form-item>
          </div>
        </n-space>
      </c-card>
    </div>
  </div>
  <format-transformer
    :input-label="t('tools.list-converter.inputLabel')"
    :input-placeholder="t('tools.list-converter.inputPlaceholder')"
    :output-label="t('tools.list-converter.outputLabel')"
    :transformer="transformer"
    download-file-name="output.txt"
  />
</template>

<script setup lang="ts">
import { code, countries, country } from 'currency-codes-ts';
import converter from 'currency-exchanger-js';
import moneysData from './moneys.json';
import { useQueryParamOrStorage } from '@/composable/queryParams';

const { t } = useI18n();

const allCurrencies = Object.entries(moneysData).map(([k, v]) => ({ value: k, label: v || k }));
const otherCurrencies = useQueryParamOrStorage<{ name: string }[]>({ name: 'to', storageName: 'currency-conv:others', defaultValue: [{ name: 'usd' }] });
const currentCurrency = useQueryParamOrStorage<string>({ name: 'from', storageName: 'currency-conv:cur', defaultValue: 'eur' });
const amount = ref(1);
const currentDatetime = ref(Date.now());

const convertedCurrencies = computedAsync<Record<string, number>>(async () => {
  const currentCurrencyValue = currentCurrency.value;
  const currentDatetimeValue = currentDatetime.value;
  const amountValue = amount.value;
  const otherCurrenciesValues = otherCurrencies.value;

  let result = {};
  for (const targetCurrency of otherCurrenciesValues) {
    const value = await converter.convertOnDate(amountValue, currentCurrencyValue, targetCurrency.name, new Date(currentDatetimeValue));
    result = { ...result, [targetCurrency.name]: value };
  }
  return result;
});

const countryToCurrenciesInput = ref('France');
const allCountries = countries();
const countryToCurrenciesOutput = computed(() => country(countryToCurrenciesInput.value));

const currencyToCountriesInput = ref('eur');
const currencyToCountriesOutput = computed(() => code(currencyToCountriesInput.value));
</script>

<template>
  <div>
    <c-card :title="t('tools.currency-converter.converter.title')" mb-2>
      <c-select
        v-model:value="currentCurrency"
        :label="t('tools.currency-converter.converter.from')"
        label-position="left"
        searchable
        :options="allCurrencies"
        mb-2
      />
      <n-form-item :label="t('tools.currency-converter.converter.amount')" label-placement="left" mb-2>
        <n-input-number v-model:value="amount" :min="0" />
      </n-form-item>

      <n-form-item :label="t('tools.currency-converter.converter.for-date')" label-placement="left" mb-2>
        <n-date-picker
          v-model:value="currentDatetime"
          type="date"
        />
      </n-form-item>

      <c-card :title="t('tools.currency-converter.converter.converted-currencies')">
        <n-dynamic-input
          v-model:value="otherCurrencies"
          show-sort-button
          :on-create="() => ({ name: 'eur' })"
        >
          <template #default="{ value }">
            <div flex flex-wrap items-center gap-1>
              <n-select
                v-model:value="value.name"
                filterable
                :placeholder="t('tools.currency-converter.converter.select-currency-placeholder')"
                :options="allCurrencies"
                w-full
              />
              <input-copyable readonly :value="convertedCurrencies ? convertedCurrencies[value.name] : 0" />
            </div>
          </template>
        </n-dynamic-input>
      </c-card>
    </c-card>

    <c-card :title="t('tools.currency-converter.country-to-currencies.title')" mb-2>
      <c-select
        v-model:value="countryToCurrenciesInput"
        :label="t('tools.currency-converter.country-to-currencies.country-label')"
        label-position="left"
        searchable
        :options="allCountries"
      />

      <n-divider />

      <ul>
        <li v-for="(currency, ix) in countryToCurrenciesOutput" :key="ix">
          {{ currency.currency }} [{{ currency.code }}/{{ currency.number }} - {{ currency.digits }}{{ t('tools.currency-converter.country-to-currencies.digits') }}] ({{ t('tools.currency-converter.country-to-currencies.also-in') }} {{ currency.countries?.join(', ') }})
        </li>
      </ul>
    </c-card>

    <c-card :title="t('tools.currency-converter.currencies-to-countries.title')" mb-2>
      <c-select
        v-model:value="currencyToCountriesInput"
        :label="t('tools.currency-converter.currencies-to-countries.currency-label')"
        label-position="left"
        searchable
        :options="allCurrencies"
      />

      <n-divider />

      <n-p v-if="currencyToCountriesOutput">
        {{ currencyToCountriesOutput.currency }} [{{ currencyToCountriesOutput.code }}/{{ currencyToCountriesOutput.number }} - {{ currencyToCountriesOutput.digits }}{{ t('tools.currency-converter.currencies-to-countries.digits') }}]
      </n-p>

      <ul v-if="currencyToCountriesOutput">
        <li v-for="(countryName, ix) in currencyToCountriesOutput.countries" :key="ix">
          {{ countryName }}
        </li>
      </ul>
    </c-card>
  </div>
</template>

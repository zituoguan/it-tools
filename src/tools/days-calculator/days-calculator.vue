<script setup lang="ts">
import { getAllTimezones } from 'countries-and-timezones';
import { type Weekdays, allWeekDays, diffDateTimes, getSupportedCountries, getSupportedRegions, getSupportedStates } from './days-calculator.service';
import { useQueryParamOrStorage } from '@/composable/queryParams';

const { t } = useI18n();
const now = Date.now();

const inputDateRange = ref<[number, number]>([now, now + 86400]);

const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const allTimezones = computed(() => Object.values(getAllTimezones()).map(tz => ({
  value: tz.name,
  label: `${tz.name === browserTimezone ? t('tools.days-calculator.browser-tz-prefix') : ''}${tz.name} (${tz.utcOffset === tz.dstOffset ? tz.utcOffsetStr : `${tz.utcOffsetStr}/${tz.dstOffsetStr}`})`,
})));
const allCountries = ref(getSupportedCountries());
const country = useQueryParamOrStorage({ name: 'country', storageName: 'days-calc:ctr', defaultValue: 'FR' });
const possibleStates = computed(() => getSupportedStates(country.value));
const state = useQueryParamOrStorage({ name: 'state', storageName: 'days-calc:st', defaultValue: '' });
const possibleRegions = computed(() => getSupportedRegions(country.value, state.value));
const region = useQueryParamOrStorage({ name: 'region', storageName: 'days-calc:reg', defaultValue: '' });
const includeEndDate = useQueryParamOrStorage({ name: 'includeend', storageName: 'days-calc:end', defaultValue: false });
const includeWeekDays = useQueryParamOrStorage<Weekdays[]>({ name: 'days', storageName: 'days-calc:days', defaultValue: allWeekDays });
const includeHolidays = useQueryParamOrStorage({ name: 'includehol', storageName: 'days-calc:hol', defaultValue: true });
const businessStartHour = useQueryParamOrStorage({ name: 'businessstart', storageName: 'days-calc:bss', defaultValue: 9 });
const businessEndHour = useQueryParamOrStorage({ name: 'businessstend', storageName: 'days-calc:bse', defaultValue: 18 });
const businessTimezone = useQueryParamOrStorage({ name: 'tz', storageName: 'days-calc:tz', defaultValue: browserTimezone });
const error = ref('');
const resultDaysDiff = computed(() => {
  try {
    return diffDateTimes({
      date1: new Date(inputDateRange.value[0] / 1000 * 1000),
      date2: new Date(inputDateRange.value[1] / 1000 * 1000),
      country: country.value,
      state: state.value,
      region: region.value,
      businessTimezone: businessTimezone.value,
      includeEndDate: includeEndDate.value,
      includeWeekDays: includeWeekDays.value,
      includeHolidays: includeHolidays.value,
      businessStartHour: businessStartHour.value,
      businessEndHour: businessEndHour.value,
    });
  }
  catch (e: any) {
    error.value = e.toString();
    return null;
  }
});

const inputProps = {
  'labelPosition': 'left',
  'labelWidth': '170px',
  'readonly': true,
  'mb-2': '',
} as const;
</script>

<template>
  <div>
    <c-card :title="t('tools.days-calculator.dates-interval-title')" mb-2>
      <n-form-item :label="t('tools.days-calculator.date-range-label')" label-placement="left" label-width="100px" label-align="left" mb-1>
        <n-date-picker v-model:value="inputDateRange" type="datetimerange" />
      </n-form-item>

      <c-select
        v-model:value="country"
        label-position="left"
        label-width="100px"
        searchable
        :label="t('tools.days-calculator.country-label')"
        :options="allCountries"
        mb-1
      />
      <c-select
        v-if="possibleStates?.length > 0"
        v-model:value="state"
        label-position="left"
        label-width="100px"
        searchable
        :label="t('tools.days-calculator.state-label')"
        :options="possibleStates"
        :placeholder="t('tools.days-calculator.state-placeholder')"
        mb-1
      />
      <c-select
        v-if="possibleRegions?.length > 0"
        v-model:value="region"
        label-position="left"
        label-width="100px"
        searchable
        :label="t('tools.days-calculator.region-label')"
        :options="possibleRegions"
        mb-1
      />
      <c-select
        v-model:value="businessTimezone"
        label-position="left"
        label-width="100px"
        searchable
        :label="t('tools.days-calculator.timezone-label')"
        :options="allTimezones"
        mb-2
      />

      <div mb-2 flex items-baseline gap-2>
        <n-form-item :label="t('tools.days-calculator.business-start-hour-label')" label-placement="left" flex-1>
          <n-input-number v-model:value="businessStartHour" :min="0" :max="24" />
        </n-form-item>
        <n-form-item :label="t('tools.days-calculator.business-end-hour-label')" label-placement="left" flex-1>
          <n-input-number v-model:value="businessEndHour" :min="0" :max="24" />
        </n-form-item>
      </div>

      <div mb-2 flex items-baseline justify-center gap-2>
        <n-checkbox v-model:checked="includeHolidays">
          {{ t('tools.days-calculator.include-holidays') }}
        </n-checkbox>
        <n-checkbox v-model:checked="includeEndDate">
          {{ t('tools.days-calculator.include-end-date') }}
        </n-checkbox>
      </div>

      <c-card :title="t('tools.days-calculator.weekdays-title')">
        <n-checkbox-group v-model:value="includeWeekDays">
          <n-space justify="center">
            <n-checkbox value="monday" :label="t('tools.days-calculator.weekdays.monday')" />
            <n-checkbox value="tuesday" :label="t('tools.days-calculator.weekdays.tuesday')" />
            <n-checkbox value="wednesday" :label="t('tools.days-calculator.weekdays.wednesday')" />
            <n-checkbox value="thursday" :label="t('tools.days-calculator.weekdays.thursday')" />
            <n-checkbox value="friday" :label="t('tools.days-calculator.weekdays.friday')" />
            <n-checkbox value="saturday" :label="t('tools.days-calculator.weekdays.saturday')" />
            <n-checkbox value="sunday" :label="t('tools.days-calculator.weekdays.sunday')" />
          </n-space>
        </n-checkbox-group>
      </c-card>

      <n-divider />

      <c-alert v-if="error">
        {{ error }}
      </c-alert>

      <c-card v-if="resultDaysDiff" :title="t('tools.days-calculator.result-title')">
        <input-copyable v-bind="inputProps" :label="t('tools.days-calculator.results.start-date')" :value="resultDaysDiff.startDate" />
        <input-copyable v-bind="inputProps" :label="t('tools.days-calculator.results.start-date-iso')" :value="resultDaysDiff.startDate.toISOString()" />
        <input-copyable v-bind="inputProps" :label="t('tools.days-calculator.results.end-date')" :value="resultDaysDiff.endDate" />
        <input-copyable v-bind="inputProps" :label="t('tools.days-calculator.results.end-date-iso')" :value="resultDaysDiff.endDate.toISOString()" />
        <n-divider />
        <input-copyable v-bind="inputProps" :label="t('tools.days-calculator.results.total-difference-seconds')" :value="resultDaysDiff.totalDifference.seconds" />
        <input-copyable v-bind="inputProps" :label="t('tools.days-calculator.results.total-difference-minutes')" :value="resultDaysDiff.totalDifference.minutes" />
        <input-copyable v-bind="inputProps" :label="t('tools.days-calculator.results.total-difference-hours')" :value="resultDaysDiff.totalDifference.hours" />
        <input-copyable v-bind="inputProps" :label="t('tools.days-calculator.results.total-difference-days')" :value="resultDaysDiff.totalDifference.days" />
        <input-copyable v-bind="inputProps" :label="t('tools.days-calculator.results.total-difference-weeks')" :value="resultDaysDiff.totalDifference.weeks" />
        <input-copyable v-bind="inputProps" :label="t('tools.days-calculator.results.total-difference-months')" :value="resultDaysDiff.totalDifference.months" />
        <input-copyable v-bind="inputProps" :label="t('tools.days-calculator.results.total-difference-years')" :value="resultDaysDiff.totalDifference.years" />
        <input-copyable v-bind="inputProps" :label="t('tools.days-calculator.results.total-difference')" :value="resultDaysDiff.totalDifferenceFormatted" />
        <n-divider />
        <input-copyable v-bind="inputProps" :label="t('tools.days-calculator.results.difference-seconds')" :value="resultDaysDiff.differenceSeconds" />
        <input-copyable v-bind="inputProps" :label="t('tools.days-calculator.results.difference')" :value="resultDaysDiff.differenceFormatted" />
        <n-divider />
        <input-copyable v-bind="inputProps" :label="t('tools.days-calculator.results.business-seconds')" :value="resultDaysDiff.businessSeconds" />
        <input-copyable v-bind="inputProps" :label="t('tools.days-calculator.results.business-time')" :value="resultDaysDiff.businessSecondsFormatted" />
        <input-copyable v-bind="inputProps" :label="t('tools.days-calculator.results.business-hours')" :value="resultDaysDiff.businessHours" />
        <input-copyable v-bind="inputProps" :label="t('tools.days-calculator.results.business-days')" :value="resultDaysDiff.businessDays" />
        <n-divider />
        <input-copyable v-bind="inputProps" :placeholder="t('tools.days-calculator.none-placeholder')" :label="t('tools.days-calculator.results.mondays')" :value="resultDaysDiff.mondays" />
        <input-copyable v-bind="inputProps" :placeholder="t('tools.days-calculator.none-placeholder')" :label="t('tools.days-calculator.results.tuesdays')" :value="resultDaysDiff.tuesdays" />
        <input-copyable v-bind="inputProps" :placeholder="t('tools.days-calculator.none-placeholder')" :label="t('tools.days-calculator.results.wednesdays')" :value="resultDaysDiff.wednesdays" />
        <input-copyable v-bind="inputProps" :placeholder="t('tools.days-calculator.none-placeholder')" :label="t('tools.days-calculator.results.thursdays')" :value="resultDaysDiff.thursdays" />
        <input-copyable v-bind="inputProps" :placeholder="t('tools.days-calculator.none-placeholder')" :label="t('tools.days-calculator.results.fridays')" :value="resultDaysDiff.fridays" />
        <input-copyable v-bind="inputProps" :placeholder="t('tools.days-calculator.none-placeholder')" :label="t('tools.days-calculator.results.saturdays')" :value="resultDaysDiff.saturdays" />
        <input-copyable v-bind="inputProps" :placeholder="t('tools.days-calculator.none-placeholder')" :label="t('tools.days-calculator.results.sundays')" :value="resultDaysDiff.sundays" />
        <n-divider />
        <input-copyable v-bind="inputProps" :label="t('tools.days-calculator.results.weekend-days')" :value="resultDaysDiff.weekendDays" />
        <input-copyable v-bind="inputProps" :label="t('tools.days-calculator.results.full-weekends')" :value="resultDaysDiff.weekends" />
        <c-card v-if="resultDaysDiff.holidays?.length" :title="t('tools.days-calculator.holidays-title')">
          <ul>
            <li v-for="(holiday, index) in resultDaysDiff.holidays" :key="index">
              {{ holiday.date }}: {{ holiday.name }} ({{ holiday.type }})
            </li>
          </ul>
        </c-card>
      </c-card>
    </c-card>
  </div>
</template>

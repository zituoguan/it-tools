<script setup lang="ts">
import cronstrue from 'cronstrue';
import ctz from 'countries-and-timezones';
import getTimezoneOffset from 'get-timezone-offset';
import { type CronType, getLastExecutionTimes, isCronValid } from './crontab-generator.service';
import { useStyleStore } from '@/stores/style.store';
import { useQueryParamOrStorage } from '@/composable/queryParams';

const { t } = useI18n();
const styleStore = useStyleStore();

const cron = ref('40 * * * *');
const cronstrueConfig = reactive({
  verbose: true,
  dayOfWeekStartIndexZero: true,
  use24HourTimeFormat: true,
  throwExceptionOnParseError: true,
  monthStartIndexZero: false,
  tzOffset: (new Date()).getTimezoneOffset() / 60,
});

// getTimezoneOffset(tz.name, now) / 60
const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const allTimezones = computed(() => Object.values(ctz.getAllTimezones()).map((tz: any) => {
  const timezoneUTCDSTOffset = tz.utcOffset === tz.dstOffset ? tz.utcOffsetStr : `${tz.utcOffsetStr}/${tz.dstOffsetStr}`;
  const prefix = tz.name === browserTimezone ? `${t('tools.crontab-generator.browserTZ')} - ` : '';
  return {
    value: tz.name,
    label: `${prefix}${tz.name} (${timezoneUTCDSTOffset})`,
  };
}));
const currentTimezone = useQueryParamOrStorage({ name: 'tz', storageName: 'crongen:tz', defaultValue: browserTimezone });
watchEffect(() => {
  cronstrueConfig.tzOffset = -getTimezoneOffset(currentTimezone.value, new Date()) / 60;
});

const commonHelpers = computed(() => [
  {
    symbol: '*',
    meaning: t('tools.crontab-generator.helpers.asterisk.meaning'),
    example: '* * * * *',
    equivalent: t('tools.crontab-generator.helpers.asterisk.equivalent'),
  },
  {
    symbol: '-',
    meaning: t('tools.crontab-generator.helpers.dash.meaning'),
    example: '1-10 * * * *',
    equivalent: t('tools.crontab-generator.helpers.dash.equivalent'),
  },
  {
    symbol: ',',
    meaning: t('tools.crontab-generator.helpers.comma.meaning'),
    example: '1,10 * * * *',
    equivalent: t('tools.crontab-generator.helpers.comma.equivalent'),
  },
  {
    symbol: '/',
    meaning: t('tools.crontab-generator.helpers.slash.meaning'),
    example: '*/10 * * * *',
    equivalent: t('tools.crontab-generator.helpers.slash.equivalent'),
  },
]);

const standardHelpers = computed(() => [
  ...commonHelpers.value,
  {
    symbol: '@yearly',
    meaning: t('tools.crontab-generator.helpers.yearly.meaning'),
    example: '@yearly',
    equivalent: '0 0 1 1 *',
  },
  {
    symbol: '@annually',
    meaning: t('tools.crontab-generator.helpers.annually.meaning'),
    example: '@annually',
    equivalent: '0 0 1 1 *',
  },
  {
    symbol: '@monthly',
    meaning: t('tools.crontab-generator.helpers.monthly.meaning'),
    example: '@monthly',
    equivalent: '0 0 1 * *',
  },
  {
    symbol: '@weekly',
    meaning: t('tools.crontab-generator.helpers.weekly.meaning'),
    example: '@weekly',
    equivalent: '0 0 * * 0',
  },
  {
    symbol: '@daily',
    meaning: t('tools.crontab-generator.helpers.daily.meaning'),
    example: '@daily',
    equivalent: '0 0 * * *',
  },
  {
    symbol: '@midnight',
    meaning: t('tools.crontab-generator.helpers.midnight.meaning'),
    example: '@midnight',
    equivalent: '0 0 * * *',
  },
  {
    symbol: '@hourly',
    meaning: t('tools.crontab-generator.helpers.hourly.meaning'),
    example: '@hourly',
    equivalent: '0 * * * *',
  },
  {
    symbol: '@reboot',
    meaning: t('tools.crontab-generator.helpers.reboot.meaning'),
    example: '',
    equivalent: '',
  },
]);

const awsHelpers = computed(() => [
  ...commonHelpers.value,
  {
    symbol: '?',
    meaning: t('tools.crontab-generator.helpers.question.meaning'),
    example: '9 * 7,9,11 5 ? 2021',
    equivalent: t('tools.crontab-generator.helpers.question.equivalent'),
  },
  {
    symbol: 'L',
    meaning: t('tools.crontab-generator.helpers.L.meaning'),
    example: '9 * L 5 ? 2019,2020',
    equivalent: t('tools.crontab-generator.helpers.L.equivalent'),
  },
  {
    symbol: 'W',
    meaning: t('tools.crontab-generator.helpers.W.meaning'),
    example: '19 4 3W 9 ? 2019,2020',
    equivalent: t('tools.crontab-generator.helpers.W.equivalent'),
  },
  {
    symbol: '#',
    meaning: t('tools.crontab-generator.helpers.hash.meaning'),
    example: '9 8-20 ? 12 3#5 2019,2020',
    equivalent: t('tools.crontab-generator.helpers.hash.equivalent'),
  },
]);

const defaultAWSCronExpression = '0 0 ? * 1 *';
const defaultStandardCronExpression = '40 * * * *';
const cronType = ref<CronType>('standard');
watch(cronType,
  (newCronType) => {
    if (newCronType === 'aws') {
      if (!cron.value || cron.value === defaultStandardCronExpression) {
        cron.value = defaultAWSCronExpression;
      }
    }
    else if (newCronType === 'standard') {
      if (!cron.value || cron.value === defaultAWSCronExpression) {
        cron.value = defaultStandardCronExpression;
      }
    }
  },
);

const getHelpers = computed(() => {
  if (cronType.value === 'aws') {
    return awsHelpers.value;
  }
  return standardHelpers.value;
});

const cronString = computed(() => {
  if (isCronValid(cron.value)) {
    return cronstrue.toString(cron.value, cronstrueConfig);
  }
  return ' ';
});

const cronValidationRules = computed(() => [
  {
    validator: (value: string) => isCronValid(value, cronType.value),
    message: t('tools.crontab-generator.invalidCron'),
  },
]);

const executionTimesString = computed(() => {
  if (isCronValid(cron.value)) {
    try {
      const lastExecutionTimes = getLastExecutionTimes(cron.value, currentTimezone.value);
      const executionTimesString = lastExecutionTimes.join('\n');
      return `${t('tools.crontab-generator.nextExecutions')}:\n${executionTimesString}`;
    }
    catch (e: any) {
      return e.toString();
    }
  }
  return ' ';
});
</script>

<template>
  <c-card>
    <div mx-auto max-w-sm>
      <c-input-text
        v-model:value="cron"
        size="large"
        placeholder="* * * * *"
        :validation-rules="cronValidationRules"
        mb-3
      />
    </div>

    <n-radio-group v-model:value="cronType" name="radiogroup" mb-2 flex justify-center>
      <n-space>
        <n-radio
          value="standard"
          :label="t('tools.crontab-generator.unixStandard')"
        />
        <n-radio
          value="aws"
          label="AWS"
        />
      </n-space>
    </n-radio-group>

    <div class="cron-string">
      {{ cronString }}
    </div>

    <div class="cron-execution-string">
      {{ executionTimesString }}
    </div>

    <n-divider />

    <div flex justify-center>
      <n-form :show-feedback="false" label-width="170" label-placement="left">
        <n-form-item :label="t('tools.crontab-generator.verbose')">
          <n-switch v-model:value="cronstrueConfig.verbose" />
        </n-form-item>
        <n-form-item :label="t('tools.crontab-generator.use24HourFormat')">
          <n-switch v-model:value="cronstrueConfig.use24HourTimeFormat" />
        </n-form-item>
        <n-form-item :label="t('tools.crontab-generator.daysStartAt0')">
          <n-switch v-model:value="cronstrueConfig.dayOfWeekStartIndexZero" />
        </n-form-item>
        <n-form-item :label="t('tools.crontab-generator.monthsStartAt0')">
          <n-switch v-model:value="cronstrueConfig.monthStartIndexZero" />
        </n-form-item>
        <c-select
          v-model:value="currentTimezone"
          searchable
          :label="t('tools.crontab-generator.timezone')"
          :options="allTimezones"
        />
      </n-form>
    </div>
  </c-card>
  <c-card>
    <pre v-if="cronType === 'standard'">
      -- Standard CRON Syntax --
┌──────────── [optional] seconds (0 - 59)
| ┌────────── minute (0 - 59)
| | ┌──────── hour (0 - 23)
| | | ┌────── day of month (1 - 31)
| | | | ┌──── month (1 - 12) OR jan,feb,mar,apr ...
| | | | | ┌── day of week (0 - 6, sunday=0) OR sun,mon ...
| | | | | |
* * * * * * command</pre>

    <pre v-if="cronType === 'aws'">
      -- AWS CRON Syntax --
┌──────────── minute (0 - 59)
| ┌────────── hour (0 - 23)
| | ┌──────── day of month (1 - 31) OR ? OR L OR W
| | | ┌────── month (1 - 12) OR jan,feb,mar,apr ...
| | | | ┌──── day of week (0 - 6, sunday=0) OR sun,mon OR L ...
| | | | | ┌── year
| | | | | |
* * * * * *</pre>

    <div v-if="styleStore.isSmallScreen">
      <c-card v-for="{ symbol, meaning, example, equivalent } in getHelpers" :key="symbol" mb-3 important:border-none>
        <div>
          {{ t('tools.crontab-generator.symbol') }}: <strong>{{ symbol }}</strong>
        </div>
        <div>
          {{ t('tools.crontab-generator.meaning') }}: <strong>{{ meaning }}</strong>
        </div>
        <div>
          {{ t('tools.crontab-generator.example') }}:
          <strong><code>{{ example }}</code></strong>
        </div>
        <div>
          {{ t('tools.crontab-generator.equivalent') }}: <strong>{{ equivalent }}</strong>
        </div>
      </c-card>
    </div>

    <c-table v-else :data="getHelpers" />
  </c-card>
</template>

<style lang="less" scoped>
::v-deep(input) {
  font-size: 30px;
  font-family: monospace;
  padding: 5px;
  text-align: center;
}

.cron-string {
  text-align: center;
  font-size: 22px;
  opacity: 0.8;
  margin: 5px 0 15px;
}

pre {
  overflow: auto;
  padding: 10px 0;
}

.cron-execution-string{
  text-align: center;
  font-size: 14px;
  opacity: 0.8;
  margin: 5px 0 15px;
  white-space: pre-wrap;
}
</style>

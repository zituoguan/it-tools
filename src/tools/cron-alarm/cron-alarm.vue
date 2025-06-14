<script setup lang="ts">
import { Countdown } from 'vue3-flip-countdown';
import { parseExpression } from 'cron-parser';
import moment from 'moment';
import { useQueryParam } from '@/composable/queryParams';

const { t } = useI18n();

const allDays = '0,1,2,3,4,5,6';
const alarmAt = useQueryParam({ name: 'at', defaultValue: '17:30:00' });
const alarmDays = useQueryParam({ name: 'days', defaultValue: allDays });
const history = useStorage<{ days: string; at: string }[]>('cronalarm:hst', []);

function getTimeHref(at: string, days: string) {
  const parsedUrl = new URL(window.location.href);
  parsedUrl.searchParams.set('at', at);
  parsedUrl.searchParams.set('days', days);
  return parsedUrl.toString();
}

const status = ref<'stopped' | 'ended' | 'running'>('stopped');

const audio = ref<HTMLAudioElement | null>(null);

watchEffect(() => {
  if (status.value === 'ended') {
    audio.value?.play();
  }
});

const now = ref(moment());
const daysArray = computed<string[]>({
  get() {
    return (alarmDays.value || allDays).split(',').map(s => s.trim());
  },
  set(newValue) {
    alarmDays.value = newValue.join(',');
  },
});
const cronExpression = computed(() => {
  const [h, m, s] = alarmAt.value.split(':');
  return `${s} ${m} ${h} * * ${alarmDays.value}`;
});
const alarmAtDate = computed(() => {
  const interval = parseExpression(cronExpression.value);
  return interval.next().toDate();
});

const fmt = 'YYYY-MM-DD HH:mm:ss';
const alarmAtFormatted = computed(() => {
  return moment(alarmAtDate.value).format(fmt);
});

function start() {
  now.value = moment();
  status.value = 'running';
  const histoEntry = { at: alarmAt.value, days: alarmDays.value };
  if (!history.value.find(h => h.at === histoEntry.at && h.days === histoEntry.days)) {
    history.value = [histoEntry, ...history.value];
  }
}

function stop() {
  status.value = 'stopped';
  audio.value?.pause();
}

function ended() {
  if (status.value === 'running') {
    status.value = 'ended';
  }
  if (document.fullscreenElement) {
    document.exitFullscreen?.();
  }
}

const fullScreenElement = ref<HTMLElement>();
function toggleFullScreen() {
  const element = fullScreenElement.value;
  if (!element) {
    return;
  }
  if (!document.fullscreenElement) {
    element?.requestFullscreen();
  }
  else {
    document.exitFullscreen?.();
  }
}

const isEnded = computed(() => status.value === 'ended');
</script>

<template>
  <div max-w-600px>
    <c-card :disabled="status !== 'stopped'" :title="t('tools.cron-alarm.title')" mb-4>
      <div mb-1 flex justify-center>
        <n-form-item :label="t('tools.cron-alarm.alarmAt')" label-placement="left">
          <n-time-picker v-model:formatted-value="alarmAt" />
        </n-form-item>
      </div>
      <div flex justify-center>
        <n-checkbox-group v-model:value="daysArray">
          <n-space item-style="display: flex;">
            <n-checkbox value="1" :label="t('tools.cron-alarm.monday')" />
            <n-checkbox value="2" :label="t('tools.cron-alarm.tuesday')" />
            <n-checkbox value="3" :label="t('tools.cron-alarm.wednesday')" />
            <n-checkbox value="4" :label="t('tools.cron-alarm.thursday')" />
            <n-checkbox value="5" :label="t('tools.cron-alarm.friday')" />
            <n-checkbox value="6" :label="t('tools.cron-alarm.saturday')" />
            <n-checkbox value="0" :label="t('tools.cron-alarm.sunday')" />
          </n-space>
        </n-checkbox-group>
      </div>

      <div flex justify-center>
        <c-button
          @click="start"
        >
          {{ t('tools.cron-alarm.start') }}
        </c-button>
      </div>
    </c-card>

    <div id="fullScreenElement" ref="fullScreenElement" mb-2>
      <div>
        <Countdown :deadline="alarmAtFormatted" :stop="status !== 'running'" mb-2 @time-elapsed="ended()" />
        <div mb-2 flex justify-center>
          <c-button
            :disabled="status === 'stopped'"
            @click="toggleFullScreen"
          >
            {{ t('tools.cron-alarm.toggleFullscreen') }}
          </c-button>
        </div>
      </div>
    </div>

    <div mb-2 flex justify-center>
      <c-button
        :disabled="status === 'stopped'"
        @click="stop"
      >
        {{ t('tools.cron-alarm.stop') }}
      </c-button>
    </div>

    <n-p align="center">
      {{ t('tools.cron-alarm.nextAlarmAt') }}: {{ alarmAtDate }}
    </n-p>

    <n-modal v-model:show="isEnded" mask-closable="false">
      <n-card
        style="width: 600px"
        :title="t('tools.cron-alarm.timerFinished')"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <p>{{ t('tools.cron-alarm.timerElapsed') }}</p>
        <template #footer>
          <n-button @click="stop()">
            {{ t('tools.cron-alarm.ok') }}
          </n-button>
        </template>
      </n-card>
    </n-modal>

    <c-card v-if="history" :title="t('tools.cron-alarm.history')">
      <div flex justify-center gap-1>
        <template v-for="(entry, index) in history" :key="index">
          {{ index > 0 ? ' / ' : '' }}
          <n-a :href="getTimeHref(entry.at, entry.days)">
            {{ t('tools.cron-alarm.at') }}: {{ entry.at }} ; {{ t('tools.cron-alarm.days') }}: {{ entry.days || '*' }}
          </n-a>
        </template>
      </div>
    </c-card>

    <audio ref="audio" loop src="/Beep.mp3" />
  </div>
</template>

<style scoped>
#fullScreenElement:fullscreen {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

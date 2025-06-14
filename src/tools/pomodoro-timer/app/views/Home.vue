<script setup>
import { useStore } from 'vuex';
import ProgressBar from '../components/ProgressBar.vue';
import Counter from '../components/Counter.vue';
import PlayPauseBtn from '../components/PlayPauseBtn.vue';
import ResetDropup from '../components/ResetDropup.vue';
import ModeIconBar from '../components/ModeIconBar.vue';

const store = useStore('pomodoro-store');
const { t } = useI18n();
</script>

<template>
  <div v-if="$store.state.isFirstVisit" class="welcome-msg">
    <p>{{ t('tools.pomodoro-timer.home.welcome') }}</p>
    <p>
      {{ t('tools.pomodoro-timer.home.goTo') }} <a style="cursor: pointer;" @click="store.commit('goToPage', 'settings')">
        {{ t('tools.pomodoro-timer.home.settings') }}
      </a> {{ t('tools.pomodoro-timer.home.getStarted') }}
    </p>
  </div>
  <div v-else class="home">
    <div class="graphic">
      <ModeIconBar />
      <ProgressBar />
    </div>
    <div class="counter">
      <Counter />
      <PlayPauseBtn />
      <ResetDropup />
    </div>
  </div>
</template>

<style scoped>
.home {
    width: 100%;
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-areas:
        "graphic"
        "counter";
}
.graphic {
    grid-area: graphic;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.counter {
    grid-area: counter;
    justify-self: center;
    padding-bottom: 1.25rem;
}
.welcome-msg {
    font-size: 1.375rem;
    text-align: center;
    align-self: center;
    margin-top: -5rem;
}
</style>

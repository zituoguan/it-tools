<script setup>
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const store = useStore('pomodoro-store');
</script>

<template>
  <div class="dropup">
    <button class="dropup-btn" @click="store.commit('toggleResetDropup')">
      {{ t('tools.pomodoro-timer.components.resetDropup.reset') }}
    </button>
    <div v-if="store.state.isResetDropupVisible" class="dropup-content">
      <button class="reset-btns" @click="store.commit('timerResetAll')">
        {{ t('tools.pomodoro-timer.components.resetDropup.resetAll') }}
      </button>
      <button class="reset-btns" @click="store.commit('timerResetCurrent')">
        {{ t('tools.pomodoro-timer.components.resetDropup.resetCurrent') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.dropup-btn {
    background-color: white;
    color: var(--pomodoro-app-accent-color);
    border: 0.0625rem solid var(--pomodoro-app-accent-color);
    box-shadow: none;
    width: 11.125rem;
}
.dropup {
    position: relative;
    display: block;
    text-align: center;
    padding-top: 1.25rem;
}
.dropup-content {
    position: absolute;
    bottom: 50px;
    z-index: 1;
    background-color: white;
    padding: 0.625rem;
    box-shadow: 1px 1px 7px -4px black;
}
.reset-btns {
    margin: 0.625rem;
}
</style>

<script setup>
const { t } = useI18n();
</script>

<template>
  <div class="about-root">
    <h1>{{ t('tools.pomodoro-timer.about.title') }}</h1>

    <h2>{{ t('tools.pomodoro-timer.about.techniqueTitle') }}</h2>

    <p>
      {{ t('tools.pomodoro-timer.about.techniqueDesc') }}
    </p>

    <h2>{{ t('tools.pomodoro-timer.about.stepsTitle') }}</h2>

    <ol>
      <li>{{ t('tools.pomodoro-timer.about.step1') }}</li>
      <li>{{ t('tools.pomodoro-timer.about.step2') }}</li>
      <li>{{ t('tools.pomodoro-timer.about.step3') }}</li>
      <li>{{ t('tools.pomodoro-timer.about.step4') }}</li>
      <li>{{ t('tools.pomodoro-timer.about.step5') }}</li>
    </ol>

    <p>
      {{ t('tools.pomodoro-timer.about.source') }} <a target="_blank" href="https://en.wikipedia.org/wiki/Pomodoro_Technique">https://en.wikipedia.org/wiki/Pomodoro_Technique</a>
    </p>
  </div>
</template>

<style scoped>
.about-root {
    width: 90%;
}
p, ol {
    font-size: 0.9375rem;
}
</style>

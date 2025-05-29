<script setup lang="ts">
const { availableLocales, locale } = useI18n();

const localesLong: Record<string, string> = {
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
  fr: 'Français',
  no: 'Norwegian',
  pl: 'Polski',
  pt: 'Português',
  ru: 'Русский',
  uk: 'Українська',
  zh: '中文',
  vi: 'Tiếng Việt',
  ar: 'عربي',
};

const localeOptions = computed(() =>
  availableLocales
    .slice() // Create a shallow copy to avoid mutating the original array
    .sort((a, b) => {
      if (a === 'zh') return -1;
      if (b === 'zh') return 1;
      return 0; // Keep original order for other locales, or implement further sorting
    })
    .map(locale => ({
      label: localesLong[locale] ?? locale,
      value: locale,
    })),
);
</script>

<template>
  <c-select
    v-model:value="locale"
    :options="localeOptions"
    placeholder="Select a language"
    w-100px
  />
</template>

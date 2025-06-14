<script setup lang="ts">
import { generateLoremIpsum, getSupportedLanguages } from './lorem-ipsum-generator.service';
import { computedRefreshable } from '@/composable/computedRefreshable';
import { useCopy } from '@/composable/copy';
import { useQueryParamOrStorage } from '@/composable/queryParams';
import { randIntFromInterval } from '@/utils/random';

const { t } = useI18n();

const paragraphs = useStorage('lorem:paragraphs', 1);
const sentences = useStorage('lorem:sentences', [3, 8]);
const words = useStorage('lorem:words', [8, 15]);
const startWithLoremIpsum = ref(true);
const asHTML = ref(false);
const language = useQueryParamOrStorage({ defaultValue: 'English', storageName: 'lorem:lang', name: 'lang' });

const supportedLanguages = getSupportedLanguages();
const [loremIpsumText, refreshLoremIpsum] = computedRefreshable(() =>
  generateLoremIpsum({
    paragraphCount: paragraphs.value,
    asHTML: asHTML.value,
    sentencePerParagraph: randIntFromInterval(sentences.value[0], sentences.value[1]),
    wordCount: randIntFromInterval(words.value[0], words.value[1]),
    startWithLoremIpsum: startWithLoremIpsum.value,
    language: language.value,
  }),
);

const { copy } = useCopy({ source: loremIpsumText, text: t('tools.lorem-ipsum-generator.copiedToClipboard') });
</script>

<template>
  <c-card>
    <c-select
      v-model:value="language"
      searchable
      :label="t('tools.lorem-ipsum-generator.language')"
      :options="Object.values(supportedLanguages)"
      mb-2
    />
    <n-form-item :label="t('tools.lorem-ipsum-generator.paragraphs')" :show-feedback="false" label-width="200" label-placement="left">
      <n-slider v-model:value="paragraphs" :step="1" :min="1" :max="20" />
    </n-form-item>
    <n-form-item :label="t('tools.lorem-ipsum-generator.sentencesPerParagraph')" :show-feedback="false" label-width="200" label-placement="left">
      <n-slider v-model:value="sentences" range :step="1" :min="1" :max="50" />
    </n-form-item>
    <n-form-item :label="t('tools.lorem-ipsum-generator.wordsPerSentence')" :show-feedback="false" label-width="200" label-placement="left">
      <n-slider v-model:value="words" range :step="1" :min="1" :max="50" />
    </n-form-item>
    <n-form-item :label="t('tools.lorem-ipsum-generator.startWithLoremIpsum')" :show-feedback="false" label-width="200" label-placement="left">
      <n-switch v-model:value="startWithLoremIpsum" />
    </n-form-item>
    <n-form-item :label="t('tools.lorem-ipsum-generator.asHtml')" :show-feedback="false" label-width="200" label-placement="left">
      <n-switch v-model:value="asHTML" />
    </n-form-item>

    <c-input-text :value="loremIpsumText" multiline :placeholder="t('tools.lorem-ipsum-generator.placeholder')" readonly mt-5 rows="5" />

    <div mt-5 flex justify-center gap-3>
      <c-button autofocus @click="copy()">
        {{ t('tools.lorem-ipsum-generator.copy') }}
      </c-button>
      <c-button @click="refreshLoremIpsum">
        {{ t('tools.lorem-ipsum-generator.refresh') }}
      </c-button>
    </div>
  </c-card>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { countBy, orderBy } from 'lodash';

const { t } = useI18n();
const inputText = ref('');
const sortedWordCounts = computed(() => {
  // Remove punctuation, extract words, count occurrences
  const cleanedText = inputText.value.replace(/\p{P}+\s|\s\p{P}+|\p{P}+$|^\p{P}+|\s+/gu, ' ').trim(); // Remove punctuation
  const wordCountObj = countBy(cleanedText.split(' ') || []);

  // Convert to array and sort by count descending
  return orderBy(Object.entries(wordCountObj), ([, count]) => count, 'desc');
});
</script>

<template>
  <div>
    <c-input-text v-model:value="inputText" multiline rows="10" :label="t('tools.distinct-words.text-label')" :placeholder="t('tools.distinct-words.text-placeholder')" mb-1 />
    <c-card :title="t('tools.distinct-words.card-title')">
      <n-table>
        <thead>
          <tr>
            <th>{{ t('tools.distinct-words.word-column') }}</th>
            <th>{{ t('tools.distinct-words.count-column') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="([word, count]) in sortedWordCounts" :key="word">
            <td>{{ word }}</td><td>{{ count }}</td>
          </tr>
        </tbody>
      </n-table>
    </c-card>
  </div>
</template>

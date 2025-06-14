<script setup lang="ts">
import cards from '@younestouati/playing-cards-standard-deck';
import { exhaustiveUniqueRandom } from 'unique-random';
import { computedRefreshable } from '@/composable/computedRefreshable';
import { useCopy } from '@/composable/copy';
import { useQueryParamOrStorage } from '@/composable/queryParams';

const { t } = useI18n();

const cardKeys = [...Object.keys(cards).filter(k => k !== 'joker'), 'joker', 'joker'];
type CardNames = keyof typeof cards;

const numberOfCards = useQueryParamOrStorage({ name: 'cards', storageName: 'card-picker:n', defaultValue: 5 });
const numberOfPacks = useQueryParamOrStorage({ name: 'packs', storageName: 'card-picker:p', defaultValue: 1 });
const useJokers = useQueryParamOrStorage({ name: 'jokers', storageName: 'card-picker:j', defaultValue: true });
const [cardPicked, refreshCardPicked] = computedRefreshable(() => {
  let cardNumbers: number[] = [];
  for (let pack = 0; pack < numberOfPacks.value; pack++) {
    cardNumbers = [...cardNumbers, ...Array.from({ length: useJokers.value ? 54 : 52 }, (_, num) => num)];
  }

  const random = exhaustiveUniqueRandom(0, cardNumbers.length - 1);
  return Array.from({ length: numberOfCards.value }, () => cardKeys[cardNumbers[random()]]);
});
const maxCards = computed(() => (useJokers.value ? 54 : 52) * numberOfPacks.value);

function translateName(cardId: string): string {
  if (cardId === 'joker') {
    return t('tools.card-picker.joker');
  }
  const match = /(\d+)([cdhs])/.exec(cardId);
  if (!match) {
    return cardId;
  }
  const [, numberStr, suitChar] = match;
  const number = Number.parseInt(numberStr, 10);

  let numberName: string;
  switch (number) {
    case 1:
      numberName = t('tools.card-picker.numbers.ace');
      break;
    case 11:
      numberName = t('tools.card-picker.numbers.jack');
      break;
    case 12:
      numberName = t('tools.card-picker.numbers.queen');
      break;
    case 13:
      numberName = t('tools.card-picker.numbers.king');
      break;
    default:
      numberName = numberStr;
      break;
  }

  let suitName: string;
  switch (suitChar) {
    case 'c':
      suitName = t('tools.card-picker.suits.clubs');
      break;
    case 'd':
      suitName = t('tools.card-picker.suits.diamonds');
      break;
    case 'h':
      suitName = t('tools.card-picker.suits.hearts');
      break;
    case 's':
      suitName = t('tools.card-picker.suits.spades');
      break;
    default:
      suitName = suitChar;
      break;
  }

  return `${numberName} ${t('tools.card-picker.of')} ${suitName}`;
}

const cardPickedString = computed(() => cardPicked.value.map(translateName).join(', '));

const { copy } = useCopy({ source: cardPickedString, text: () => t('tools.card-picker.cardsPickedCopied') });
</script>

<template>
  <c-card>
    <n-space justify="space-around" mb-1>
      <img v-for="(card, index) in cardPicked" :key="index" style="width:90px" mr-1 :src="`data:image/svg+xml;base64,${cards[card as CardNames]}`">
    </n-space>
    <div mb-2>
      <textarea-copyable :value="cardPickedString" readonly mb-1 />
    </div>
    <div flex justify-center gap-3>
      <n-form-item :label="t('tools.card-picker.numberOfCardsLabel')" label-placement="left">
        <n-input-number v-model:value="numberOfCards" min="1" :max="maxCards" :placeholder="t('tools.card-picker.numberOfCardsPlaceholder')" />
      </n-form-item>
      <n-form-item :label="t('tools.card-picker.numberOfPacksLabel')" label-placement="left">
        <n-input-number v-model:value="numberOfPacks" min="1" :placeholder="t('tools.card-picker.numberOfPacksPlaceholder')" />
      </n-form-item>
    </div>
    <div mb-4 flex justify-center>
      <n-checkbox v-model:checked="useJokers">
        {{ t('tools.card-picker.useJokersLabel') }}
      </n-checkbox>
    </div>
    <div flex justify-center gap-3>
      <c-button @click="copy()">
        {{ t('tools.card-picker.copyDeckButton') }}
      </c-button>
      <c-button @click="refreshCardPicked">
        {{ t('tools.card-picker.refreshDeckButton') }}
      </c-button>
    </div>
  </c-card>
</template>

<script setup lang="ts">
import { generateSillyPassword } from 'silly-password-generator';
import { useCopy } from '@/composable/copy';
import { useQueryParamOrStorage } from '@/composable/queryParams';
import { computedRefreshable } from '@/composable/computedRefreshable';
import { randIntFromInterval } from '@/utils/random';

const { t } = useI18n();

const count = useQueryParamOrStorage({ name: 'count', storageName: 'pass-generator:count', defaultValue: 1 });
const words = useQueryParamOrStorage({ name: 'words', storageName: 'pass-generator:words', defaultValue: 5 });
const numbers = useQueryParamOrStorage({ name: 'nums', storageName: 'pass-generator:nums', defaultValue: 0 });
const capitalize = useQueryParamOrStorage({ name: 'capitalize', storageName: 'pass-generator:capitalize', defaultValue: false });
const saltChars = useQueryParamOrStorage({ name: 'salt', storageName: 'pass-generator:salt', defaultValue: '' });
const separator = useQueryParamOrStorage({ name: 'sep', storageName: 'pass-generator:sep', defaultValue: '-' });
const maxLen = useQueryParamOrStorage({ name: 'maxlen', storageName: 'pass-generator:maxlen', defaultValue: 100 });

const [passphrases, refreshPassphrases] = computedRefreshable(
  () => Array.from({ length: count.value },
    () => {
      const requiredNumbers = Math.min(words.value, numbers.value);
      const nums: number[] = [];
      if (words.value === requiredNumbers) {
        for (let i = 0; i < requiredNumbers; i++) {
          nums.push(i);
        }
      }
      else {
        while (nums.length < requiredNumbers) {
          const rndNumber = randIntFromInterval(0, words.value - 1);
          if (!nums.includes(rndNumber)) {
            nums.push(rndNumber);
          }
        }
      }

      let maxIter = 10;
      while (maxIter > 0) {
        const passphrase = generateSillyPassword({
          capitalize: capitalize.value,
          wordCount: words.value,
          salt: saltChars.value,
        }).split(/\s+/g).map((word, i) => {
          if (nums.includes(i)) {
            return word + randIntFromInterval(1, 100);
          }
          return word;
        }).join(separator.value);
        if (passphrase.length < maxLen.value) {
          return passphrase;
        }
        maxIter -= 1;
      }
      return `# Cannot generate a passphrase of max ${maxLen.value} characters`;
    }).join('\n'),
);

const { copy } = useCopy({ source: passphrases, text: 'Passphrase(s) copied to clipboard!' });
</script>

<template>
  <div>
    <c-card>
      <n-space>
        <n-form-item :label="t('tools.passphrase-generator.words', { n: words })" label-placement="left">
          <n-slider v-model:value="words" :step="1" :min="1" :max="512" mr-2 />
          <n-input-number v-model:value="words" size="small" />
        </n-form-item>
        <n-form-item :label="t('tools.passphrase-generator.add-numbers')" label-placement="left">
          <n-slider v-model:value="numbers" :step="1" :min="1" :max="words" mr-2 />
          <n-input-number v-model:value="numbers" :max="words" size="small" />
        </n-form-item>
      </n-space>

      <n-space>
        <n-form-item :label="t('tools.passphrase-generator.max-len')" label-placement="left">
          <n-input-number v-model:value="maxLen" size="small" />
        </n-form-item>

        <n-form-item :label="t('tools.passphrase-generator.capitalize')" label-placement="left">
          <n-switch v-model:value="capitalize" />
        </n-form-item>
        <n-form-item :label="t('tools.passphrase-generator.separator')" label-placement="left">
          <c-input-text
            v-model:value="separator"
            :placeholder="t('tools.passphrase-generator.separator-placeholder')"
          />
        </n-form-item>
      </n-space>

      <n-form-item :label="t('tools.passphrase-generator.salt')" label-placement="left">
        <c-input-text
          v-model:value="saltChars"
          :placeholder="t('tools.passphrase-generator.salt-placeholder')"
        />
      </n-form-item>

      <n-form-item :label="t('tools.passphrase-generator.count')" label-placement="left">
        <n-input-number v-model:value="count" size="small" />
      </n-form-item>

      <c-input-text
        v-model:value="passphrases"
        multiline
        :placeholder="t('tools.passphrase-generator.passphrase-placeholder')"
        readonly
        rows="3"
        autosize
        class="passphrase-display"
        word-wrap
      />

      <div mt-5 flex justify-center gap-3>
        <c-button @click="copy()">
          {{ t('tools.passphrase-generator.copy') }}
        </c-button>
        <c-button @click="refreshPassphrases">
          {{ t('tools.passphrase-generator.refresh') }}
        </c-button>
      </div>
    </c-card>
  </div>
</template>

<style scoped lang="less">
::v-deep(.passphrase-display) {
  textarea {
    text-align: center;
  }
}
</style>

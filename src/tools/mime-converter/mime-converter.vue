<script setup lang="ts">
import libmime from 'libmime';
import TextareaCopyable from '@/components/TextareaCopyable.vue';
import { withDefaultOnError } from '@/utils/defaults';

const { t } = useI18n();

const encodedInput = ref('');
const decodedOutput = computed(() => withDefaultOnError(() => libmime.decodeWords(encodedInput.value), t('tools.mime-converter.invalid-encoded-value')));

const rawInput = ref('');
const encodedQOutput = computed(() => withDefaultOnError(() => libmime.encodeWord(rawInput.value, 'Q'), ''));
const encodedBOutput = computed(() => withDefaultOnError(() => libmime.encodeWord(rawInput.value, 'B'), ''));
</script>

<template>
  <div>
    <c-card :title="t('tools.mime-converter.encode-string-in-encoded-word-format')">
      <c-input-text
        v-model:value="rawInput"
        multiline
        :placeholder="t('tools.mime-converter.put-your-string-here')"
        rows="5"
        :label="t('tools.mime-converter.string-to-encode')"
        raw-text
        mb-5
      />

      <div>
        <h3>{{ t('tools.mime-converter.quoted-printable-encoded-string') }}</h3>
        <TextareaCopyable
          :value="encodedQOutput"
          :placeholder="t('tools.mime-converter.quoted-printable-encoded-version-placeholder')"
          mb-5
        />
      </div>

      <div>
        <h3>{{ t('tools.mime-converter.base64-encoded-string') }}</h3>
        <TextareaCopyable
          :value="encodedBOutput"
          :placeholder="t('tools.mime-converter.base64-encoded-version-placeholder')"
          mb-5
        />
      </div>
    </c-card>

    <c-card :title="t('tools.mime-converter.decode-string-in-encoded-word-format')">
      <c-input-text
        v-model:value="encodedInput"
        multiline
        :placeholder="t('tools.mime-converter.your-encoded-string')"
        rows="5"
        :label="t('tools.mime-converter.encoded-string-to-decode')"
        mb-5
      />

      <div>
        <h3>{{ t('tools.mime-converter.decoded-string') }}</h3>
        <TextareaCopyable
          v-model:value="decodedOutput"
          :placeholder="t('tools.mime-converter.decoded-string-placeholder')"
          mb-5
        />
      </div>
    </c-card>
  </div>
</template>

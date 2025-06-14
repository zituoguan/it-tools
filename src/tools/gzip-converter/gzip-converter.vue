<script setup lang="ts">
import * as fflate from 'fflate';
import { Base64 } from 'js-base64';
import TextareaCopyable from '@/components/TextareaCopyable.vue';
import { withDefaultOnError } from '@/utils/defaults';

const { t } = useI18n();

const compressedInput = ref('');
const decompressedOutput = computed(() => withDefaultOnError(() => {
  const compressedBuf = Base64.toUint8Array(compressedInput.value);
  return fflate.strFromU8(fflate.decompressSync(compressedBuf));
}, t('tools.gzip-converter.invalidCompressed')));

const rawInput = ref('');
const compressedGzipOutput = computed(() => withDefaultOnError(() => Base64.fromUint8Array(fflate.gzipSync(fflate.strToU8(rawInput.value))), ''));
const compressedDeflateOutput = computed(() => withDefaultOnError(() => Base64.fromUint8Array(fflate.deflateSync(fflate.strToU8(rawInput.value))), ''));
const compressedZlibOutput = computed(() => withDefaultOnError(() => Base64.fromUint8Array(fflate.zlibSync(fflate.strToU8(rawInput.value))), ''));
</script>

<template>
  <div>
    <c-card :title="t('tools.gzip-converter.compressString')" mb-5>
      <c-input-text
        v-model:value="rawInput"
        multiline
        :placeholder="t('tools.gzip-converter.inputPlaceholder')"
        rows="5"
        :label="t('tools.gzip-converter.stringToCompress')"
        raw-text
        mb-5
      />

      <div>
        <h3>{{ t('tools.gzip-converter.gzipCompressed') }}</h3>
        <TextareaCopyable
          :value="compressedGzipOutput"
          :word-wrap="true"
          multiline
          :placeholder="t('tools.gzip-converter.gzipPlaceholder')"
          mb-5
        />
      </div>

      <div>
        <h3>{{ t('tools.gzip-converter.zlibCompressed') }}</h3>
        <TextareaCopyable
          :value="compressedZlibOutput"
          :word-wrap="true"
          multiline
          :placeholder="t('tools.gzip-converter.zlibPlaceholder')"
          mb-5
        />
      </div>

      <div>
        <h3>{{ t('tools.gzip-converter.deflateCompressed') }}</h3>
        <TextareaCopyable
          :value="compressedDeflateOutput"
          :word-wrap="true"
          multiline
          :placeholder="t('tools.gzip-converter.deflatePlaceholder')"
          mb-5
        />
      </div>
    </c-card>

    <c-card :title="t('tools.gzip-converter.decompressString')">
      <c-input-text
        v-model:value="compressedInput"
        multiline
        :placeholder="t('tools.gzip-converter.compressedPlaceholder')"
        rows="5"
        :label="t('tools.gzip-converter.compressedToDecompress')"
        mb-5
      />

      <div>
        <h3>{{ t('tools.gzip-converter.decompressedString') }}</h3>
        <TextareaCopyable
          v-model:value="decompressedOutput"
          :word-wrap="true"
          multiline
          :placeholder="t('tools.gzip-converter.decompressedPlaceholder')"
          mb-5
        />
      </div>
    </c-card>
  </div>
</template>

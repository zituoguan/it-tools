<script setup lang="ts">
import { withDefaultOnError } from '../../utils/defaults';
import {
  getTocMarkdown,
} from './markdown-toc-generator.service';
import { useQueryParamOrStorage } from '@/composable/queryParams';

const { t } = useI18n();

const markdown = ref(t('tools.markdown-toc-generator.sample-markdown'));
const generateAnchors = useQueryParamOrStorage({ name: 'anchors', storageName: 'md-toc-gen:anchors', defaultValue: true });
const indentChars = useQueryParamOrStorage({ name: 'bullets', storageName: 'md-toc-gen:bullets', defaultValue: '-*+' });
const indentSpaces = ref(3);
const maxLevel = useQueryParamOrStorage({ name: 'max', storageName: 'md-toc-gen:max', defaultValue: -1 });
const anchorPrefix = useQueryParamOrStorage({ name: 'prefix', storageName: 'md-toc-gen:prefix', defaultValue: '' });
const concatSpaces = useQueryParamOrStorage({ name: 'concat', storageName: 'md-toc-gen:concat', defaultValue: false });
const commentStyle = useQueryParamOrStorage({ name: 'comment', storageName: 'md-toc-gen:comment', defaultValue: 'html' });

const markdownWithTOC = computed(() => withDefaultOnError(() => {
  return getTocMarkdown({
    markdown: markdown.value,
    anchorPrefix: anchorPrefix.value,
    commentStyle: commentStyle.value as ('html' | 'liquid'),
    concatSpaces: concatSpaces.value,
    generateAnchors: generateAnchors.value,
    indentChars: indentChars.value,
    indentSpaces: indentSpaces.value,
    maxLevel: maxLevel.value,
  });
}, ''));
</script>

<template>
  <div>
    <c-card :title="t('tools.markdown-toc-generator.options')" mb-2>
      <n-space>
        <n-form-item label-placement="left">
          <n-checkbox v-model:checked="generateAnchors">
            {{ t('tools.markdown-toc-generator.generate-anchors') }}
          </n-checkbox>
        </n-form-item>
        <n-form-item :label="t('tools.markdown-toc-generator.max-heading-level')" label-placement="left">
          <n-input-number
            v-model:value="maxLevel"
            :placeholder="t('tools.markdown-toc-generator.max-heading-level-placeholder')"
            :max="6" :min="-1"
          />
        </n-form-item>
      </n-space>

      <details>
        <summary>{{ t('tools.markdown-toc-generator.advanced') }}</summary>
        <n-space>
          <n-form-item label-placement="left">
            <n-checkbox v-model:checked="concatSpaces">
              {{ t('tools.markdown-toc-generator.concat-spaces') }}
            </n-checkbox>
          </n-form-item>
          <c-input-text
            v-model:value="indentChars"
            :label="t('tools.markdown-toc-generator.bullet-chars')"
            label-position="left"
            :placeholder="t('tools.markdown-toc-generator.bullet-chars-placeholder')"
          />
          <c-input-text
            v-model:value="anchorPrefix"
            :label="t('tools.markdown-toc-generator.anchors-prefix')"
            label-position="left"
            :placeholder="t('tools.markdown-toc-generator.anchors-prefix-placeholder')"
          />
          <n-form-item :label="t('tools.markdown-toc-generator.indents')" label-placement="left">
            <n-input-number
              v-model:value="indentSpaces"
              :placeholder="t('tools.markdown-toc-generator.indents-placeholder')"
              :max="10" :min="1"
            />
          </n-form-item>
          <c-select
            v-model:value="commentStyle"
            :label="t('tools.markdown-toc-generator.comment-styles')"
            label-position="left"
            :options="['html', 'liquid']"
            :placeholder="t('tools.markdown-toc-generator.comment-styles-placeholder')"
          />
        </n-space>
      </details>
    </c-card>

    <c-card :title="t('tools.markdown-toc-generator.input-markdown')" mb-2>
      <n-p>{{ t('tools.markdown-toc-generator.input-description') }} <code>[TOC]</code> {{ t('tools.markdown-toc-generator.input-description-suffix') }}</n-p>
      <c-input-text
        v-model:value="markdown"
        :placeholder="t('tools.markdown-toc-generator.input-placeholder')"
        multiline
        rows="8"
      />
    </c-card>

    <c-card :title="t('tools.markdown-toc-generator.output-markdown')" mb-2>
      <textarea-copyable
        language="markdown"
        :value="markdownWithTOC"
      />
    </c-card>
  </div>
</template>

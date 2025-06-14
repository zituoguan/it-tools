import type { OGSchemaType } from '../OGSchemaType.type';
import { translate } from '@/plugins/i18n.plugin';

export const article: OGSchemaType = {
  name: translate('tools.meta-tag-generator.article'),
  elements: [
    {
      type: 'input',
      label: translate('tools.meta-tag-generator.publishing-date'),
      key: 'article:published_time',
      placeholder: translate('tools.meta-tag-generator.when-article-was-first-published'),
    },
    {
      type: 'input',
      label: translate('tools.meta-tag-generator.modification-date'),
      key: 'article:modified_time',
      placeholder: translate('tools.meta-tag-generator.when-article-was-last-changed'),
    },
    {
      type: 'input',
      label: translate('tools.meta-tag-generator.expiration-date'),
      key: 'article:expiration_time',
      placeholder: translate('tools.meta-tag-generator.when-article-is-out-of-date-after'),
    },
    { type: 'input', label: translate('tools.meta-tag-generator.author'), key: 'article:author', placeholder: translate('tools.meta-tag-generator.writers-of-the-article') },
    {
      type: 'input',
      label: translate('tools.meta-tag-generator.section'),
      key: 'article:section',
      placeholder: translate('tools.meta-tag-generator.high-level-section-name'),
    },
    { type: 'input', label: translate('tools.meta-tag-generator.tag'), key: 'article:tag', placeholder: translate('tools.meta-tag-generator.tag-words-associated-with-article') },
  ],
};

import type { OGSchemaType } from '../OGSchemaType.type';
import { translate } from '@/plugins/i18n.plugin';

export const twitter: OGSchemaType = {
  name: 'Twitter',
  elements: [
    {
      type: 'select',
      options: [
        { label: translate('tools.meta-tag-generator.summary'), value: 'summary' },
        { label: translate('tools.meta-tag-generator.summary-with-large-image'), value: 'summary_large_image' },
        { label: translate('tools.meta-tag-generator.application'), value: 'app' },
        { label: translate('tools.meta-tag-generator.player'), value: 'player' },
      ],
      label: translate('tools.meta-tag-generator.card-type'),
      placeholder: translate('tools.meta-tag-generator.twitter-card-type'),
      key: 'twitter:card',
    },
    {
      type: 'input',
      label: translate('tools.meta-tag-generator.site-account'),
      placeholder: translate('tools.meta-tag-generator.name-of-twitter-account-of-site'),
      key: 'twitter:site',
    },
    {
      type: 'input',
      label: translate('tools.meta-tag-generator.creator-account'),
      placeholder: translate('tools.meta-tag-generator.name-of-twitter-account-of-creator'),
      key: 'twitter:creator',
    },
  ],
};

import type { OGSchemaType } from '../OGSchemaType.type';
import { translate } from '@/plugins/i18n.plugin';

export const image: OGSchemaType = {
  name: translate('tools.meta-tag-generator.image'),
  elements: [
    {
      type: 'input',
      label: translate('tools.meta-tag-generator.image-url'),
      placeholder: translate('tools.meta-tag-generator.url-of-website-social-image'),
      key: 'image',
    },
    {
      type: 'input',
      label: translate('tools.meta-tag-generator.image-alt'),
      placeholder: translate('tools.meta-tag-generator.alternative-text-of-website-social-image'),
      key: 'image:alt',
    },
    {
      type: 'input',
      label: translate('tools.meta-tag-generator.width'),
      placeholder: translate('tools.meta-tag-generator.width-in-px-of-website-social-image'),
      key: 'image:width',
    },
    {
      type: 'input',
      label: translate('tools.meta-tag-generator.height'),
      placeholder: translate('tools.meta-tag-generator.height-in-px-of-website-social-image'),
      key: 'image:height',
    },
  ],
};

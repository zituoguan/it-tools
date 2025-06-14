import type { OGSchemaType } from '../OGSchemaType.type';
import { translate } from '@/plugins/i18n.plugin';

export const profile: OGSchemaType = {
  name: translate('tools.meta-tag-generator.profile'),
  elements: [
    {
      type: 'input',
      label: translate('tools.meta-tag-generator.first-name'),
      placeholder: translate('tools.meta-tag-generator.enter-first-name-of-person'),
      key: 'profile:first_name',
    },
    {
      type: 'input',
      label: translate('tools.meta-tag-generator.last-name'),
      placeholder: translate('tools.meta-tag-generator.enter-last-name-of-person'),
      key: 'profile:last_name',
    },
    { type: 'input', label: translate('tools.meta-tag-generator.username'), placeholder: translate('tools.meta-tag-generator.enter-username-of-person'), key: 'profile:username' },
    { type: 'input', label: translate('tools.meta-tag-generator.gender'), placeholder: translate('tools.meta-tag-generator.enter-gender-of-person'), key: 'profile:gender' },
  ],
};

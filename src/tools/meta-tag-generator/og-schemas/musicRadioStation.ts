import type { OGSchemaType } from '../OGSchemaType.type';
import { translate } from '@/plugins/i18n.plugin';

export const musicRadioStation: OGSchemaType = {
  name: translate('tools.meta-tag-generator.radio-station-details'),
  elements: [
    { type: 'input', label: translate('tools.meta-tag-generator.creator'), key: 'music:creator', placeholder: translate('tools.meta-tag-generator.creator-of-this-radio-station') },
  ],
};

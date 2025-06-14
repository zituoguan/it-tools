import type { OGSchemaType } from '../OGSchemaType.type';
import { videoMovie } from './videoMovie';
import { translate } from '@/plugins/i18n.plugin';

export const videoOther: OGSchemaType = {
  name: translate('tools.meta-tag-generator.other-video-details'),
  elements: [...videoMovie.elements],
};

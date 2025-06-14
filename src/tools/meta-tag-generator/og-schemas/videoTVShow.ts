import type { OGSchemaType } from '../OGSchemaType.type';
import { videoMovie } from './videoMovie';
import { translate } from '@/plugins/i18n.plugin';

export const videoTVShow: OGSchemaType = {
  name: translate('tools.meta-tag-generator.tv-show-details'),
  elements: [...videoMovie.elements],
};

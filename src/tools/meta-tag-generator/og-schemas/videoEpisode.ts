import type { OGSchemaType } from '../OGSchemaType.type';
import { videoMovie } from './videoMovie';
import { translate } from '@/plugins/i18n.plugin';

export const videoEpisode: OGSchemaType = {
  name: translate('tools.meta-tag-generator.video-episode-details'),
  elements: [
    ...videoMovie.elements,
    { type: 'input', label: translate('tools.meta-tag-generator.series'), key: 'video:series', placeholder: translate('tools.meta-tag-generator.which-series-this-episode-belongs-to') },
  ],
};

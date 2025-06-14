import type { OGSchemaType } from '../OGSchemaType.type';
import { translate } from '@/plugins/i18n.plugin';

export const musicPlaylist: OGSchemaType = {
  name: translate('tools.meta-tag-generator.playlist-details'),
  elements: [
    { type: 'input', label: translate('tools.meta-tag-generator.song'), key: 'music:song', placeholder: translate('tools.meta-tag-generator.song-on-this-album') },
    {
      type: 'input',
      label: translate('tools.meta-tag-generator.disc'),
      key: 'music:song:disc',
      placeholder: translate('tools.meta-tag-generator.same-as-music-album-disc-but-in-reverse'),
    },
    {
      type: 'input',
      label: translate('tools.meta-tag-generator.track'),
      key: 'music:song:track',
      placeholder: translate('tools.meta-tag-generator.same-as-music-album-track-but-in-reverse'),
    },
    { type: 'input', label: translate('tools.meta-tag-generator.creator'), key: 'music:creator', placeholder: translate('tools.meta-tag-generator.creator-of-this-playlist') },
  ],
};

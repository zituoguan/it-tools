import type { OGSchemaType } from '../OGSchemaType.type';
import { translate } from '@/plugins/i18n.plugin';

export const musicAlbum: OGSchemaType = {
  name: translate('tools.meta-tag-generator.album-details'),
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
    { type: 'input', label: translate('tools.meta-tag-generator.musician'), key: 'music:musician', placeholder: translate('tools.meta-tag-generator.musician-that-made-this-song') },
    {
      type: 'input',
      label: translate('tools.meta-tag-generator.release-date'),
      key: 'music:release_date',
      placeholder: translate('tools.meta-tag-generator.date-the-album-was-released'),
    },
  ],
};

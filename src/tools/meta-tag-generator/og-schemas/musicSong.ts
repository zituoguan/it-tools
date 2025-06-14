import type { OGSchemaType } from '../OGSchemaType.type';
import { translate } from '@/plugins/i18n.plugin';

export const musicSong: OGSchemaType = {
  name: translate('tools.meta-tag-generator.song-details'),
  elements: [
    { type: 'input', label: translate('tools.meta-tag-generator.duration'), placeholder: translate('tools.meta-tag-generator.duration-of-the-song'), key: 'music:duration' },
    { type: 'input', label: translate('tools.meta-tag-generator.album'), placeholder: translate('tools.meta-tag-generator.album-this-song-is-from'), key: 'music:album' },
    {
      type: 'input',
      label: translate('tools.meta-tag-generator.disc'),
      placeholder: translate('tools.meta-tag-generator.which-disc-of-album-this-song-is-on'),
      key: 'music:album:disk',
    },
    { type: 'input', label: translate('tools.meta-tag-generator.track'), placeholder: translate('tools.meta-tag-generator.which-track-this-song-is'), key: 'music:album:track' },
    {
      type: 'input-multiple',
      label: translate('tools.meta-tag-generator.musician'),
      placeholder: translate('tools.meta-tag-generator.musician-that-made-this-song'),
      key: 'music:musician',
    },
  ],
};

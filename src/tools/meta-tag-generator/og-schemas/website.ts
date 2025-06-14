import type { OGSchemaType } from '../OGSchemaType.type';
import { translate } from '@/plugins/i18n.plugin';

const typeOptions = [
  { label: translate('tools.meta-tag-generator.website'), value: 'website' },
  { label: translate('tools.meta-tag-generator.article'), value: 'article' },
  { label: translate('tools.meta-tag-generator.book'), value: 'book' },
  { label: translate('tools.meta-tag-generator.profile'), value: 'profile' },
  {
    type: 'group',
    label: translate('tools.meta-tag-generator.music'),
    key: 'Music',
    children: [
      { label: translate('tools.meta-tag-generator.song'), value: 'music.song' },
      { label: translate('tools.meta-tag-generator.music-album'), value: 'music.album' },
      { label: translate('tools.meta-tag-generator.playlist'), value: 'music.playlist' },
      { label: translate('tools.meta-tag-generator.radio-station'), value: 'music.radio_station' },
    ],
  },
  {
    type: 'group',
    label: translate('tools.meta-tag-generator.video'),
    key: 'Video',
    children: [
      { label: translate('tools.meta-tag-generator.movie'), value: 'video.movie' },
      { label: translate('tools.meta-tag-generator.episode'), value: 'video.episode' },
      { label: translate('tools.meta-tag-generator.tv-show'), value: 'video.tv_show' },
      { label: translate('tools.meta-tag-generator.other-video'), value: 'video.other' },
    ],
  },
];

export const website: OGSchemaType = {
  name: translate('tools.meta-tag-generator.general-information'),
  elements: [
    {
      type: 'select',
      label: translate('tools.meta-tag-generator.page-type'),
      placeholder: translate('tools.meta-tag-generator.select-type-of-website'),
      key: 'type',
      options: typeOptions,
    },
    { type: 'input', label: translate('tools.meta-tag-generator.title'), placeholder: translate('tools.meta-tag-generator.enter-title-of-website'), key: 'title' },
    {
      type: 'input',
      label: translate('tools.meta-tag-generator.description'),
      placeholder: translate('tools.meta-tag-generator.enter-description-of-website'),
      key: 'description',
    },
    {
      type: 'input',
      label: translate('tools.meta-tag-generator.page-url'),
      placeholder: translate('tools.meta-tag-generator.enter-url-of-website'),
      key: 'url',
    },
  ],
};

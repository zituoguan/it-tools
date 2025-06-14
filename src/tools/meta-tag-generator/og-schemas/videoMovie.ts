import type { OGSchemaType } from '../OGSchemaType.type';
import { translate } from '@/plugins/i18n.plugin';

export const videoMovie: OGSchemaType = {
  name: translate('tools.meta-tag-generator.movie-details'),
  elements: [
    {
      type: 'input-multiple',
      label: translate('tools.meta-tag-generator.actor'),
      key: 'video:actor',
      placeholder: translate('tools.meta-tag-generator.name-of-actress-actor'),
    },
    // { type: 'input', label: 'Actor role', key: 'video:actor:role', placeholder: 'The role they played...' },
    {
      type: 'input-multiple',
      label: translate('tools.meta-tag-generator.director'),
      key: 'video:director',
      placeholder: translate('tools.meta-tag-generator.name-of-the-director'),
    },
    { type: 'input-multiple', label: translate('tools.meta-tag-generator.writer'), key: 'video:writer', placeholder: translate('tools.meta-tag-generator.writers-of-the-movie') },
    { type: 'input', label: translate('tools.meta-tag-generator.duration'), key: 'video:duration', placeholder: translate('tools.meta-tag-generator.movie-length-in-seconds') },
    {
      type: 'input',
      label: translate('tools.meta-tag-generator.release-date'),
      key: 'video:release_date',
      placeholder: translate('tools.meta-tag-generator.date-the-movie-was-released'),
    },
    { type: 'input', label: translate('tools.meta-tag-generator.tag'), key: 'video:tag', placeholder: translate('tools.meta-tag-generator.tag-words-associated-with-movie') },
  ],
};

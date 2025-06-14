import type { OGSchemaType } from '../OGSchemaType.type';
import { translate } from '@/plugins/i18n.plugin';

export const book: OGSchemaType = {
  name: translate('tools.meta-tag-generator.book'),
  elements: [
    { type: 'input', label: translate('tools.meta-tag-generator.author'), key: 'book:author', placeholder: translate('tools.meta-tag-generator.who-wrote-this-book') },
    { type: 'input', label: translate('tools.meta-tag-generator.isbn'), key: 'book:isbn', placeholder: translate('tools.meta-tag-generator.international-standard-book-number') },
    {
      type: 'input',
      label: translate('tools.meta-tag-generator.release-date'),
      key: 'book:release_date',
      placeholder: translate('tools.meta-tag-generator.date-the-book-was-released'),
    },
    { type: 'input', label: translate('tools.meta-tag-generator.tag'), key: 'book:tag', placeholder: translate('tools.meta-tag-generator.tag-words-associated-with-book') },
  ],
};

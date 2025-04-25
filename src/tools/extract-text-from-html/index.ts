import { CursorText } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.extract-text-from-html.title'),
  path: '/extract-text-from-html',
  description: translate('tools.extract-text-from-html.description'),
  keywords: ['extract', 'text', 'from', 'html'],
  component: () => import('./extract-text-from-html.vue'),
  icon: CursorText,
  createdAt: new Date('2024-05-10'),
  category: 'Text',
});

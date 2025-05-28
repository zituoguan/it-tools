import { FileText } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Distinct Words',
  path: '/distinct-words',
  description: 'Extract and count occurences of each unique word in a text',
  keywords: ['distinct', 'words'],
  component: () => import('./distinct-words.vue'),
  icon: FileText,
  createdAt: new Date('2025-05-01'),
  category: 'Text',
});

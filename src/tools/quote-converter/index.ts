import { Quote } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Quote Converter',
  path: '/quote-converter',
  description: 'Convert quoted string from/to \' and "',
  keywords: ['quote', 'converter'],
  component: () => import('./quote-converter.vue'),
  icon: Quote,
  createdAt: new Date('2025-05-01'),
  category: 'Development',
});

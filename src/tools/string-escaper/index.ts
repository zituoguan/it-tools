import { Code } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'String Escaper',
  path: '/string-escaper',
  description: 'Escape string to code language version',
  keywords: ['string', 'code', 'escaper'],
  component: () => import('./string-escaper.vue'),
  icon: Code,
  createdAt: new Date('2024-08-15'),
  category: 'Development',
});

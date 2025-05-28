import { Braces } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Json to PHP Code',
  path: '/json-to-php',
  description: 'Generate PHP Classes from JSON',
  keywords: ['json', 'php'],
  component: () => import('./json-to-php.vue'),
  icon: Braces,
  createdAt: new Date('2025-04-21'),
  category: 'JSON',
});

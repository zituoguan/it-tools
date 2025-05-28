import { Cookie } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Cookies Parser',
  path: '/cookies-parser',
  description: 'Parse Cookie HTTP Header',
  keywords: ['cookies', 'parser'],
  component: () => import('./cookies-parser.vue'),
  icon: Cookie,
  createdAt: new Date('2025-05-01'),
  category: 'Forensic',
});

import { World } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'SPF DNS generator',
  path: '/spf-dns-generator',
  description: 'Generate SPF DNS TXT record',
  keywords: ['spf', 'dns'],
  component: () => import('./spf-dns-generator.vue'),
  icon: World,
  createdAt: new Date('2025-04-21'),
  category: 'Network',
});

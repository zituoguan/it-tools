import { World } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'DKIM DNS Generator',
  path: '/dkim-dns-generator',
  description: 'Generate DKIM DNS TXT record',
  keywords: ['dkim', 'dns'],
  component: () => import('./dkim-dns-generator.vue'),
  icon: World,
  createdAt: new Date('2025-04-21'),
  category: 'Network',
});

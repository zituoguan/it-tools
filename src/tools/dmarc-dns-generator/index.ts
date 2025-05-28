import { World } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'DMARC DNS Generator',
  path: '/dmarc-dns-generator',
  description: 'Generate DMARC DNS TXT record',
  keywords: ['dmarc', 'dns'],
  component: () => import('./dmarc-dns-generator.vue'),
  icon: World,
  createdAt: new Date('2025-04-21'),
  category: 'Network',
});

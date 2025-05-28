import { World } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'BIMI DNS Generator',
  path: '/bimi-dns-generator',
  description: 'Generate BIMI DNS TXT record',
  keywords: ['bimi', 'dns', 'txt'],
  component: () => import('./bimi-dns-generator.vue'),
  icon: World,
  createdAt: new Date('2025-04-21'),
  category: 'Network',
});

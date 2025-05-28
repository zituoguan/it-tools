import { Eyeglass } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'TCPDump Generator',
  path: '/tcpdump-generator',
  description: 'Generate tcpdump command line',
  keywords: ['tcpdump', 'generator'],
  component: () => import('./tcpdump-generator.vue'),
  icon: Eyeglass,
  createdAt: new Date('2025-04-21'),
  category: 'Forensic',
});

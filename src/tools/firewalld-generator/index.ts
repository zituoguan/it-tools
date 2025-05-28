import { Firetruck } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'FW command line generator',
  path: '/firewalld-generator',
  description: 'Generate fw command lines',
  keywords: ['firewalld', 'fw'],
  component: () => import('./firewalld-generator.vue'),
  icon: Firetruck,
  createdAt: new Date('2025-04-21'),
  category: 'Network',
});

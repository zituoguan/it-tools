import { Firetruck } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Iptables Generator',
  path: '/iptables-generator',
  description: 'Generate iptables command lines',
  keywords: ['iptables', 'firewall'],
  component: () => import('./iptables-generator.vue'),
  icon: Firetruck,
  createdAt: new Date('2025-04-21'),
  category: 'Network',
});

import { DeviceFloppy } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'FStab Generator',
  path: '/fstab-generator',
  description: 'Generate /etc/fstab line',
  keywords: ['fstab', 'etc'],
  component: () => import('./fstab-generator.vue'),
  icon: DeviceFloppy,
  createdAt: new Date('2025-04-21'),
  category: 'Network',
});

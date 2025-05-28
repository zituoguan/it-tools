import { TransferIn } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Rsync Generator',
  path: '/rsync-generator',
  description: 'Rsync command generator',
  keywords: ['rsync'],
  component: () => import('./rsync-generator.vue'),
  icon: TransferIn,
  createdAt: new Date('2024-04-20'),
  category: 'Network',
});

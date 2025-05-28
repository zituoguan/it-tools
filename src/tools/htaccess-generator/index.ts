import { ShieldLock } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'HTAccess generator',
  path: '/htaccess-generator',
  description: 'Generate .htaccess file',
  keywords: ['htaccess'],
  component: () => import('./htaccess-generator.vue'),
  icon: ShieldLock,
  createdAt: new Date('2025-04-21'),
  category: 'Network',
});

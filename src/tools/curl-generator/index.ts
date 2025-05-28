import { Download } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Curl Command Generator',
  path: '/curl-generator',
  description: 'Generate CURL command lines',
  keywords: ['curl'],
  component: () => import('./curl-generator.vue'),
  icon: Download,
  createdAt: new Date('2025-04-21'),
  category: 'Network',
});

import { FileImport } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Pdf Concatener',
  path: '/pdf-concat',
  description: 'Concatenate PDF into a single one',
  keywords: ['pdf', 'concat'],
  component: () => import('./pdf-concat.vue'),
  icon: FileImport,
  createdAt: new Date('2025-03-09'),
  category: 'PDF',
});

import { FileExport } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Pdf Page Extractor',
  path: '/pdf-extract',
  description: 'Extract pages range from a PDF',
  keywords: ['pdf', 'page', 'extract'],
  component: () => import('./pdf-extract.vue'),
  icon: FileExport,
  createdAt: new Date('2025-03-09'),
  category: 'PDF',
});

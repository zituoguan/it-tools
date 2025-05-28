import { BrandPython } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Json to Python',
  path: '/json-to-python',
  description: 'Convert JSON to Python classes',
  keywords: ['json', 'to', 'python'],
  component: () => import('./json-to-python.vue'),
  icon: BrandPython,
  createdAt: new Date('2025-03-09'),
  category: 'JSON',
});

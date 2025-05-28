import { BrandJavascript } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Json to Typescript',
  path: '/json-to-typescript',
  description: 'Convert JSON to Typescript code',
  keywords: ['json', 'typescript'],
  component: () => import('./json-to-typescript.vue'),
  icon: BrandJavascript,
  createdAt: new Date('2025-05-01'),
  category: 'Development',
});

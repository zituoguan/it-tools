import { AlignJustified } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Properties converter',
  path: '/properties-converter',
  redirectFrom: ['/properties-to-yaml'],
  description: 'Convert Java .properties file from/to YAML',
  keywords: ['properties', 'yaml', 'convert', 'spring', 'spring-boot', 'parse', 'ini'],
  component: () => import('./properties-converter.vue'),
  icon: AlignJustified,
  createdAt: new Date('2025-04-21'),
  category: 'Converters',
});

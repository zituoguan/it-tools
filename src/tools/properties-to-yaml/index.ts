import { AlignJustified } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.properties-to-yaml.title'),
  path: '/properties-to-yaml',
  description: translate('tools.properties-to-yaml.description'),
  keywords: ['properties', 'yaml', 'convert', 'spring', 'spring-boot', 'parse'],
  component: () => import('./properties-to-yaml.vue'),
  icon: AlignJustified,
  createdAt: new Date('2023-12-24'),
  category: 'Converters',
});

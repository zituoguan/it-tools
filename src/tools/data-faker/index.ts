import { ArrowsShuffle } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Data Faker',
  path: '/data-faker',
  description: 'Generate fake data using JSON template',
  keywords: ['data', 'json', 'sample', 'faker'],
  component: () => import('./data-faker.vue'),
  icon: ArrowsShuffle,
  createdAt: new Date('2025-05-01'),
  category: 'Development',
});

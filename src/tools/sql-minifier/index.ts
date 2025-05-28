import { Database } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'SQL Minifier',
  path: '/sql-minifier',
  description: 'Minify SQL queries',
  keywords: ['sql', 'query', 'minifier'],
  component: () => import('./sql-minifier.vue'),
  icon: Database,
  createdAt: new Date('2025-05-01'),
  category: 'Development',
});

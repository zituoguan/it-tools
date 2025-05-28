import { DatabaseExport } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Json to SQL INSERT',
  path: '/json-to-sql-insert',
  description: 'Convert JSON array to INSERT INTO',
  keywords: ['json', 'sql', 'insert'],
  component: () => import('./json-to-sql-insert.vue'),
  icon: DatabaseExport,
  createdAt: new Date('2025-05-01'),
  category: 'Development',
});

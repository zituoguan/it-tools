import { Database } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Json to SQL DDL',
  path: '/json-to-sql-ddl',
  description: 'JSON to SQL CREATE TABLE',
  keywords: ['json', 'sql', 'ddl', 'create', 'table'],
  component: () => import('./json-to-sql-ddl.vue'),
  icon: Database,
  createdAt: new Date('2025-03-09'),
  category: 'JSON',
});

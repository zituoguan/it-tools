import { TableExport } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Excel to data',
  path: '/excel-to-data',
  description: 'Convert XLSX file to JSON, YAML, CSV, SQL INSERT, XML or Markdown',
  keywords: ['excel', 'csv', 'xlsx', 'sql', 'json', 'yaml', 'insert', 'markdown', 'md', 'tsv', 'xml'],
  component: () => import('./excel-to-data.vue'),
  icon: TableExport,
  createdAt: new Date('2024-12-25'),
  category: 'Converters',
});

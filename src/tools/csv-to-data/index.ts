import { TableExport } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Csv to Data',
  path: '/csv-to-data',
  description: 'Convert CSV file to JSON, YAML, CSV, SQL INSERT, XML or Markdown',
  keywords: ['excel', 'csv', 'xlsx', 'sql', 'json', 'yaml', 'insert', 'markdown', 'md', 'tsv', 'xml'],
  component: () => import('./csv-to-data.vue'),
  icon: TableExport,
  createdAt: new Date('2025-05-01'),
  redirectFrom: ['/csv-to-json'],
  category: 'Converters',
});

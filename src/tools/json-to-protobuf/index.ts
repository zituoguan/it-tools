import { DatabaseExport } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Json to Protobuf',
  path: '/json-to-protobuf',
  description: 'Generate Protobuf declaration from JSON objects',
  keywords: ['json', 'protobuf'],
  component: () => import('./json-to-protobuf.vue'),
  icon: DatabaseExport,
  createdAt: new Date('2025-01-01'),
  category: 'Development',
});

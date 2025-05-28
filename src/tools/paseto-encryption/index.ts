import { Key } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Paseto/PASERK Local',
  path: '/paseto-encryption',
  description: 'Generate local keys and encrypt/decrypt payloads',
  keywords: ['paseto', 'encryption', 'paserk', 'payload'],
  component: () => import('./paseto-encryption.vue'),
  icon: Key,
  createdAt: new Date('2025-04-21'),
  category: 'Crypto',
});

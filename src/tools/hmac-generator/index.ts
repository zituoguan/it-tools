import { Lock } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.hmac-generator.title'),
  path: '/hmac-generator',
  description: translate('tools.hmac-generator.description'),
  keywords: ['hmac', 'generator', 'md5', 'sha1', 'sha256', 'sha512'],
  component: () => import('./hmac-generator.vue'),
  icon: Lock,
  category: 'Crypto',
});

import { GitCommit } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Git Semantic Commit Cheatsheet',
  path: '/git-semantic-commit-memo',
  description: 'Cheatsheet for committing using semantic prefixes',
  keywords: ['git', 'semantic', 'commit', 'cheatsheet'],
  component: () => import('./git-semantic-commit-memo.vue'),
  icon: GitCommit,
  createdAt: new Date('2025-05-01'),
  category: 'Cheatsheets',
});

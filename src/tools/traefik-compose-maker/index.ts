import { NetworkCheckSharp } from '@vicons/material';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Traefik Docker Compose Maker',
  path: '/traefik-compose-maker',
  description: 'Create a docker compose with Traefik labels ready for a given service and options',
  keywords: ['traefik', 'docker', 'compose'],
  component: () => import('./traefik-compose-maker.vue'),
  icon: NetworkCheckSharp,
  createdAt: new Date('2024-03-30'),
  category: 'Docker',
});

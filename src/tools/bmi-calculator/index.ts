import { MedicalCross } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'BMI Calculator',
  path: '/bmi-calculator',
  description: 'Body Mass Index Calculator (us or metric units)',
  keywords: ['bmi', 'body', 'mass'],
  component: () => import('./bmi-calculator.vue'),
  icon: MedicalCross,
  createdAt: new Date('2025-04-21'),
  category: 'Data',
});

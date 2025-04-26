import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createHead } from '@vueuse/head';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { install as VueMonacoEditorPlugin, loader } from '@guolao/vue-monaco-editor';
import * as monaco from 'monaco-editor';

import { registerSW } from 'virtual:pwa-register';
import shadow from 'vue-shadow-dom';
import { createGtm } from '@gtm-support/vue-gtm';
import { plausible } from './plugins/plausible.plugin';

import 'virtual:uno.css';

import { naive } from './plugins/naive.plugin';

import App from './App.vue';
import router from './router';
import { i18nPlugin } from './plugins/i18n.plugin';

import store from './tools/pomodoro-timer/app/store';

library.add(fas);

// loaded monaco-editor from `node_modules`
loader.config({ monaco });

registerSW();

const app = createApp(App);

app.use(VueMonacoEditorPlugin);
app.use(createPinia());
app.use(createHead());
app.use(i18nPlugin);
app.use(router);
app.use(naive);
app.use(plausible);
app.use(shadow);
app.use(store, 'pomodoro-store');
app.use(
  createGtm({
    id: 'GTM-NKCLH9MX',
    vueRouter: router,
    enabled: true,
    debug: false,
  }),
);

app.mount('#app');

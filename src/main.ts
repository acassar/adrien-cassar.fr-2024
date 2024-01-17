import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';

import App from './App.vue';
import router from './router';

import fr from './assets/i18n/fr.json';
import en from './assets/i18n/en.json';

const messages = {
	en: en,
	fr: fr
};

const i18n = createI18n({
	legacy: false, // you must set `false`, to use Composition API
	locale: 'fr', // set locale
	fallbackLocale: 'en', // set fallback locale
	messages, // set locale messages
});

const app = createApp(App);

app.use(createPinia());
app.use(i18n);
app.use(router);

app.mount('#app');

import { init, register } from 'svelte-i18n';

const defaultLocale = 'fr';

register('fr', () => import('./locales/fr.json'));

init({
	fallbackLocale: defaultLocale,
	initialLocale: defaultLocale
});

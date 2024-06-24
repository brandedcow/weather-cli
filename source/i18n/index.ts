import i18next from 'i18next';

import enTranslation from './en/translation.json' assert {type: 'json'};
import zhTranslation from './zh/translation.json' assert {type: 'json'};

i18next.init({
	lng: 'en',
	resources: {
		en: {translation: enTranslation},
		zh: {translation: zhTranslation},
	},
});

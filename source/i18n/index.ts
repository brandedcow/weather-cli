import {init} from 'i18next';
import enTranslation from './en/translation.json' assert {type: 'json'};
import zhTranslation from './zh/translation.json' assert {type: 'json'};

void init({
	lng: 'en',
	resources: {
		en: {translation: enTranslation},
		zh: {translation: zhTranslation},
	},
});

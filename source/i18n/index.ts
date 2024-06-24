import i18next from 'i18next';

i18next.init({
	lng: 'en',
	resources: {
		en: {
			translation: {
				at: {
					title_text: 'Weather At',
					city_input_query: 'Search by City Name: ',
				},
			},
		},
		de: {
			translation: {
				at: {
					title_text: 'Wetter bei',
					city_input_query: 'Buscar por nombre de ciudad',
				},
			},
		},
	},
});

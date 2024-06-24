import React, {useEffect, useState} from 'react';
import {Box, Text} from 'ink';
import zod from 'zod';
import _ from 'lodash';
import {TextInput} from '@inkjs/ui';
import {argument, option} from 'pastel';
import i18next, {t} from 'i18next';
import {config} from '../config.js';
import '../i18n/index.js';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {CitySelect} from '../components/CitySelect.js';
import {useWeatherStore} from '../store/useWeatherStore.js';
import {WeatherReport} from '../components/WeatherReport.js';

const queryClient = new QueryClient();

export const args = zod
	.array(zod.string())
	.optional()
	.describe(
		argument({
			name: 'City name',
			description: 'Input after command is read city name, can include spaces.',
		}),
	);

export const options = zod.object({
	locale: zod
		.string()
		.describe(
			option({
				description: 'Set locale',
				alias: 'l',
			}),
		)
		.optional(),
});

type Props = {
	args: zod.infer<typeof args>;
	options: zod.infer<typeof options>;
};

export default function Index({args, options}: Props) {
	return (
		<QueryClientProvider client={queryClient}>
			<IndexComponent args={args} options={options} />
		</QueryClientProvider>
	);
}

function IndexComponent({args, options}: Props) {
	const [cityName, setCityName] = useState<string>(args?.join(' ') ?? '');
	const {selectedCity, setSelectedCity} = useWeatherStore();

	const handleChange = (value: string) => {
		setSelectedCity(JSON.parse(value));
	};

	useEffect(() => {
		if (options.locale) config.set('locale', options.locale);
		const storedLocale = config.get('locale');
		if (storedLocale) i18next.changeLanguage(storedLocale);
	});

	return (
		<Box flexDirection="column" gap={1} margin={1}>
			<Box rowGap={1}>
				<Text color="green">{t('index.city_name_input_label')} </Text>
				<TextInput
					defaultValue={cityName}
					onChange={_.debounce(setCityName, 1000)}
				/>
			</Box>
			<CitySelect cityName={cityName} onChange={handleChange} />
			{selectedCity && <WeatherReport city={selectedCity} />}
		</Box>
	);
}

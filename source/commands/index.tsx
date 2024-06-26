import React, {useEffect, useState} from 'react';
import {Box, Text} from 'ink';
import zod from 'zod';
import _ from 'lodash';
import {TextInput} from '@inkjs/ui';
import {argument, option} from 'pastel';
import {changeLanguage, t} from 'i18next';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {config} from '../config.js';
import {CitySelect} from '../components/CitySelect.js';
import {useWeatherStore} from '../store/useWeatherStore.js';
import {WeatherReport} from '../components/WeatherReport.js';
import '../i18n/index.js'; // eslint-disable-line import/no-unassigned-import

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
	readonly args: zod.infer<typeof args>;
	readonly options: zod.infer<typeof options>;
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
		setSelectedCity(JSON.parse(value) as GeocodeData);
	};

	useEffect(() => {
		if (options.locale) config.set('locale', options.locale);
		const storedLocale = config.get('locale');
		if (storedLocale) void changeLanguage(storedLocale);
	}, [options.locale]);

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

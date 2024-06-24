import React, {useEffect, useState} from 'react';
import {Box, Text} from 'ink';
import zod from 'zod';
import _ from 'lodash';
import {Select, TextInput} from '@inkjs/ui';
import {WeatherReport} from '../components/WeatherReport.js';
import {argument, option} from 'pastel';
import {API} from '../api/openweather.js';
import i18next, {t} from 'i18next';
import {config} from '../config.js';
import '../i18n/index.js';

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
	const [query, setQuery] = useState<string>(args?.join(' ') ?? '');
	const [cities, setCities] = useState<GeocodeData[]>([]);
	const [selectedIndex, setSelectedIndex] = useState<number>(0);
	const [weatherData, setWeatherData] = useState<OneCallResponse | null>(null);

	useEffect(() => {
		if (options.locale) {
			config.set('locale', options.locale);
		}

		if (config.get('locale')) {
			i18next.changeLanguage(config.get('locale'));
		}
	}, []);

	useEffect(() => {
		const fetchCities = async (query: string) => {
			if (!query) return;
			try {
				const response = await API.geocode(query);
				setCities(response);
			} catch (error) {}
		};

		fetchCities(query);
	}, [query]);

	useEffect(() => {
		const fetchWeatherData = _.debounce(async (lat: number, lon: number) => {
			try {
				const response = await API.onecall(lat, lon);
				setWeatherData(response);
			} catch (error) {}
		}, 1000);

		if (cities.length > 0) {
			const selectedCity = cities[selectedIndex];
			if (selectedCity) {
				const {lat, lon} = selectedCity;
				fetchWeatherData(lat, lon);
			}
		}
	}, [cities, selectedIndex]);

	const selectedCity = cities[selectedIndex];

	return (
		<Box flexDirection="column" gap={1} margin={1}>
			<Box rowGap={1}>
				<Text color="green">{t('at.city_input_query')} </Text>
				<TextInput defaultValue={query} onChange={_.debounce(setQuery, 1000)} />
			</Box>

			<Select
				options={cities.map((city, index) => ({
					label:
						`${city.name}, ` +
						(city.state ? city.state + ', ' : '') +
						city.country,
					value: index.toString(),
				}))}
				onChange={_.debounce()}
			/>

			<WeatherReport place={selectedCity} data={weatherData?.current} />
		</Box>
	);
}

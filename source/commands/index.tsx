import React, {useEffect, useState} from 'react';
import {Box} from 'ink';
import zod from 'zod';
import _ from 'lodash';
import {API} from '../api/openweather.js';
import {Select, TextInput} from '@inkjs/ui';
import {WeatherReport} from '../components/WeatherReport.js';

export const args = zod.array(zod.string());

export const options = zod.object({
	locale: zod.string().optional(),
});

type Props = {
	args: zod.infer<typeof args>;
	options: zod.infer<typeof options>;
};

export default function Index({args}: Props) {
	const [query, setQuery] = useState<string>(args.join(' '));
	const [cities, setCities] = useState<GeocodeData[]>([]);
	const [selectedIndex, setSelectedIndex] = useState<number>(0);
	const [weatherData, setWeatherData] = useState<OneCallResponse | null>(null);

	useEffect(() => {
		const fetchCities = _.debounce(async query => {
			try {
				const response = await API.geocode(query);
				setCities(response);
			} catch (error) {}
		}, 500);

		fetchCities(query);
	}, [query]);

	useEffect(() => {
		const fetchWeatherData = _.debounce(async (lat: number, lon: number) => {
			try {
				const response = await API.onecall(lat, lon);
				setWeatherData(response);
			} catch (error) {}
		});

		if (cities.length > 0) {
			const selectedCity = cities[selectedIndex];
			if (selectedCity) {
				const {lat, lon} = selectedCity;
				fetchWeatherData(lat, lon);
			}
		}
	}, [cities]);

	const handleInput = async (input: string) => {
		setQuery(input);
	};

	const selectedCity = cities[selectedIndex];

	return (
		<Box flexDirection="column" gap={1}>
			<WeatherReport place={selectedCity} data={weatherData?.current} />

			<TextInput defaultValue={query} onChange={handleInput} />
			<Select
				options={cities.map((city, index) => ({
					label:
						`${city.name}, ` +
						(city.state ? city.state + ', ' : '') +
						city.country,
					value: index.toString(),
				}))}
				onChange={newValue => setSelectedIndex(Number(newValue))}
			/>
		</Box>
	);
}

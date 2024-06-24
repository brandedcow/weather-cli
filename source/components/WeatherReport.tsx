import React, {useEffect} from 'react';
import {format} from 'date-fns';
import {Box, Text} from 'ink';
import {t} from 'i18next';
import {Error} from './Error.js';
import {useQuery} from '@tanstack/react-query';
import {API} from '../api/openweather.js';
import {Spinner} from '@inkjs/ui';

type Props = {
	city: GeocodeData;
};

export function WeatherReport({city}: Props) {
	const {lat, lon, name, country, state} = city;
	const {
		isPending,
		data: weatherData,
		error,
		refetch,
	} = useQuery({
		queryKey: ['weatherData', lat, lon],
		queryFn: () => API.onecall(lat, lon),
	});

	useEffect(() => {
		const fetchInterval = setInterval(() => {
			refetch();
		}, 60000);

		return () => {
			clearInterval(fetchInterval);
		};
	});

	if (error || !weatherData) {
		return <Error message="No Weather Data" />;
	}

	if (isPending) {
		return <Spinner />;
	}

	const {current} = weatherData;

	return (
		<Box
			flexDirection="column"
			paddingX={2}
			paddingY={1}
			borderStyle="doubleSingle"
			borderColor="cyan"
			gap={1}
		>
			<Text>{t('weather_report.title')}</Text>
			<Box flexDirection="column">
				<Text>{`${name}, ` + (state ? state + ', ' : '') + country}</Text>
				<Text>Time: ({format(new Date(current.dt * 1000), 'P | p')})</Text>
			</Box>
			<Box flexDirection="column">
				{current.weather.length > 0 && (
					<Text>
						{current.weather[0]?.main}: {current.weather[0]?.description}
					</Text>
				)}
				<Text>Sunrise: {format(new Date(current.sunrise * 1000), 'p')}</Text>
				<Text>Sunset: {format(new Date(current.sunset * 1000), 'p')}</Text>
			</Box>

			<Box flexDirection="column">
				<Text>
					Temperature: {current.temp} F (feels like {current.feels_like} F)
				</Text>
				<Text>Humidity: {current.humidity}%</Text>
				<Text>Wind: {current.wind_speed} mph</Text>
			</Box>

			<Box flexDirection="column">
				<Text></Text>
			</Box>
		</Box>
	);
}

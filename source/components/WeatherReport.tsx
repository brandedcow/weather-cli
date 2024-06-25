import React, {useEffect} from 'react';
import {format} from 'date-fns';
import {Box, Text} from 'ink';
import {Error} from './Error.js';
import {useQuery} from '@tanstack/react-query';
import {API} from '../api/openweather.js';
import {Spinner} from '@inkjs/ui';
import {config} from '../config.js';
import {t} from 'i18next';

type Props = {
	city: GeocodeData;
};

export function WeatherReport({city}: Props) {
	const {lat, lon, name, country, state, local_names} = city;
	const {
		isPending,
		data: weatherData,
		error,
		refetch,
	} = useQuery({
		queryKey: ['weatherData', lat, lon],
		queryFn: () => API.onecall(lat, lon),
	});

	const currentLocale = config.get('locale');

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
			<Text>{t('weather_report.Title')}</Text>
			<Box flexDirection="column">
				<Text>
					{`${local_names[currentLocale] ? local_names[currentLocale] : name}`}
				</Text>
				<Text>{`${(state ? state + ', ' : '') + country}`}</Text>
				<Text>
					{t('weather_report.Time')}: (
					{format(new Date(current.dt * 1000), 'P | p')})
				</Text>
			</Box>
			<Box flexDirection="column">
				{current.weather.length > 0 && (
					<Text>
						{current.weather[0]?.main}: {current.weather[0]?.description}
					</Text>
				)}
				<Text>
					{t('weather_report.Sunrise')}:{' '}
					{format(new Date(current.sunrise * 1000), 'p')}
				</Text>
				<Text>
					{t('weather_report.Sunset')}:{' '}
					{format(new Date(current.sunset * 1000), 'p')}
				</Text>
			</Box>

			<Box flexDirection="column">
				<Text>
					{t('weather_report.Temperature')}: {current.temp} F (feels like{' '}
					{current.feels_like} F)
				</Text>
				<Text>
					{t('weather_report.Humidity')}: {current.humidity}%
				</Text>
				<Text>
					{t('weather_report.Wind')}: {current.wind_speed} mph
				</Text>
			</Box>
		</Box>
	);
}

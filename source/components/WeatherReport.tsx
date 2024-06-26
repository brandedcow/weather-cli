import React, {useEffect} from 'react';
import {format} from 'date-fns';
import {Box, Text} from 'ink';
import {useQuery} from '@tanstack/react-query';
import {Spinner} from '@inkjs/ui';
import {t} from 'i18next';
import {API} from '../api/openweather.js';
import {config} from '../config.js';
import {Error} from './Error.js';
import {CurrentWeather} from './CurrentWeather.js';
import {PrecipitationForecast} from './PrecipitationForecast.js';
import {TemperatureForecast} from './TemperatureForecast.js';
import {WeekForecast} from './WeekForecast.js';

type Props = {
	readonly city: GeocodeData;
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
		queryFn: async () => API.onecall(lat, lon),
	});

	const currentLocale = config.get('locale');
	const localName = local_names ? local_names[currentLocale] : name;

	useEffect(() => {
		const fetchInterval = setInterval(async () => {
			console.log('refetching');
			await refetch();
		}, 900_000);

		return () => {
			clearInterval(fetchInterval);
		};
	}, [refetch]);

	if (error ?? !weatherData) {
		return <Error message="No Weather Data" />;
	}

	if (isPending) {
		return <Spinner />;
	}

	const {current, minutely, hourly, daily} = weatherData;

	return (
		<Box
			flexDirection="column"
			paddingX={2}
			paddingY={1}
			borderStyle="doubleSingle"
			borderColor="cyan"
			gap={1}
		>
			<Box flexDirection="column">
				<Text>
					{t('weather_report.Title')}{' '}
					{format(new Date(current.dt * 1000), 'P, p')}
				</Text>
			</Box>

			<Box flexDirection="column">
				<Text>{localName}</Text>
				<Text>{`${(state ? state + ', ' : '') + country}`}</Text>
			</Box>
			<CurrentWeather data={current} />
			<PrecipitationForecast data={minutely} />
			<TemperatureForecast data={hourly} />
			<WeekForecast data={daily} />
		</Box>
	);
}

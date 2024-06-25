import React, {useEffect} from 'react';
import {format} from 'date-fns';
import {Box, Text} from 'ink';
import {Error} from './Error.js';
import {useQuery} from '@tanstack/react-query';
import {API} from '../api/openweather.js';
import {Spinner} from '@inkjs/ui';
import {config} from '../config.js';
import {t} from 'i18next';
import {CurrentWeather} from './CurrentWeather.js';
import {PrecipitationForecast} from './PrecipitationForecast.js';
import {TemperatureForecast} from './TemperatureForecast.js';
import {WeekForecast} from './WeekForecast.js';

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
			<Text>
				{t('weather_report.Title')}{' '}
				{format(new Date(current.dt * 1000), 'P, p')}
			</Text>
			<Box flexDirection="column">
				<Text>
					{`${
						local_names && local_names[currentLocale]
							? local_names[currentLocale]
							: name
					}`}
				</Text>
				<Text>{`${(state ? state + ', ' : '') + country}`}</Text>
			</Box>
			<CurrentWeather data={current} />
			<PrecipitationForecast data={minutely} />
			<TemperatureForecast data={hourly} />
			<WeekForecast data={daily} />
		</Box>
	);
}

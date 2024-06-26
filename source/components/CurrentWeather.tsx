import React from 'react';
import {Box, Text} from 'ink';
import {format} from 'date-fns';
import {t} from 'i18next';

type Props = {
	readonly data: OneCallResponse['current'];
};

export function CurrentWeather({data}: Props) {
	return (
		<Box flexDirection="column" gap={1}>
			<Box flexDirection="column">
				{data.weather.length > 0 && (
					<Text>
						{data.weather[0]?.main}: {data.weather[0]?.description}
					</Text>
				)}
				<Text>
					{t('weather_report.Sunrise')}:{' '}
					{format(new Date(data.sunrise * 1000), 'p')}
				</Text>
				<Text>
					{t('weather_report.Sunset')}:{' '}
					{format(new Date(data.sunset * 1000), 'p')}
				</Text>
			</Box>

			<Box flexDirection="column">
				<Text>
					{t('weather_report.Temperature')}: {data.temp} F (feels like{' '}
					{data.feels_like} F)
				</Text>
				<Text>
					{t('weather_report.Humidity')}: {data.humidity}%
				</Text>
				<Text>
					{t('weather_report.Wind')}: {data.wind_speed} mph
				</Text>
			</Box>
		</Box>
	);
}

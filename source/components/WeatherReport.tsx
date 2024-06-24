import React from 'react';
import {format} from 'date-fns';
import {Box, Text} from 'ink';
import {t} from 'i18next';

export function WeatherReport({
	place,
	data,
}: {
	place?: GeocodeData;
	data?: OneCallResponse['current'];
}) {
	if (!data) return null;

	return (
		<Box
			flexDirection="column"
			paddingX={2}
			paddingY={1}
			borderStyle="doubleSingle"
			borderColor="cyan"
			gap={1}
		>
			<Text>{t('at.title_text')}</Text>
			<Box flexDirection="column">
				{place && (
					<Text>
						{`${place.name}, ` +
							(place.state ? place.state + ', ' : '') +
							place.country}
					</Text>
				)}
				<Text>Time: ({format(new Date(data.dt * 1000), 'P | p')})</Text>
			</Box>
			<Box flexDirection="column">
				{data.weather.length > 0 && (
					<Text>
						{data.weather[0]?.main}: {data.weather[0]?.description}
					</Text>
				)}
				<Text>Sunrise: {format(new Date(data.sunrise * 1000), 'p')}</Text>
				<Text>Sunset: {format(new Date(data.sunset * 1000), 'p')}</Text>
			</Box>

			<Box flexDirection="column">
				<Text>
					Temperature: {data.temp} F (feels like {data.feels_like} F)
				</Text>
				<Text>Humidity: {data.humidity}%</Text>
				<Text>Wind: {data.wind_speed} mph</Text>
			</Box>

			<Box flexDirection="column">
				<Text></Text>
			</Box>
		</Box>
	);
}

WeatherReport.Current = () => {};

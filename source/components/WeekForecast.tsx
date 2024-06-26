import React from 'react';
import {Box} from 'ink';
import {DailyForecastCard} from './DailyForecastCard.js';

type Props = {
	readonly data: OneCallResponse['daily'];
};

export function WeekForecast({data}: Props) {
	return (
		<Box>
			{data.map(({dt, temp}) => (
				<DailyForecastCard key={dt} time={dt} min={temp.min} max={temp.max} />
			))}
		</Box>
	);
}

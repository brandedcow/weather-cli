import React from 'react';
import {Box, Text} from 'ink';
import asciichart from 'asciichart';

type Props = {
	readonly data?: OneCallHourlyData[] | undefined;
};

export function TemperatureForecast({data}: Props) {
	if (!data) return null;

	return (
		<Box flexDirection="column" gap={1}>
			<Text>Temperature Forecast 24H</Text>
			<Text>
				{asciichart.plot(
					data.slice(0, 24).map(({temp}) => temp),
					{height: 5, padding: ''},
				)}
			</Text>
		</Box>
	);
}

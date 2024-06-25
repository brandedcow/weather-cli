import React from 'react';
import asciichart from 'asciichart';
import {Box, Text} from 'ink';

type Props = {
	data?: {dt: number; precipitation: number}[] | null;
};
export function PrecipitationForecast({data}: Props) {
	if (!data) return null;

	return (
		<Box flexDirection="column" gap={1}>
			<Text>Precipitation Forecast 1H (mm/h)</Text>
			<Text>
				{asciichart.plot(
					data.map(({precipitation}) => precipitation),
					{height: 4, padding: ''},
				)}
			</Text>
		</Box>
	);
}

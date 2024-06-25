import React from 'react';
import asciichart from 'asciichart';
import {Box, Text} from 'ink';

type Props = {
	data: {dt: number; precipitation: number}[];
};
export function PrecipitationForecast({data}: Props) {
	return (
		<Box flexDirection="column" gap={1}>
			<Text>Precipitation Forecast (mm/1h)</Text>
			<Text>
				{asciichart.plot(
					data.map(({precipitation}) => precipitation),
					{height: 4, padding: ''},
				)}
			</Text>
		</Box>
	);
}

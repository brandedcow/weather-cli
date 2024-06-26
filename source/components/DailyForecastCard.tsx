import React from 'react';
import {Box, Text} from 'ink';
import {format} from 'date-fns';

type Props = {
	readonly time: number;
	readonly min: number;
	readonly max: number;
};
export function DailyForecastCard({time, min, max}: Props) {
	return (
		<Box
			flexDirection="column"
			paddingX={1}
			gap={1}
			borderStyle="single"
			borderColor="gray"
		>
			<Text>{format(new Date(time * 1000), 'eee')}</Text>
			<Text bold color="red">
				{max}
			</Text>
			<Text color="blue">{min}</Text>
		</Box>
	);
}

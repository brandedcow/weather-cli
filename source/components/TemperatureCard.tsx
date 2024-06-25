import React from 'react';
import {Box, Text} from 'ink';

type Props = {
	time: number;
	temp: number;
};
export function TemperatureCard({time, temp}: Props) {
	return (
		<Box flexDirection="column" gap={1}>
			<Text>{time}</Text>
			<Text>{temp}</Text>
		</Box>
	);
}

import React from 'react';
import {Box, Text} from 'ink';

type Props = {
	message?: string;
};

export function Error({message}: Props) {
	return (
		<Box borderStyle="classic" borderColor="red" paddingX={1}>
			<Text>{message || 'Something went wrong'}</Text>
		</Box>
	);
}

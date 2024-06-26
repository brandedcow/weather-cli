import React from 'react';
import chalk from 'chalk';
import test from 'ava';
import {render} from 'ink-testing-library';
import Index from './source/commands/index.js';

test('no input', t => {
	const {lastFrame} = render(<Index args={[]} options={{locale: 'en'}} />);

	t.is(lastFrame(), `Hello, ${chalk.green('Jane')}`);
});

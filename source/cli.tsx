#!/usr/bin/env node --no-warnings=ExperimentalWarning
import Pastel from 'pastel';

const app = new Pastel({
	importMeta: import.meta,
	name: 'weather',
});

await app.run();

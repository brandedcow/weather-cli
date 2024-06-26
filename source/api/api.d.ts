type GeocodeData = {
	country: string;
	lat: number;
	local_names: Record<string, string>;
	lon: number;
	name: string;
	state: string;
};

type GeocodeResponse = GeocodeData[];

type OneCallHourlyData = {
	dt: number;
	temp: number;
	feels_like: number;
	pressure: number;
	humidity: number;
	dew_point: number;
	uvi: number;
	clouds: number;
	visibility: number;
	wind_speed: number;
	wind_deg: number;
	pop: number;
};

type OneCallDailyData = {
	dt: number;
	sunrise: number;
	sunset: number;
	moonrise: number;
	moonset: number;
	moon_phase: number;
	summary: string;
	temp: {
		day: number;
		min: number;
		max: number;
		night: number;
		eve: number;
		morn: number;
	};
	feels_like: {
		day: number;
		night: number;
		eve: number;
		morn: number;
	};
	pressure: number;
	humidity: number;
	dew_point: number;
	wind_speed: number;
	wind_deg: number;
	wind_gust: number;
	weather: [
		{
			id: number;
			main: string;
			description: string;
			icon: string;
		},
	];
	clouds: number;
	pop: number;
	rain: number;
	uvi: number;
};

type OneCallResponse = {
	current: {
		clouds: number;
		dew_point: number;
		dt: number;
		feels_like: number;
		humidity: number;
		pressure: number;
		sunrise: number;
		sunset: number;
		temp: number;
		uvi: number;
		visibility: number;
		weather: Array<{id: string; main: string; description: string; icon: string}>;
		wind_deg: number;
		wind_speed: number;
	};
	daily: OneCallDailyData[];
	hourly: OneCallHourlyData[];
	lat: number;
	lon: number;
	minutely: Array<{
		dt: number;
		precipitation: number;
	}>;
	timezone: string;
	timezone_offset: number;
};

type DirectGeocodeOptions = {
	limit?: number;
	q: [string, string?, string?];
};

type OnecallOptions = {
	exclude?: ['current'?, 'minutely'?, 'hourly'?, 'daily'?, 'alert'?];
	lang?: string;
	lat: number;
	lon: number;
	units?: 'imperial' | 'metric' | 'standard';
};

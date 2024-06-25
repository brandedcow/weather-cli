type GeocodeData = {
	country: string;
	lat: number;
	local_names: {
		[key: string]: string;
	};
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
		weather: {id: string; main: string; description: string; icon: string}[];
		wind_deg: number;
		wind_speed: number;
	};
	hourly: OneCallHourlyData[];
	lat: number;
	lon: number;
	minutely: {
		dt: number;
		precipitation: number;
	}[];
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

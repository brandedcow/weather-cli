import axios from 'axios';
import {config} from '../config.js';

const DATA_URL = 'https://api.openweathermap.org/data/3.0';
const GEO_URL = 'http://api.openweathermap.org/geo/1.0';
const API_KEY = '90ecbbe36f8ee323755abec04af5189e';

export class OpenWeather {
	private readonly apiKey: string;

	constructor(key: string) {
		this.apiKey = key;
	}

	async geocode(cityName: string, stateCode?: string, countryCode?: string) {
		if (!cityName) return [];

		const requestString = await this._generateRequestURL<DirectGeocodeOptions>(
			GEO_URL,
			'direct',
			{
				limit: 10,
				q: [cityName, stateCode, countryCode],
			},
		);

		try {
			const response = await axios.get<GeocodeResponse>(requestString);

			return response.data;
		} catch (error) {
			console.log({error});
			throw new Error('Geocode API Request error');
		}
	}

	async onecall(
		lat?: number,
		lon?: number,
		parts?: OnecallOptions['exclude'],
	): Promise<OneCallResponse | undefined> {
		if (!lat || !lon) {
			return;
		}

		try {
			const requestString = await this._generateRequestURL<OnecallOptions>(
				DATA_URL,
				'onecall',
				{
					exclude: parts,
					lat,
					lon,
					units: 'imperial',
					lang: config.get('locale'),
				},
			);

			const response = await axios.get<OneCallResponse>(requestString);
			return response.data;
		} catch (error) {
			console.error(error);
			throw new Error('Onecall API Request error');
		}
	}

	private async _generateRequestURL<T extends Record<string, unknown>>(
		base: string,
		endpoint: string,
		options: T,
	) {
		let requestString = `${base}/${endpoint}`;

		if (Object.keys(options).length > 0) {
			requestString += `?`;
		}

		for (const property in options) {
			if (
				typeof options[property] === 'string' ||
				typeof options[property] === 'number'
			) {
				requestString += `${property}=${options[property]}&`;
			} else if (Array.isArray(options[property])) {
				let propertyString = `${property}=`;
				for (const subString of options[property] as string[]) {
					if (subString) {
						propertyString += `${subString},`;
					}
				}

				propertyString = propertyString.slice(0, -1);

				requestString += propertyString;
			}
		}

		requestString += `&appid=${this.apiKey}`;
		return requestString;
	}
}

export const API = new OpenWeather(API_KEY);

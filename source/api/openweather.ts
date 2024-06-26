import process from 'node:process';
import axios from 'axios';
import {config} from '../config.js';

export class OpenWeather {
	private readonly apiKey: string;
	private readonly geoURL: string;
	private readonly dataURL: string;

	constructor(key?: string, geoURL?: string, dataURL?: string) {
		if (!key || !geoURL || !dataURL) {
			throw new Error('Missing env vars');
		}

		this.apiKey = key;
		this.geoURL = geoURL;
		this.dataURL = dataURL;
	}

	async geocode(cityName: string, stateCode?: string, countryCode?: string) {
		if (!cityName) return [];

		const requestString = await this._generateRequestURL<DirectGeocodeOptions>(
			this.geoURL,
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
				this.dataURL,
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

const {DATA_URL, GEO_URL, API_KEY} = process.env;

export const API = new OpenWeather(API_KEY, GEO_URL, DATA_URL);

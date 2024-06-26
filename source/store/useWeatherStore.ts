import {create} from 'zustand';

type WeatherStore = {
	selectedCity: GeocodeData | undefined;
	data: OneCallResponse | undefined;
	setSelectedCity: (city: GeocodeData) => void;
	setData: (data: OneCallResponse) => void;
};

export const useWeatherStore = create<WeatherStore>(set => ({
	selectedCity: undefined,
	data: undefined,
	setSelectedCity(selectedCity) {
		set(state => ({...state, selectedCity}));
	},
	setData(data) {
		set(state => ({...state, data}));
	},
}));

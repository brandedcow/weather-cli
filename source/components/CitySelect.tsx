import React from 'react';
import {Select, Spinner} from '@inkjs/ui';
import {useQuery} from '@tanstack/react-query';
import _ from 'lodash';
import {API} from '../api/openweather.js';
import {Error} from './Error.js';

type Props = {
	readonly cityName: string;
	readonly onChange: (newValue: string) => void;
};
export function CitySelect({cityName, onChange}: Props) {
	const {
		status,
		data: cities,
		error,
	} = useQuery({
		queryKey: ['cities', cityName],
		queryFn: async () => API.geocode(cityName),
	});

	if (error) {
		return <Error />;
	}

	if (status === 'pending') {
		return <Spinner />;
	}

	return (
		<Select
			options={cities.map(city => ({
				label:
					`${city.name}, ` +
					(city.state ? city.state + ', ' : '') +
					city.country,
				value: JSON.stringify(city),
			}))}
			onChange={_.debounce(onChange, 1000)}
		/>
	);
}

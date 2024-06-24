import React from 'react';
import {Select, Spinner} from '@inkjs/ui';
import {API} from '../api/openweather.js';
import {useQuery} from '@tanstack/react-query';
import {Error} from './Error.js';
import _ from 'lodash';

type Props = {
	cityName: string;
	onChange: (newValue: string) => void;
};
export function CitySelect({cityName, onChange}: Props) {
	const {
		status,
		data: cities,
		error,
	} = useQuery({
		queryKey: ['cities', cityName],
		queryFn: () => API.geocode(cityName),
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

import Conf from 'conf';

type ConfigSchema = {
	locale: string;
};

export const config = new Conf<ConfigSchema>({
	projectName: 'weather-cli',
});

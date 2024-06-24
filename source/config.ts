import Conf from 'conf';

type configSchema = {
	locale: string;
};

export const config = new Conf<configSchema>({
	projectName: 'weather-cli',
});

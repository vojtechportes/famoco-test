interface IConfig {
	PORT: number;
	NODE_ENV: string;
	API_BASE: string;
  API_KEY: string;
}

// tslint:disable-next-line no-string-literal
const config: IConfig = window["config"];

export default config;

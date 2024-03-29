import Axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

export default class Request {
    private static instance: AxiosInstance;

    private static config: CreateAxiosDefaults = {};

    public static getInstance(): AxiosInstance {
        if (!Request.instance) {
            Request.instance = Axios.create(Request.config);
        }

        return Request.instance;
    }

    public static getConfig(): CreateAxiosDefaults {
        return this.config;
    }

    public static setConfig(config: CreateAxiosDefaults): void {
        const instance = Request.getInstance();

        Object.keys(config).forEach((key: string) => {
            instance.defaults[key] = config[key];
        });
    }

    public static setHeader(name: string, value: string): void {
        const instance = Request.getInstance();
        instance.defaults.headers[name] = value;
    }
}

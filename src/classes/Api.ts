import { ApiConfig } from '@/types/ApiConfig';

export default class Api {
    private static instance: Api | null = null;
    public config: ApiConfig | null = null;

    public static getInstance(): Api {
        if (Api.instance === null) {
            Api.instance = new Api();
        }

        return Api.instance;
    }

    public static makeUrl(uri: string = ''): string {
        return Api.getInstance().config?.backendUrl + uri;
    }
}

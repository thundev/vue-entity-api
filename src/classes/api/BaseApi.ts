import Request from '@/classes/utils/Request';
import Api from '@/classes/Api';

export default abstract class BaseApi {
    protected abstract url: string;

    protected request = Request.getInstance();

    getUrl(uri: string | null = null): string {
        const baseUrl = `${Api.makeUrl()}${this.url}`;

        if (uri) {
            return `${baseUrl}${uri}`;
        }

        return baseUrl;
    }
}

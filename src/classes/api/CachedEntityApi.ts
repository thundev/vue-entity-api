import ListResponse from '@/types/responses/ListResponse';
import { Map } from '@/types/Map';
import EntityApi from '@/classes/api/EntityApi';
import BrowserStorage from '@/classes/utils/BrowserStorage';

export default abstract class CachedEntityApi<T, D> extends EntityApi<T, D> {
    protected cachedTime: number = 3600;
    async list(params?: Map): Promise<ListResponse<D>> {
        const storage: BrowserStorage = new BrowserStorage(window.localStorage).withTimeout(this.cachedTime);

        if (!storage.has(this.url)) {
            const response: ListResponse<D> = await super.list(params);
            storage.set<ListResponse<D>>(this.url, response);
        }

        return storage.get<ListResponse<D>>(this.url);
    }

    clearCache() {
        const storage: BrowserStorage = new BrowserStorage(window.localStorage);

        if (storage.has(this.url)) {
            storage.remove(this.url);
        }
    }
}

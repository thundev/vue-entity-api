import { Map } from '@/types/Map';
import ListResponse from '@/types/responses/ListResponse';

export interface IList<D> {
    list(params?: Map): Promise<ListResponse<D>>;
}

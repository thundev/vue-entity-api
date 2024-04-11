import Response from '@/types/responses/Response';
import ListResponse from '@/types/responses/ListResponse';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Map } from '@/types/Map';
import { Meta } from '@/types/Meta';
import BaseApi from './BaseApi';
import { IList } from '@/interfaces/IList';
import { IPrimaryKey } from '@/interfaces/IPrimaryKey';
import BelongsTo from '@/types/relations/BelongsTo';
import HasMany from '@/types/relations/HasMany';

export default abstract class EntityApi<T, D> extends BaseApi implements IList<D>, IPrimaryKey {
    private loadRelations: boolean = true;

    async list(params?: Map): Promise<ListResponse<D>> {
        const url: string = this.getUrl();

        const response: AxiosResponse<{ data: T[]; meta: Meta }> = await this.request.get(url, {
            params,
        } as AxiosRequestConfig);
        const data: D[] = await this.prepareData(response.data.data);

        return new ListResponse<D>(data, response.data.meta);
    }

    async show(id?: number | string): Promise<Response<D>> {
        const url: string = this.getUrl(id ? `/${id}` : null);
        const response: AxiosResponse<{ data: T }> = await this.request.get(url);
        const data: D = (await this.prepareData([response.data.data]))[0];
        return new Response<D>(data);
    }

    async create(body = {}): Promise<Response<D>> {
        const url: string = this.getUrl();
        const response: AxiosResponse<{ data: T }> = await this.request.post(url, body);
        const data: D = (await this.prepareData([response.data.data]))[0];
        return new Response<D>(data);
    }

    async update(id: number | string, body = {}, method: string = 'patch'): Promise<Response<D>> {
        const url = this.getUrl(`/${id}`);
        const response: AxiosResponse<{ data: T }> = await this.request[method](url, body);
        const data: D = (await this.prepareData([response.data.data]))[0];
        return new Response<D>(data);
    }

    async delete(id: number | string): Promise<void> {
        const url = this.getUrl(`/${id}`);
        await this.request.delete(url);
    }

    protected async prepareData(data: T[]): Promise<D[]> {
        const updated: { [key: string]: D } = {};
        data.forEach((item) => {
            updated[item[this.getPrimaryKeyField()]] = item as unknown as D;
        });

        const parseRelation = async (relation: BelongsTo<object> | HasMany<object>) => {
            if (relation.type === 'belongsTo') {
                let ids: string[] = [];
                data.forEach((item) => {
                    ids = ids.concat(item[relation.field]);
                });

                ids = ids.filter((value, index, array) => array.indexOf(value) === index);

                const loadedItems = (await relation.api.list({ ids })).data;

                data.forEach((item: T) => {
                    updated[item[this.getPrimaryKeyField()]][relation.newField] =
                        loadedItems.find(
                            (loadedItem: any): boolean => loadedItem[relation.foreignField] === item[relation.field],
                        ) ?? null;
                });
            }

            if (relation.type === 'hasMany') {
                const ids = Object.keys(updated);
                (await relation.api.list({ [relation.searchKey]: ids })).data.forEach((relatedItem) => {
                    if (!updated[relatedItem[relation.foreignField]][relation.newField]) {
                        updated[relatedItem[relation.foreignField]][relation.newField] = [];
                    }
                    updated[relatedItem[relation.foreignField]][relation.newField].push(relatedItem);
                });
            }
        };

        if (this.loadRelations && data.length > 0) {
            for (const relation of this.getRelations()) {
                await parseRelation(relation);
            }
        }

        return Object.values(updated);
    }

    protected getRelations(): (BelongsTo<object> | HasMany<object>)[] {
        return [];
    }

    public getPrimaryKeyField(): string {
        return 'id';
    }

    public withRelations(): EntityApi<T, D> {
        this.loadRelations = true;
        return this;
    }

    public withoutRelations(): EntityApi<T, D> {
        this.loadRelations = false;
        return this;
    }
}

import { ApiConfig } from '@/types/ApiConfig';
import Api from '@/classes/Api';
import BaseApi from '@/classes/api/BaseApi';
import EntityApi from '@/classes/api/EntityApi';
import CachedEntityApi from '@/classes/api/CachedEntityApi';
import BrowserStorage from '@/classes/utils/BrowserStorage';
import Request from '@/classes/utils/Request';
import { IList } from '@/interfaces/IList';
import { IPrimaryKey } from '@/interfaces/IPrimaryKey';
import BelongsTo from '@/types/relations/BelongsTo';
import HasMany from '@/types/relations/HasMany';
import Response from '@/types/responses/Response';
import ListResponse from '@/types/responses/ListResponse';
import { Meta } from '@/types/Meta';

export function VueApiPlugin(_: any, config: ApiConfig) {
    Api.getInstance().config = config;
}

export { BaseApi, EntityApi, CachedEntityApi, BrowserStorage, Request, HasMany, BelongsTo, Response, ListResponse };

export type { IList, IPrimaryKey, Meta, ApiConfig };

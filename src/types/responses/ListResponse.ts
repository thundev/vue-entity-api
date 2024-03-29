import { Meta } from '@/types/Meta';

export default class ListResponse<T, D = Meta> {
    public data: T[];

    public meta?: D;

    constructor(data: T[], meta?: D) {
        this.data = data;
        this.meta = meta;
    }
}

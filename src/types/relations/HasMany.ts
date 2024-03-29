import { IPrimaryKey } from '@/interfaces/IPrimaryKey';
import { IList } from '@/interfaces/IList';

type TRelation<T> = {
    searchKey: string;
    newField: string;
    foreignField: string;
    api: IList<T> & IPrimaryKey;
};

export default class HasMany<T> {
    public searchKey: string;

    public foreignField: string;

    public newField: string;

    public type = 'hasMany' as const;

    public api: IList<T> & IPrimaryKey;

    constructor(relation: TRelation<T>) {
        this.searchKey = relation.searchKey;
        this.foreignField = relation.foreignField;
        this.newField = relation.newField;
        this.api = relation.api;
    }
}

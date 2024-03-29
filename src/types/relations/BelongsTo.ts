import { IList } from '@/interfaces/IList';
import { IPrimaryKey } from '@/interfaces/IPrimaryKey';

type TRelation<T> = {
    field: string;
    newField: string;
    searchKey?: string;
    foreignField?: string;
    api: IList<T> & IPrimaryKey;
};

export default class BelongsTo<T> {
    public searchKey: string;

    public foreignField: string;

    public field: string;

    public newField: string;

    public type = 'belongsTo' as const;

    public api: IList<T> & IPrimaryKey;

    constructor(relation: TRelation<T>) {
        this.field = relation.field;
        this.newField = relation.newField;
        this.api = relation.api;
        this.foreignField = relation.foreignField ?? relation.api.getPrimaryKeyField();
        this.searchKey = relation.searchKey ?? 'ids';
    }
}

export default class Response<T, D = unknown> {
    public data: T;
    public meta?: D;

    constructor(data: T, meta?: D) {
        this.data = data;
        this.meta = meta;
    }
}

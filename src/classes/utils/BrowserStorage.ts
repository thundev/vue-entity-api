import Api from '@/classes/Api';

export default class BrowserStorage {
    private timeoutSec: number | null = null;

    protected storage: Storage;

    constructor(storage: Storage | null = null) {
        this.storage = storage ?? window.localStorage;
    }

    set<T>(key: string, value: T): void {
        this.storage.setItem(
            key,
            JSON.stringify({
                exp: this.calculateExp(),
                lang: this.get('locale'),
                value,
            }),
        );
    }

    clearDictionaries(): void {
        const currentLocale = this.get('locale');

        if (!currentLocale) {
            return;
        }

        const foundKeys: string[] = [];
        const len: number = this.storage.length;
        const url = Api.getInstance().config!.backendUrl;

        for (let i: number = 0; i < len; ++i) {
            const key = this.storage.key(i);

            if (key !== null && key.indexOf(url) === 0 && this.getKeyLocale(key) !== currentLocale) {
                foundKeys.push(key);
            }
        }

        foundKeys.forEach((key) => {
            this.remove(key);
        });
    }

    private getKeyLocale(key: string): string | null {
        const value = this.storage.getItem(key);

        if (value === null) {
            return null;
        }

        try {
            const data = JSON.parse(value);
            return data?.lang ?? null;
        } catch (exception) {
            return null;
        }
    }

    get<T>(key: string): T {
        const value = this.storage.getItem(key);

        try {
            const data = JSON.parse(value as string);
            if (this.isExpired(data?.exp ?? null)) {
                this.remove(key);
                return this.get(key);
            }

            return data.value;
        } catch (exception) {
            return value as T;
        }
    }

    getOrSet<T>(key: string, cb: () => T): T {
        if (!this.has(key)) {
            this.set(key, cb());
        }
        return this.get<T>(key);
    }

    has(key: string): boolean {
        return this.get(key) !== null;
    }

    remove(key: string): void {
        this.storage.removeItem(key);
    }

    clear(): void {
        this.storage.clear();
    }

    public withTimeout(timeoutSec: number): BrowserStorage {
        this.timeoutSec = timeoutSec;

        return this;
    }

    private calculateExp(): number | null {
        if (this.timeoutSec === null) {
            return null;
        }

        return new Date(new Date().getTime() + this.timeoutSec * 1000).getTime();
    }

    private isExpired(millis: number | null): boolean {
        if (millis === null) {
            return false;
        }

        return new Date().getTime() > new Date(millis).getTime();
    }
}

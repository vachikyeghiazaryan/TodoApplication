declare class ApiClient {
    constructor();

    get(url: string): Promise<any>;

    post<T>(url: string, model: T): Promise<any>;

    put<T>(url: string, id: (string | number), model: T): Promise<any>;

    delete(url: string, id: (number | string)): Promise<any>;
}
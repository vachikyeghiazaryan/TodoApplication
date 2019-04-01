/// <reference path="../api/apiClient.d.ts" />
/// <reference path="../models/todoModel.d.ts" />

export default class TodoService {
    private baseUrl: string = 'api/todos';

    constructor(private apiClient: ApiClient) { }

    getAll(): Promise<any> {
        return this.apiClient.get(this.baseUrl);
    }
    get(id: number): Promise<any> {
        return this.apiClient.get(`${this.baseUrl}/${id}`);
    }

    add(model: TodoModel): Promise<any> {
        return this.apiClient.post(this.baseUrl, model);
    }

    edit(model: TodoModel): Promise<any> {
        return this.apiClient.put<TodoModel>(this.baseUrl, model.id, model);
    }

    mark(doneIds: number[], notDoneIds: number[]): Promise<any> {
        return this.apiClient.post(`${this.baseUrl}/mark`, { doneIds, notDoneIds });
    }

    delete(id: number): Promise<any> {
        return this.apiClient.delete(this.baseUrl, id);
    }
}

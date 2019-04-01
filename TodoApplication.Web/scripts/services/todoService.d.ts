/// <reference path="../models/todoModel.d.ts" />
/// <reference path="../api/apiClient.d.ts" />

declare class TodoService {
    constructor(apiClient: ApiClient);

    getAll(): Promise<any>;
    get(id: number): Promise<any>;
    add(model: TodoModel): Promise<any>;
    edit(model: TodoModel): Promise<any>;
    mark(doneIds: number[], notDoneIds: number[]): Promise<any>;
    delete(id: number): Promise<any>;
}
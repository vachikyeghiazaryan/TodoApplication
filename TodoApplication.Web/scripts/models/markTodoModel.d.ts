declare class MarkTodoModel {
    constructor(doneIds: number[], notDoneIds: number[]);

    public doneIds: number[];
    public notDoneIds: number[];
}
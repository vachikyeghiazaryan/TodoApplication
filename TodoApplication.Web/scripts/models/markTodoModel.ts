export class MarkTodoModel {
    constructor(
        public doneIds: number[],
        public notDoneIds: number[]
    ) { }
}
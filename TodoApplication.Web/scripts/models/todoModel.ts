export default class TodoModel {
    constructor(
        public id: number,
        public name: string,
        public isDone: boolean,
        public createdDate: Date,
    ) { }
}
/// <reference path="../services/todoService.d.ts" />
/// <reference path="../api/apiClient.d.ts" />
/// <reference path="../models/todoModel.d.ts" />
/// <reference path="../models/markTodoModel.d.ts" />
/// <reference path="../utils/todoUtils.d.ts" />
/// <reference path="../pages/IPage.d.ts" />

export class TodoPage implements IPage {
    private todoService: TodoService;
    private $todoForm: JQuery<HTMLElement>;
    private $todoList: JQuery<HTMLElement>;

    private todos: Array<TodoModel> = [];

    constructor() {
        this.todoService = new TodoService(new ApiClient());
        this.$todoForm = $('#todo-form');
        this.$todoList = $("#todo-list");
    }

    public run(): void {
        this.init();

        this.updateTodoList();
        console.log('running');
    }

    private init() {
        this.initTodoForm();
        this.initTodoList();
    }

    private initTodoForm(): void {
        this.$todoForm.change(() => {
            $('#val-errors').text(null);
        });

        this.$todoForm.validate({
            rules: {
                name: { required: true }
            },
            messages: {
                name: {
                    required: 'Name is required'
                }
            }
        });

        this.$todoForm.submit((e) => {
            e.preventDefault();

            if (!this.$todoForm.valid()) {
                return;
            }

            let model = TodoUtils.mapToModel<TodoModel>(this.$todoForm.serializeArray(), new TodoModel());

            if (model.id) {
                this.editTodo(model);
            }
            else {
                this.addTodo(model);
            }
        });

        this.$todoForm.on('reset', (e) => {
            e.preventDefault();
            this.clearForm();
        });

        this.clearForm();
    }

    private initTodoList(): void {
        $('#todos>input.mark-all-done').click((e) => {
            e.preventDefault();
            this.markAllDone();
        });

        this.$todoList.on('click', 'input.mark-done', (e) => {
            e.preventDefault();

            const id = $(e.target).closest('li.todo-item').data('id');
            const isDone = $(e.target).prop('checked');

            this.mark(isDone ? [id] : [], isDone ? [] : [id]);
        });

        this.$todoList.on('click', 'button.edit', (e) => {
            e.preventDefault();

            const id = $(e.target).closest('li.todo-item').data('id');

            this.editTodoItem(id);
        });

        this.$todoList.on('click', 'button.delete', (e) => {
            e.preventDefault();

            const id = $(e.target).closest('li.todo-item').data('id');

            this.deleteTodo(id);
        });
    }


    private updateTodoList() {
        this.getTodos()
            .then(() => {
                this.renderTodoList(this.todos);
            });
    }

    private renderTodoList(todos: TodoModel[]): void {
        const todoList = todos.length > 0
            ? todos.map(item =>
                `<li
                    class="todo-item list-group-item d-flex justify-content-between align-items-center"
                    data-id="${item.id}">
                    <input class="check mark-done" type="checkbox" ${item.isDone ? 'checked="checked"' : ''} />
                        ${item.name}
                    <div class="inline">
                        <button class='btn btn-xs edit'>edit</button>
                        <button class='btn btn-xs delete'>delete</button>
                    </div>     
                </li>`
            ).join('')
            : `<li class="list-group-item d-flex justify-content-between align-items-center">Created TODOs will be shown here.</li>`;

        this.$todoList.html(todoList);
        this.updateMarkAllCheckbox();
    }

    private updateMarkAllCheckbox() {
        const areAllDone = this.todos.every(x => x.isDone);

        $('#todos input.mark-all-done').prop('checked', areAllDone).prop('disabled', areAllDone);
    }


    private addTodo(model: TodoModel): Promise<any> {
        return this.todoService.add(model)
            .then((res) => {
                this.updateTodoList();
                this.clearForm();
            }).catch(() => {
                $('#val-errors').text('An error occured while saving')
                    .show();
            });
    }

    private editTodo(model: TodoModel): Promise<any> {
        return this.todoService.edit(model)
            .then((res) => {
                this.updateTodoList();
                this.clearForm();
            }).catch(() => {
                $('#val-errors').text('An error occured while saving')
                    .show();
            });
    }

    private markAllDone(): Promise<any> {

        return this.mark(this.todos.map(x => x.id), []);
    }

    private mark(doneIds: number[], notDoneIds: number[]): Promise<any> {
        return this.todoService.mark(doneIds, notDoneIds)
            .then(() => this.updateTodoList());
    }

    private deleteTodo(id: number): Promise<any> {
        return this.todoService.delete(id)
            .then((res) => {
                this.updateTodoList();
            }).catch(() => {
                $('#val-errors').text('An error occured while deleting')
                    .show();
            });
    }

    private getTodos(): Promise<any> {
        return this.todoService.getAll()
            .then((data) => {
                if (Array.isArray(data)) {
                    this.todos = data;
                } else {
                    this.todos = [];
                }
            });
    }

    private editTodoItem(id: number): void {
        let todo = null;

        for (var item of this.todos) {
            if (item.id === id) {
                todo = item;
                continue;
            }
        }
        if (todo) {
            this.clearForm();
            this.fillForm(todo);
        }
    }

    clearForm(): void {
        this.$todoForm.find('[name="id"]').val(null);
        this.$todoForm.find('[name="name"]').val(null);
    }

    fillForm(todo: TodoModel): void {
        this.$todoForm.find('[name="id"]').val(todo.id);
        this.$todoForm.find('[name="name"]').val(todo.name);
    }
}
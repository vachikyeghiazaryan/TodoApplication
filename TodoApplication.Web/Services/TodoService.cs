using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApplication.Web.Models;

namespace TodoApplication.Web.Services
{
    public class TodoService : ITodoService
    {
        private readonly List<TodoModel> _todoList;

        public TodoService()
        {
            _todoList = new List<TodoModel>();
        }

        public TodoModel Get(int id)
        {
            return this._todoList.FirstOrDefault(x => x.Id == id);
        }

        public IEnumerable<TodoModel> Get()
        {
            return this._todoList;
        }

        public TodoModel Add(TodoModel model)
        {
            model.Id = this._todoList.Count + 1;
            model.CreatedDate = DateTime.UtcNow;
            model.ModifiedDate = null; // not to manually clear value of not needed properties we need to create separate model class.
            this._todoList.Add(model);

            return model;
        }

        public TodoModel Edit(TodoModel model)
        {
            var todo = this._todoList.FirstOrDefault(x => x.Id == model.Id);

            if (todo == null)
            {
                // TODO: for me the best way to notify controller that todo doesn't exist is to wrap return value into another class.
                // for now I'll keep it simple like this.
            }

            todo.Name = model.Name;
            todo.IsDone = model.IsDone;
            todo.ModifiedDate = DateTime.UtcNow;

            return todo;
        }

        public MarkTodoModel Mark(MarkTodoModel markModel)
        {
            var doneTodos = this._todoList.Where(x => !x.IsDone && markModel.DoneIds.Contains(x.Id.Value));
            var notDoneTodos = this._todoList.Where(x => x.IsDone && markModel.NotDoneIds.Contains(x.Id.Value));

            foreach (var item in doneTodos)
            {
                item.IsDone = true;
                item.ModifiedDate = DateTime.UtcNow;
            }

            foreach (var item in notDoneTodos)
            {
                item.IsDone = false;
                item.ModifiedDate = DateTime.UtcNow;
            }

            return new MarkTodoModel
            {
                DoneIds = doneTodos.Select(x => x.Id.Value),
                NotDoneIds = notDoneTodos.Select(x => x.Id.Value)
            };
        }

        public TodoModel Delete(int id)
        {
            var todo = this._todoList.FirstOrDefault(x => x.Id == id);

            if (todo != null)
            {
                this._todoList.Remove(todo);
            }

            return todo;
        }
    }
}

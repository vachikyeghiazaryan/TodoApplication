using System.Collections.Generic;
using TodoApplication.Web.Models;

namespace TodoApplication.Web.Services
{
    public interface ITodoService
    {
        TodoModel Get(int id);
        IEnumerable<TodoModel> Get();

        TodoModel Add(TodoModel model);
        TodoModel Edit(TodoModel todoModel);
        TodoModel Delete(int id);
        MarkTodoModel Mark(MarkTodoModel model);
    }
}
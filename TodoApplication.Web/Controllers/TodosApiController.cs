using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TodoApplication.Web.Models;
using TodoApplication.Web.Services;

namespace TodoApplication.Web.Controllers
{
    [Route("api/todos")]
    [ApiController]
    public class TodosApiController : ControllerBase
    {
        private readonly ITodoService _todoService;

        public TodosApiController(ITodoService todoService)
        {
            this._todoService = todoService;
        }

        // GET api/todos
        [HttpGet]
        public ActionResult<IEnumerable<TodoModel>> Get()
        {
            return Ok(this._todoService.Get());
        }

        // GET api/todos/5
        [HttpGet("{id}")]
        public ActionResult<TodoModel> Get(int id)
        {
            var todo = this._todoService.Get(id);

            if (todo == null)
            {
                return NotFound();
            }

            return Ok(todo);
        }

        // POST api/todos
        [HttpPost]
        public IActionResult Post([FromBody]TodoModel model)
        {
            var todo = this._todoService.Add(model);

            return Created("api/todos/" + todo.Id, todo);
        }

        // POST api/todos
        [HttpPost]
        [Route("mark")]
        public IActionResult Mark([FromBody]MarkTodoModel model)
        {
            var markTodos = this._todoService.Mark(model);

            return Ok(markTodos);
        }

        // PUT api/todos/5
        [HttpPut("{id}")]
        public ActionResult<TodoModel> Put(int id, [FromBody] TodoModel model)
        {
            var todo = this._todoService.Edit(model);

            return Ok(todo);
        }

        // DELETE api/todos/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            this._todoService.Delete(id);

            return NoContent();
        }
    }
}

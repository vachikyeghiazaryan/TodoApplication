using System.Collections.Generic;

namespace TodoApplication.Web.Models
{
    public class MarkTodoModel
    {
        public IEnumerable<int> DoneIds { get; set; }
        public IEnumerable<int> NotDoneIds { get; set; }
    }
}

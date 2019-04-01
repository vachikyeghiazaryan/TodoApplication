using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApplication.Web.Models
{
    public class TodoModel
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public bool IsDone { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
    }
}

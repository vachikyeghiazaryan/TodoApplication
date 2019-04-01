using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using TodoApplication.Web.Models;

namespace TodoApplication.Web.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}

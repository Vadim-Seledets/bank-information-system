using System;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace BankInformationSystem.Controllers
{
    [ApiController]
    [Route("test")]
    public class TestController : ControllerBase
    {
        [HttpGet]
        [Route("hello")]
        public ActionResult HelloWorldTest()
        {
            return Ok("Hello world!");
        }
        
        [HttpGet]
        [Route("badrequest")]
        public ActionResult BadRequestTest()
        {
            throw new ValidationException("ExceptionFilter works for validation exceptions!");
        }
        
        [HttpGet]
        [Route("servererror")]
        public ActionResult InternalServerErrorTest()
        {
            throw new Exception("ExceptionFilter works for common exceptions!");
        }
    }
}
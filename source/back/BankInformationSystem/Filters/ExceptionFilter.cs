using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace BankInformationSystem.Filters
{
    public class ExceptionFilter : ExceptionFilterAttribute
    {
        private class ApiError
        {
            public string Message { get; }

            public ApiError(string message)
            {
                Message = message;
            }
        }
        
        public override void OnException(ExceptionContext context)
        {
            ApiError apiError = null;
            if (context.Exception is ValidationException)
            {
                apiError = new ApiError(context.Exception.Message);

                context.HttpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
            }
            else
            {
                context.HttpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;
            }
            
            context.Result = new JsonResult(apiError);

            base.OnException(context);
        }
    }
}
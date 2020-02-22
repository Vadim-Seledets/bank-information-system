using System.Linq;
using System.Security.Authentication;
using BankInformationSystem.Models;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace BankInformationSystem.Filters
{
    public class ApiExceptionFilterAttribute : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            ApiErrorModel apiError;
            if (context.Exception is ValidationException vex)
            {
                apiError = vex.Errors.Any()
                    ? new ApiErrorModel
                        {
                            Errors = vex.Errors
                                .Select(x => new PropertyErrorModel
                                {
                                    Name = x.PropertyName,
                                    Message = x.ErrorMessage
                                })
                                .ToList()
                        }
                    : new ApiErrorModel { Error = vex.Message };

                context.HttpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
            }
            else if (context.Exception is AuthenticationException aex)
            {
                apiError = new ApiErrorModel { Error = aex.Message };
                context.HttpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
            }
            else
            {
                context.HttpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;
                apiError = new ApiErrorModel { Error = "Internal Server Error" };
                
                // TODO: Log error
            }
            
            context.Result = new JsonResult(apiError);

            base.OnException(context);
        }
    }
}
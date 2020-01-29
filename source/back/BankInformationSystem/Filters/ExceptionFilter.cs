using System.Linq;
using BankInformationSystem.Models;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace BankInformationSystem.Filters
{
    public class ExceptionFilter : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            ApiErrorModel apiError = null;
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
            else
            {
                context.HttpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;
                apiError = new ApiErrorModel { Error = "Internal Server Error" };
            }
            
            context.Result = new JsonResult(apiError);

            base.OnException(context);
        }
    }
}
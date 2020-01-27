using System.Reflection;
using AutoMapper;
using BankInformationSystem.Business.Mappings;
using BankInformationSystem.Business.Services;
using BankInformationSystem.Business.Validation;
using BankInformationSystem.DataAccess;
using BankInformationSystem.DataAccess.Entities;
using BankInformationSystem.Filters;
using FluentValidation;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace BankInformationSystem
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers(options =>
            {
                options.Filters.Add(typeof(ExceptionFilter));
            });
            
            var connectionString = Configuration.GetConnectionString("Default");
            services.AddEntityFrameworkSqlite().AddDbContext<BankInformationSystemDbContext>(options => options.UseSqlite(connectionString));
            
            services.AddAutoMapper(Assembly.GetAssembly(typeof(MappingProfile)));
            
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Bank Information System API", Version = "v1" });
            }); 
            
            // Services
            services.AddScoped<ICustomerService, CustomerService>();
            
            // Validators
            services.AddScoped<IValidator<Customer>, CustomerValidator>();
        }
        
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            
            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Bank Information System API V1");
            }); 

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}
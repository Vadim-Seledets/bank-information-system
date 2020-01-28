using System;
using System.IO;
using System.Reflection;
using AutoMapper;
using BankInformationSystem.Business.Mappings;
using BankInformationSystem.Business.Services;
using BankInformationSystem.Business.Validation;
using BankInformationSystem.Data;
using BankInformationSystem.Data.Entities;
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
        private const string DefaultCorsPolicy = "Default";
        
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
            
            var connectionString = $"Data Source={Path.Combine(AppContext.BaseDirectory, Configuration["DatabaseFilename"])}";
            services.AddDbContext<BankInformationSystemDbContext>(options => options.UseSqlite(connectionString));
            
            services.AddAutoMapper(Assembly.GetAssembly(typeof(MappingProfile)));
            
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Bank Information System API", Version = "v1" });
            });
            
            services.AddCors(options =>
            {
                options.AddPolicy(DefaultCorsPolicy,
                    builder =>
                    {
                        builder.AllowAnyOrigin();
                    });
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

            app.UseCors(DefaultCorsPolicy);

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
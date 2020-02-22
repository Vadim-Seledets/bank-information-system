using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using AutoMapper;
using BankInformationSystem.Business.Mappings;
using BankInformationSystem.Business.Models;
using BankInformationSystem.Business.Services;
using BankInformationSystem.Business.Utilities;
using BankInformationSystem.Business.Validation;
using BankInformationSystem.Data;
using BankInformationSystem.Filters;
using FluentValidation;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;

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
            services
                .AddControllers(options =>
                {
                    options.Filters.Add(typeof(ApiExceptionFilterAttribute));
                })
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                });

            var connectionString = $"Data Source={Path.Combine(AppContext.BaseDirectory, Configuration["DatabaseFilename"])}";
            services.AddDbContext<BankInformationSystemDbContext>(
                options => options.UseSqlite(connectionString),
                ServiceLifetime.Transient);

            services.AddAutoMapper(Assembly.GetAssembly(typeof(MappingProfile)));
            
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Bank Information System API", Version = "v1" });
                
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header, 
                    Description = "Please insert PIN hash",
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey 
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme 
                        { 
                            Reference = new OpenApiReference 
                            { 
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer" 
                            } 
                        },
                        Array.Empty<string>()
                    } 
                });
            });
            
            services.AddCors(options =>
            {
                options.AddPolicy(DefaultCorsPolicy,
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader();
                    });
            });
            
            // Services
            services.AddScoped<ICustomerService, CustomerService>();
            services.AddScoped<IDepositService, DepositService>();
            services.AddScoped<ILoanService, LoanService>();
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IBankMetaOperationsService, BankMetaOperationsService>();
            services.AddScoped<IPaymentService, PaymentService>();
            services.AddScoped<IAuthorizationService, AuthorizationService>();

            // Utilities
            services.AddScoped<IBankInformationSystemDbContextFactory>(container =>
                new BankInformationSystemDbContextFactory(container.GetService<BankInformationSystemDbContext>));
            services.AddScoped<VirtualDateTimeProvider>();
            services.AddScoped<ICurrentDateTimeProvider>(provider => provider.GetService<VirtualDateTimeProvider>());
            services.AddScoped<IVirtualDateTimeManager>(provider => provider.GetService<VirtualDateTimeProvider>());
            services.AddSingleton<IPinGenerator, PinGenerator>();

            // Validators
            services.AddScoped<IValidator<CustomerCreateModel>, CustomerCreateModelValidator>();
            services.AddScoped<IValidator<CustomerUpdateModel>, CustomerUpdateModelValidator>();
            services.AddScoped<IValidator<DepositCreateModel>, DepositCreateModelValidator>();
            services.AddScoped<IValidator<LoanCreateModel>, LoanCreateModelValidator>();
            services.AddScoped<IValidator<MobileCarrierPaymentRequestModel>, MobileCarrierPaymentRequestValidator>();
        }
        
        public void Configure(
            IApplicationBuilder app,
            IWebHostEnvironment env,
            BankInformationSystemDbContext context)
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

            context.Database.EnsureCreated();
        }
    }
}
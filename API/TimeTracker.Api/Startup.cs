using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NLog;
using TimeTracker.Data.Context;
using TimeTracker.Service;

namespace TimeTracker.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //Try to Configure
            try
            {
                //Setup the application in IIS
                services.Configure<IISOptions>(opt =>
                {
                    opt.AutomaticAuthentication = true;
                });

                //Add in the Database Context and services
                services.AddDbContext<TimeTrackerContext>(opt => opt.ConfigureForTimeTracker(this.Configuration));
                services.AddTransient<ProjectService>();
                services.AddTransient<TaskService>();

                //Add in the AutoMapper service
                services.AddAutoMapper();

                //Add in MVC
                services.AddMvc();

            }
            catch (Exception e)
            {
                LogManager.GetCurrentClassLogger()?.Error(e);
                throw;
            }
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            //Set up global logging
            app.UseExceptionHandler(builder => builder.Run(this.GlobalLogException));

            //Setup MVC for routing, etc.
            app.UseMvc();

            //Migrate the database
            using (IServiceScope scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                try
                {
                    TimeTrackerContext ctx = scope.ServiceProvider.GetService<TimeTrackerContext>();
                    ctx.Migrate();

                }
                catch (Exception e)
                {
                    LogManager.GetCurrentClassLogger()?.Error(e);
                    throw;
                }
            }
        }


        /// <summary>
        /// GlobalLogException logs any unhandled Exception to disk.
        /// </summary>
        /// <param name="ctx">The HttpContext of the Exception</param>
        /// <returns>Task for async execution</returns>
        private Task GlobalLogException(HttpContext ctx)
        {
            // Return a new Task
            return Task.Factory.StartNew(() =>
            {
                // Get the Exception from the Context
                Exception e = ctx.Features.Get<IExceptionHandlerFeature>()?.Error;

                // Log to disk if the Exception is found
                if (e != null)
                {
                    //Get the Logger and log it
                    Logger logger = LogManager.GetCurrentClassLogger();
                    logger?.Error(e);
                }
            });
        }
    }
}

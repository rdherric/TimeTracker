using System;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TimeTracker.Data.Context;
using TimeTracker.Service;

namespace TimeTracker.Api
{
    public class Startup
    {
        #region Constants
        public const string SqliteDatabasePathKey = "SqliteDatabasePath";
        #endregion


        public Startup(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //Add in the Database Context and services
            services.AddDbContext<TimeTrackerContext>(opt => opt.ConfigureForTimeTracker(this.Configuration));
            services.AddTransient<ProjectService>();
            services.AddTransient<TaskService>();

            //Add in the AutoMapper service
            services.AddAutoMapper();

            //Add in MVC
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMvc();

            //Migrate the database
            using (IServiceScope scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                TimeTrackerContext ctx = scope.ServiceProvider.GetService<TimeTrackerContext>();
                ctx.Migrate();
            }
        }
    }
}

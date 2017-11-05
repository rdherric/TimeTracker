using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;

namespace TimeTracker.Data.Context
{
    /// <summary>
    /// TimeTrackerContextDesignTimeFactory is used to setup the TimeTrackerContext
    /// for Entity Framework Migrations.
    /// </summary>
    public class TimeTrackerContextDesignTimeFactory : IDesignTimeDbContextFactory<TimeTrackerContext>
    {
        /// <summary>
        /// CreateDbContext creates a TimeTrackerContext for use to migrate databases
        /// </summary>
        /// <param name="args">String arguments</param>
        /// <returns>New TimeTrackerContext to do migrations</returns>
        public TimeTrackerContext CreateDbContext(string[] args)
        {
            //Get a configuration reference
            IConfiguration config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            //Create an OptionsBuilder and configure
            DbContextOptionsBuilder<TimeTrackerContext> builder = new DbContextOptionsBuilder<TimeTrackerContext>();
            builder.ConfigureForTimeTracker(config);

            //Return a new TimeTrackerContext
            return new TimeTrackerContext(builder.Options);
        }
    }
}
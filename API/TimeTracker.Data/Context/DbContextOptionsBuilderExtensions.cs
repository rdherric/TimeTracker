using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace TimeTracker.Data.Context
{
    /// <summary>
    /// DbContextOptionsBuilderExtensions contains extension methods
    /// to configure a TimeTrackerContext.
    /// </summary>
    public static class DbContextOptionsBuilderExtensions
    {
        #region Constants
        private const string EnvironmentKey = "Environment";
        private const string ConnectionStringKeyFmt = "TimeTracker.{0}";
        #endregion


        /// <summary>
        /// ConfigureForTimeTracker configures the DbContextOptionsBuilder
        /// for the TimeTracker application.
        /// </summary>
        /// <param name="builder">The DbContextOptionsBuilder to configure</param>
        /// <param name="config">The IConfiguration to get config settings</param>
        public static void ConfigureForTimeTracker(this DbContextOptionsBuilder builder, IConfiguration config)
        {
            //Get the Connection String name for the Environment
            string environmentName = config[DbContextOptionsBuilderExtensions.EnvironmentKey];
            string connectionStringKey = String.Format(
                DbContextOptionsBuilderExtensions.ConnectionStringKeyFmt,
                environmentName);

            //Get the Connection String from config
            string connectionString = config.GetConnectionString(connectionStringKey);

            //Setup the SQL Server database
            builder.UseSqlServer(connectionString);
        }
    }
}
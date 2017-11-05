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
        private const string SqliteConnectionStringFmt = "Data Source={0};";
        private const string SqliteDatabasePathKey = "SqliteDatabasePath";
        #endregion


        /// <summary>
        /// ConfigureForTimeTracker configures the DbContextOptionsBuilder
        /// for the TimeTracker application.
        /// </summary>
        /// <param name="builder">The DbContextOptionsBuilder to configure</param>
        /// <param name="config">The IConfiguration to get config settings</param>
        public static void ConfigureForTimeTracker(this DbContextOptionsBuilder builder, IConfiguration config)
        {
            //Create the Connection String
            string connectionString = string.Format(
                DbContextOptionsBuilderExtensions.SqliteConnectionStringFmt,
                config[DbContextOptionsBuilderExtensions.SqliteDatabasePathKey]
            );

            //Setup the SQLite database
            builder.UseSqlite(connectionString);   
        }
    }
}
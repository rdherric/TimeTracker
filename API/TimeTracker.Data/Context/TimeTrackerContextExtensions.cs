using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using TimeTracker.Data.Configuration;
using TimeTracker.Data.Entity;

namespace TimeTracker.Data.Context
{
    /// <summary>
    /// TimeTrackerContextExtensions contains extension methods for the
    /// TimeTrackerContext class.
    /// </summary>
    public static class TimeTrackerContextExtensions
    {
        /// <summary>
        /// Migrate creates or migrates and seeds the TimeTracker database.
        /// </summary>
        /// <param name="ctx">The TimeTrackerContext to use to seed</param>
        public static void Migrate(this TimeTrackerContext ctx)
        {
            //Create and migrate the database if necessary
            ctx.Database.Migrate();

            //Create the SURGE General Project
            if (ctx.Projects.Any(p => p.Client.Equals(ProjectConfiguration.SurgeGeneralClient)) == false)
            {
                //Add the Project
                ctx.Projects.Add(new Project
                {
                    Client = ProjectConfiguration.SurgeGeneralClient,
                    Description = ProjectConfiguration.SurgeGeneralDescription
                });

                //Save the changes
                ctx.SaveChanges();
            }
        }
    }
}
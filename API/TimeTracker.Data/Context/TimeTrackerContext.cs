using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using TimeTracker.Data.Configuration;
using TimeTracker.Data.Entity;

namespace TimeTracker.Data.Context
{
    /// <summary>
    /// TimeTrackerContext is the DbContext class for the 
    /// TimeTracker database.
    /// </summary>
    public class TimeTrackerContext : DbContext
    {
        #region Constants
        public const long InvalidId = 0;
        #endregion


        #region Constructor
        /// <summary>
        /// Constructor for the TimeTrackerContext.
        /// </summary>
        public TimeTrackerContext(DbContextOptions<TimeTrackerContext> options) : base(options)
        {
        }
        #endregion
        

        //DbSets of entities
        public DbSet<Project> Projects { get; set; }
        public DbSet<Task> Tasks { get; set; }


        #region Overrides
        /// <summary>
        /// OnModelCreating sets up the Configurations.
        /// </summary>
        /// <param name="modelBuilder">The ModelBuilder to create config</param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Get rid of pluralization
            modelBuilder.Model.GetEntityTypes()
                .ToList()
                .ForEach(e => e.Relational().TableName = e.DisplayName());

            //Add the configurations
            new ProjectConfiguration().Configure(modelBuilder.Entity<Project>());
            new TaskConfiguration().Configure(modelBuilder.Entity<Task>());

            //Base class setup
            base.OnModelCreating(modelBuilder);
        }
        #endregion
    }
}
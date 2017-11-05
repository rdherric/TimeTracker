using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeTracker.Data.Entity;

namespace TimeTracker.Data.Configuration
{
    /// <summary>
    /// ProjectConfiguration points the Project entity to 
    /// the Project table.
    /// </summary>
    internal class ProjectConfiguration : IEntityTypeConfiguration<Project>
    {
        #region Constants
        public const string SurgeGeneralClient = "SURGE General";
        public const string SurgeGeneralDescription = "Any general operations for SURGE Forward";
        #endregion


        public void Configure(EntityTypeBuilder<Project> builder)
        {
            //Primary Key
            builder.HasKey(p => p.Id);

            //Properties
            builder.Property(p => p.Client)
                .IsRequired()
                .HasMaxLength(256);

            builder.Property(p => p.Description)
                .HasMaxLength(1024);
        }
    }
}
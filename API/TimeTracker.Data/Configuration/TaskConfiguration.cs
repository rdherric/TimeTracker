using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeTracker.Data.Entity;

namespace TimeTracker.Data.Configuration
{
    /// <summary>
    /// TaskConfiguration configures the Task entity.
    /// </summary>
    internal class TaskConfiguration : IEntityTypeConfiguration<Task>
    {
        public void Configure(EntityTypeBuilder<Task> builder)
        {
            //Primary Key
            builder.HasKey(t => t.Id);

            //Properties
            builder.Property(t => t.Description)
                .IsRequired()
                .HasMaxLength(1024);

            //Relationships
            builder.HasOne(t => t.Project)
                .WithMany(p => p.Tasks)
                .HasForeignKey(t => t.ProjectId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
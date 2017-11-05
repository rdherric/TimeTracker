using System;
using TimeTracker.Data.Context;

namespace TimeTracker.Data.Entity
{
    /// <summary>
    /// Task is the entity for the Task table
    /// </summary>
    public class Task
    {
        //Primary Key
        public long Id { get; set; } = TimeTrackerContext.InvalidId;

        //Properties
        public string Description { get; set; }
        public DateTime StartDateTime { get; set; } = DateTime.MinValue;
        public DateTime EndDateTime { get; set; } = DateTime.MinValue;

        //Relationships
        public long ProjectId { get; set; } = TimeTrackerContext.InvalidId;
        public virtual Project Project { get; set; } = null;
    }
}
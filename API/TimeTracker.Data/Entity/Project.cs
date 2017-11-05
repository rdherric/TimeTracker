using System;
using System.Collections.Generic;
using TimeTracker.Data.Context;

namespace TimeTracker.Data.Entity
{
    /// <summary>
    /// Project is the entity class for the Project table
    /// </summary>
    public class Project
    {
        //Primary Key
        public long Id { get; set; } = TimeTrackerContext.InvalidId;

        //Properties
        public string Client { get; set; }
        public string Description { get; set; }
        public bool IsDefault { get; set; }

        //Relationships
        public virtual ICollection<Task> Tasks { get; set; }
    }
}
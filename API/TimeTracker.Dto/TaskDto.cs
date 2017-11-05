using System;

namespace TimeTracker.Dto.Transfer
{
    /// <summary>
    /// TaskDto is used to move data to and from the API.
    /// </summary>
    public class TaskDto
    {
        //Primary Key
        public long Id { get; set; }

        //Properties
        public string Description { get; set; }
        public long StartDateTime { get; set; }
        public long EndDateTime { get; set; }

        //Relationships
        public long ProjectId { get; set; }
        public string ProjectClient { get; set; }
    }
}
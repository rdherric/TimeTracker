using System;

namespace TimeTracker.Dto
{
    /// <summary>
    /// ProjectDto is used to move data to and from the API.
    /// </summary>
    public class ProjectDto
    {
        //Primary Key
        public long Id { get; set; }

        //Properties
        public string Client { get; set; }
        public string Description { get; set; }
        public bool IsDefault { get; set; }
    }
}
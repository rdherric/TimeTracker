using System;

namespace TimeTracker.Dto
{
    /// <summary>
    /// ProjectStatisticsDto holds Statistics per Project based on the
    /// specified Date and Time.
    /// </summary>
    public class ProjectStatisticsDto
    {
        public long ProjectId { get; set; }
        public string ProjectClient { get; set; }
        public int MinutesToday { get; set; }
        public int MinutesThisWeek { get; set; }
        public int MinutesThisMonth { get; set; }
    }
}
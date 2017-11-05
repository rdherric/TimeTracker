using System.Collections.Generic;

namespace TimeTracker.Dto
{
    /// <summary>
    /// StatisticsSummaryDto holds the complete set of Project
    /// Statistics based on the specified DateTime.
    /// </summary>
    public class StatisticsSummaryDto
    {
        public long EndDateTime { get; set; }
        public ICollection<ProjectStatisticsDto> ProjectStatistics { get; set; }
    }
}
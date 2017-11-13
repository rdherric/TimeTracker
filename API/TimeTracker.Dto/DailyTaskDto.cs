using System.Collections.Generic;

namespace TimeTracker.Dto
{
    /// <summary>
    /// DailyTaskDto holds the complete set of Task
    /// Statistics based on the specified DateTime.
    /// </summary>
    public class DailyTaskDto
    {
        public long Date { get; set; }
        public IEnumerable<TaskDto> Tasks { get; set; }
        public int MinutesToday { get; set; }
        public int MinutesWeekToDate { get; set; }
        public int MinutesMonthToDate { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using AutoMapper;
using TimeTracker.Data.Context;
using TimeTracker.Data.Entity;
using TimeTracker.Data.Extensions;
using TimeTracker.Dto;

namespace TimeTracker.Service
{
    /// <summary>
    /// TaskService is how the API does database operations for the
    /// Task table.
    /// </summary>
    public class TaskService
    {
        #region Member variables
        private readonly TimeTrackerContext _context = null;
        private readonly IMapper _mapper = null;
        #endregion


        #region Constructor
        /// <summary>
        /// Default Constructor for the TaskService class.
        /// </summary>
        /// <param name="context">The TimeTrackerContext to use for the database actions</param>
        /// <param name="mapper">The IMapper to map from entities to DTOs</param>
        public TaskService(TimeTrackerContext context, IMapper mapper)
        {
            //Save arguments to member variables
            this._context = context;
            this._mapper = mapper;
        }
        #endregion


        #region Get methods
        /// <summary>
        /// GetAll gets the complete list of Tasks.
        /// </summary>
        /// <param name="startDate">JavaScript date to get Tasks greater than</param>
        /// <param name="endDate">JavaScript date to get Tasks less than</param>
        /// <returns>ICollection of Tasks</returns>
        public ICollection<TaskDto> GetAll(long startDate = 0, long endDate = 0)
        {
            //Get the set of Tasks
            IEnumerable<Task> rtn = this._context.Tasks;

            //Add StartDate if necessary
            if (startDate > 0)
            {
                rtn = rtn.Where(t => t.StartDateTime > startDate.FromJavaScriptDate());
            }

            //Add EndDate if necessary
            if (endDate > 0)
            {
                rtn = rtn.Where(t => t.StartDateTime < endDate.FromJavaScriptDate());
            }

            //Return the result
            return this._mapper.Map<ICollection<TaskDto>>(rtn);
        }


        /// <summary>
        /// GetById gets the specified Task by ID.
        /// </summary>
        /// <returns>Specified Task if found, null otherwise</returns>
        public TaskDto GetById(long id)
        {
            //Get the Task by ID
            Task task = this._context.Tasks
                .FirstOrDefault(t => t.Id == id);

            //Return the result
            return this._mapper.Map<TaskDto>(task);
        }
        #endregion


        #region Add / Update methods
        /// <summary>
        /// Add adds the specified Task.
        /// </summary>
        /// <returns>New Task if added, null otherwise</returns>
        public TaskDto Add(TaskDto taskDto)
        {
            //Map the DTO to a new Task
            Task task = this._mapper.Map<Task>(taskDto);

            //Set up the Project
            task.Project = this._context.Projects
                .FirstOrDefault(p => p.Id == taskDto.ProjectId);

            //Add the new Task
            this._context.Tasks.Add(task);
            this._context.SaveChanges();

            //Return the result
            return this._mapper.Map<TaskDto>(task);
        }


        /// <summary>
        /// Update updates the specified Task.
        /// </summary>
        /// <returns>Updated Task if added, null otherwise</returns>
        public TaskDto Update(TaskDto taskDto)
        {
            //Try to get the Task from the database
            Task task = this._context.Tasks
                .FirstOrDefault(t => t.Id == taskDto.Id);

            //Try to update if possible
            if (task != null)
            {
                //Map the DTO to the Task
                this._mapper.Map(taskDto, task);

                //Set up the Project
                task.Project = this._context.Projects
                    .FirstOrDefault(p => p.Id == taskDto.ProjectId);

                //Update the new Task
                this._context.Tasks.Update(task);
                this._context.SaveChanges();
            }

            //Return the result
            return this._mapper.Map<TaskDto>(task);
        }
        #endregion


        #region Statistics methods
        /// <summary>
        /// GetAllDailyTasks gets the whole set of Tasks with Statistics
        /// for a date range.
        /// </summary>
        /// <param name="startDateTime">The Start DateTime</param>
        /// <param name="endDateTime">The End DateTime</param>
        /// <param name="timeZoneOffset">The offset in minutes of the DateTimes from GMT</param>
        /// <returns>List of Tasks with Statistics</returns>
        public IEnumerable<DailyTaskDto> GetAllDailyTasks(DateTime startDateTime, DateTime endDateTime, int timeZoneOffset)
        {
            //Return the result - get the list of Dates, then 
            //Select into a DailyTaskDto
            return this._context.Tasks
                .Where(t => t.StartDateTime > startDateTime && t.EndDateTime < endDateTime)
                .GroupBy(t => t.StartDateTime.Date)
                .AsEnumerable()
                .Select(g =>
                {
                    //Calculate the end time as UTC - that's the current 
                    //Date plus the time zone offset, plus a day
                    DateTime offsetEndDateTime = g.Key.AddMinutes(timeZoneOffset * -1).AddDays(1);

                    //Return a DailyTaskDto
                    return new DailyTaskDto
                    {
                        Date = g.Key.AddMinutes(timeZoneOffset * -1).ToJavaScriptDate(),
                        Tasks = this._mapper.Map<IEnumerable<TaskDto>>(g.ToArray()),
                        MinutesToday = this.GetMinutesToday(g.Key, offsetEndDateTime),
                        MinutesWeekToDate = this.GetMinutesWeekToDate(g.Key, offsetEndDateTime),
                        MinutesMonthToDate = this.GetMinutesMonthToDate(g.Key, offsetEndDateTime)
                    };
                });
        }


        /// <summary>
        /// GetMinutesToday gets the total minutes before the specified
        /// time for the specified date.
        /// </summary>
        /// <param name="startDateTime">the Start date time of the Tasks</param>
        /// <param name="endDateTime">the End date time of the Tasks</param>
        /// <returns>Number of minutes today</returns>
        public int GetMinutesToday(DateTime startDateTime, DateTime endDateTime)
        {
            //Return the result
            return this.GetMinutesForTimeSpan(
                t => t.StartDateTime.Date == startDateTime.Date &&
                     t.EndDateTime < endDateTime);
        }


        /// <summary>
        /// GetMinutesWeekToDate gets the total minutes before the specified
        /// time for the specified week.
        /// </summary>
        /// <param name="startDateTime">the Start date time of the Tasks</param>
        /// <param name="endDateTime">the End date time of the Tasks</param>
        /// <returns>Number of minutes this week</returns>
        public int GetMinutesWeekToDate(DateTime startDateTime, DateTime endDateTime)
        {
            //Calculate the first day of the week with this date
            DateTime lastDateTimeOfLastWeek = startDateTime.Date.AddDays((int) startDateTime.DayOfWeek * -1);

            //Return the result
            return this.GetMinutesForTimeSpan(
                t => t.StartDateTime > lastDateTimeOfLastWeek &&
                     t.EndDateTime < endDateTime);
        }


        /// <summary>
        /// GetMinutesMonthToDate gets the total minutes before the specified
        /// time for the specified month.
        /// </summary>
        /// <param name="startDateTime">the Start date time of the Tasks</param>
        /// <param name="endDateTime">the End date time of the Tasks</param>
        /// <returns>Number of minutes this month</returns>
        public int GetMinutesMonthToDate(DateTime startDateTime, DateTime endDateTime)
        {
            //Return the result
            return this.GetMinutesForTimeSpan(
                t => t.StartDateTime.Month == startDateTime.Month &&
                     t.EndDateTime < endDateTime);
        }


        /// <summary>
        /// GetMinutesForTimeSpan is a helper method to get 
        /// the total number of minutes for a Time Span.
        /// </summary>
        /// <param name="timeSpanSelector">The way to select Tasks</param>
        /// <returns>Number of Minutes for the time span</returns>
        private int GetMinutesForTimeSpan(Func<Task, bool> timeSpanSelector)
        {
            //Return the result with the selector specified
            return Convert.ToInt32(this._context.Tasks
                .Where(t => timeSpanSelector(t) == true)
                .Select(t => t.EndDateTime - t.StartDateTime)
                .Sum(ts => ts.TotalMinutes));
        }
        #endregion
    }
}

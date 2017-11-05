using System;
using System.Collections.Generic;
using System.Linq;
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
        /// GetMinutesTodayByProjectId gets the total minutes before the specified
        /// time for the specified date.
        /// </summary>
        /// <param name="projectId">The ID of the Project</param>
        /// <param name="endDateTime">the end date time</param>
        /// <returns>Number of minutes today</returns>
        public int GetMinutesTodayByProjectId(long projectId, DateTime endDateTime)
        {
            //Return the result
            return this.GetMinutesForProjectAndTimeSpan(projectId,
                t => t.StartDateTime.Date == endDateTime.Date &&
                     t.EndDateTime < endDateTime);
        }


        /// <summary>
        /// GetMinutesThisWeekByProjectId gets the total minutes before the specified
        /// time for the specified week.
        /// </summary>
        /// <param name="projectId">The ID of the Project</param>
        /// <param name="endDateTime">the end date time</param>
        /// <returns>Number of minutes this week</returns>
        public int GetMinutesThisWeekByProjectId(long projectId, DateTime endDateTime)
        {
            //Calculate the days of the year for the week of the specified Date
            DateTime lastDateTimeOfLastWeek = endDateTime.Date.AddDays((int) endDateTime.DayOfWeek * -1).AddTicks(-1);
            DateTime firstDateTimeOfNextWeek = lastDateTimeOfLastWeek.AddDays(7).AddTicks(1);

            //Return the result
            return this.GetMinutesForProjectAndTimeSpan(projectId,
                t => t.StartDateTime > lastDateTimeOfLastWeek &&
                     t.StartDateTime < firstDateTimeOfNextWeek &&
                     t.EndDateTime < endDateTime);
        }


        /// <summary>
        /// GetMinutesThisMonthByProjectId gets the total minutes before the specified
        /// time for the specified month.
        /// </summary>
        /// <param name="projectId">The ID of the Project</param>
        /// <param name="endDateTime">the end date time</param>
        /// <returns>Number of minutes this month</returns>
        public int GetMinutesThisMonthByProjectId(long projectId, DateTime endDateTime)
        {
            //Return the result
            return this.GetMinutesForProjectAndTimeSpan(projectId,
                t => t.StartDateTime.Month == endDateTime.Month &&
                     t.EndDateTime < endDateTime);
        }


        /// <summary>
        /// GetMinutesForProjectAndTimeSpan is a helper method to get 
        /// the total number of minutes for a Project and Time Span.
        /// </summary>
        /// <param name="projectId">The ID of the Project</param>
        /// <param name="timeSpanSelector">The way to select Tasks</param>
        /// <returns>Number of Minutes for the time span</returns>
        private int GetMinutesForProjectAndTimeSpan(long projectId, Func<Task, bool> timeSpanSelector)
        {
            //Return the result with the selector specified
            return Convert.ToInt32(this._context.Tasks
                .Where(t => t.ProjectId == projectId && timeSpanSelector(t) == true)
                .Select(t => t.EndDateTime - t.StartDateTime)
                .Sum(ts => ts.TotalMinutes));
        }
        #endregion
    }
}

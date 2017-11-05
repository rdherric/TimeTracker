using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using TimeTracker.Api.Resources;
using TimeTracker.Data.Extensions;
using TimeTracker.Dto;
using TimeTracker.Service;

namespace TimeTracker.Api.Controllers
{
    /// <summary>
    /// StatisticsController is the interface for getting statistics as
    /// of a particular date from the database.
    /// </summary>
    [Route(Constants.Statistics)]
    public class StatisticsController : Controller
    {
        #region Member variables
        private readonly ProjectService _projectService = null;
        private readonly TaskService _taskService = null;
        #endregion


        #region Constructor
        /// <summary>
        /// Default constructor for the StatisticsController class.
        /// </summary>
        /// <param name="projectService">The ProjectService to use to manage Projects</param>
        /// <param name="taskService">The TaskService to use to manage Tasks</param>
        public StatisticsController(ProjectService projectService, TaskService taskService)
        {
            //Save the arguments to member variables
            this._projectService = projectService;
            this._taskService = taskService;
        }
        #endregion


        /// <summary>
        /// Get gets the complete set of Tasks from the database
        /// based on the date parameters.
        /// </summary>
        /// <returns>ICollection of TaskDto objects</returns>
        [HttpGet("{endDateTime:long?}")]
        public StatisticsSummaryDto Get([FromRoute] long endDateTime = 0)
        {
            //Setup endDateTime if it has not been passed in
            DateTime dt =
                (endDateTime == 0
                    ? DateTime.UtcNow
                    : endDateTime.FromJavaScriptDate());

            //Return statistics for all Projects
            return new StatisticsSummaryDto
            {
                EndDateTime = dt.ToJavaScriptDate(),
                ProjectStatistics = this._projectService.GetAll()
                    .Select(p => new ProjectStatisticsDto
                    {
                        ProjectId = p.Id,
                        ProjectClient = p.Client,
                        MinutesToday = this._taskService.GetMinutesTodayByProjectId(p.Id, dt),
                        MinutesThisWeek = this._taskService.GetMinutesThisWeekByProjectId(p.Id, dt),
                        MinutesThisMonth = this._taskService.GetMinutesThisMonthByProjectId(p.Id, dt)
                    })
                    .ToArray()
            };
        }
    }
}
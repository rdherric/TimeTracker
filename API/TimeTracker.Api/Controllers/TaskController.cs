using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using TimeTracker.Api.Resources;
using TimeTracker.Data.Extensions;
using TimeTracker.Dto;
using TimeTracker.Service;

namespace TimeTracker.Api.Controllers
{
    /// <summary>
    /// TaskController is the interface for managing Task objects
    /// in the database.
    /// </summary>
    [Route(Constants.Task)]
    public class TaskController : Controller
    {
        #region Member variables
        private readonly TaskService _service = null;
        #endregion


        #region Constructor
        /// <summary>
        /// Default constructor for the TaskController class.
        /// </summary>
        /// <param name="service">The TaskService to use to manage Tasks</param>
        public TaskController(TaskService service)
        {
            //Save the arguments to member variables
            this._service = service;
        }
        #endregion


        /// <summary>
        /// Get gets the complete set of DailyTaskDtos from the database
        /// based on the date parameters.
        /// </summary>
        /// <returns>ICollection of TaskDto objects</returns>
        [HttpGet("all")]
        public IEnumerable<DailyTaskDto> Get([FromQuery] long startDateTime = 0, [FromQuery] long endDateTime = 0)
        {
            //Setup startDateTime if it has not been passed in
            DateTime sdt =
            (startDateTime > 0
                ? startDateTime.FromJavaScriptDate()
                : DateTime.MinValue);

            //Setup endDateTime if it has not been passed in
            DateTime edt =
            (endDateTime > 0
                ? endDateTime.FromJavaScriptDate()
                : DateTime.UtcNow);

            //Return all Tasks
            return this._service.GetAllDailyTasks(sdt, edt);
        }


        /// <summary>
        /// GetById gets the specified Task from the database by ID.
        /// </summary>
        /// <param name="id">The ID of the Task to get</param>
        /// <returns>TaskDto object</returns>
        [HttpGet("{id:long}")]
        public TaskDto GetById([FromRoute] long id)
        {
            //Return specified Task
            return this._service.GetById(id);
        }


        /// <summary>
        /// Post adds a new Task to the database.
        /// <param name="taskDto">The TaskDto to add to the database</param>
        /// </summary>
        /// <returns>TaskDto object</returns>
        [HttpPost]
        public TaskDto Post([FromBody] TaskDto taskDto)
        {
            //Return new Task if possible
            return this._service.Add(taskDto);
        }



        /// <summary>
        /// Put updates an existing Task in the database.
        /// <param name="taskDto">The TaskDto to update in the database</param>
        /// </summary>
        /// <returns>TaskDto object</returns>
        [HttpPut]
        public TaskDto Put([FromBody] TaskDto taskDto)
        {
            //Return updated Project if possible
            return this._service.Update(taskDto);
        }
    }
}
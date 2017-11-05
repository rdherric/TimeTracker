using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using TimeTracker.Api.Resources;
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
        /// Get gets the complete set of Tasks from the database
        /// based on the date parameters.
        /// </summary>
        /// <returns>ICollection of TaskDto objects</returns>
        [HttpGet("all")]
        public ICollection<TaskDto> Get([FromQuery] long startDate = 0, [FromQuery] long endDate = 0)
        {
            //Return all Projects
            return this._service.GetAll(startDate, endDate);
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
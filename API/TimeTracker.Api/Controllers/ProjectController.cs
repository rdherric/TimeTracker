using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using TimeTracker.Api.Resources;
using TimeTracker.Dto.Transfer;
using TimeTracker.Service;

namespace TimeTracker.Api.Controllers
{
    /// <summary>
    /// ProjectController is the interface for managing Project objects
    /// in the database.
    /// </summary>
    [Route(Constants.Project)]
    public class ProjectController : Controller
    {
        #region Member variables
        private readonly ProjectService _service = null;
        #endregion


        #region Constructor
        /// <summary>
        /// Default constructor for the ProjectController class.
        /// </summary>
        /// <param name="service">The ProjectService to use to manage Projects</param>
        public ProjectController(ProjectService service)
        {
            //Save the arguments to member variables
            this._service = service;
        }
        #endregion


        /// <summary>
        /// Get gets the complete set of Projects from the database.
        /// </summary>
        /// <returns>ICollection of ProjectDto objects</returns>
        [HttpGet("all")]
        public ICollection<ProjectDto> Get()
        {
            //Return all Projects
            return this._service.GetAll();
        }


        /// <summary>
        /// GetById gets the specified Project from the database by ID.
        /// </summary>
        /// <param name="id">The ID of the Project to get</param>
        /// <returns>ProjectDto object</returns>
        [HttpGet("{id:long}")]
        public ProjectDto GetById([FromRoute] long id)
        {
            //Return specified Project
            return this._service.GetById(id);
        }


        /// <summary>
        /// Post adds a new Project to the database.
        /// <param name="projectDto">The ProjectDto to add to the database</param>
        /// </summary>
        /// <returns>ProjectDto object</returns>
        [HttpPost]
        public ProjectDto Post([FromBody] ProjectDto projectDto)
        {
            //Return new Project if possible
            return this._service.Add(projectDto);
        }



        /// <summary>
        /// Put updates an existing Project in the database.
        /// <param name="projectDto">The ProjectDto to update in the database</param>
        /// </summary>
        /// <returns>ProjectDto object</returns>
        [HttpPut]
        public ProjectDto Put([FromBody] ProjectDto projectDto)
        {
            //Return updated Project if possible
            return this._service.Update(projectDto);
        }
    }
}
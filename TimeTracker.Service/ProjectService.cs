using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using TimeTracker.Data.Context;
using TimeTracker.Data.Entity;
using TimeTracker.Dto.Transfer;

namespace TimeTracker.Service
{
    /// <summary>
    /// ProjectService is how the API does database operations for the
    /// Project table.
    /// </summary>
    public class ProjectService
    {
        #region Member variables
        private readonly TimeTrackerContext _context = null;
        private readonly IMapper _mapper = null;
        #endregion


        #region Constructor
        /// <summary>
        /// Default Constructor for the ProjectService class.
        /// </summary>
        /// <param name="context">The TimeTrackerContext to use for the database actions</param>
        /// <param name="mapper">The IMapper to map from entities to DTOs</param>
        public ProjectService(TimeTrackerContext context, IMapper mapper)
        {
            //Save arguments to member variables
            this._context = context;
            this._mapper = mapper;
        }
        #endregion


        #region Get methods
        /// <summary>
        /// GetAll gets the complete list of Projects.
        /// </summary>
        /// <returns>ICollection of Projects</returns>
        public ICollection<ProjectDto> GetAll()
        {
            //Return the result
            return this._mapper.Map<ICollection<ProjectDto>>(
                this._context.Projects.ToArray());
        }


        /// <summary>
        /// GetById gets the specified Project by ID.
        /// </summary>
        /// <returns>Specified Project if found, null otherwise</returns>
        public ProjectDto GetById(long id)
        {
            //Get the Project by ID
            Project project = this._context.Projects
                .FirstOrDefault(p => p.Id == id);

            //Return the result
            return this._mapper.Map<ProjectDto>(project);
        }


        /// <summary>
        /// GetClientById gets only the Client from the Project
        /// by the specified ID.
        /// </summary>
        /// <param name="id">The ID for which to get Client</param>
        /// <returns>String Client if found, String.Empty otherwise</returns>
        public string GetClientById(long id)
        {
            //Return the result
            return this._context.Projects
                .FirstOrDefault(p => p.Id == id)?
                .Client ?? String.Empty;
        }
        #endregion


        #region Add / Update methods
        /// <summary>
        /// Add adds the specified Project.
        /// </summary>
        /// <returns>New Project if added, null otherwise</returns>
        public ProjectDto Add(ProjectDto projectDto)
        {
            //Map the DTO to a new Project
            Project project = this._mapper.Map<Project>(projectDto);

            //Add the new Project
            this._context.Projects.Add(project);
            this._context.SaveChanges();

            //Return the result
            return this._mapper.Map<ProjectDto>(project);
        }


        /// <summary>
        /// Update updates the specified Project.
        /// </summary>
        /// <returns>Updated Project if added, null otherwise</returns>
        public ProjectDto Update(ProjectDto projectDto)
        {
            //Try to get the Project from the database
            Project project = this._context.Projects
                .FirstOrDefault(p => p.Id == projectDto.Id);

            //Try to update if possible
            if (project != null)
            {
                //Map the DTO to the Project
                this._mapper.Map(projectDto, project);

                //Update the new Project
                this._context.Projects.Update(project);
                this._context.SaveChanges();
            }

            //Return the result
            return this._mapper.Map<ProjectDto>(project);
        }
        #endregion
    }
}

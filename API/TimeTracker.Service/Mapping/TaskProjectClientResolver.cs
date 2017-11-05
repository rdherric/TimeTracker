using AutoMapper;
using TimeTracker.Data.Entity;
using TimeTracker.Dto;

namespace TimeTracker.Service.Mapping
{
    /// <summary>
    /// TaskProjectClientResolver is used to resolve a Project
    /// Client name without a Project reference in the Task.
    /// </summary>
    public class TaskProjectClientResolver : IValueResolver<Task, TaskDto, string>
    {
        #region Member variables
        private readonly ProjectService _service = null;
        #endregion

        
        #region Constructor
        /// <summary>
        /// Default constructor for the TaskProjectClientResolver.
        /// </summary>
        /// <param name="service">The ProjectService to get Projects</param>
        public TaskProjectClientResolver(ProjectService service)
        {
            //Save the argument to member variables
            this._service = service;
        }
        #endregion


        /// <summary>
        /// Convert gets the Client name for the Project.
        /// </summary>
        /// <param name="source">The Task used to get Project info</param>
        /// <param name="destination">The TaskDto that is being filled</param>
        /// <param name="destMember">The string that is being filled</param>
        /// <param name="context">The ResolutionContext in case of accidents</param>
        /// <returns>String Project Client</returns>
        public string Resolve(Task source, TaskDto destination, string destMember, ResolutionContext context)
        {
            //Get the Client Name
            return this._service.GetClientById(source.ProjectId);
        }
    }
}
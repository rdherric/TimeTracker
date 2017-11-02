using System;
using AutoMapper;
using TimeTracker.Data.Entity;
using TimeTracker.Dto.Transfer;

namespace TimeTracker.Service.Mapping
{
    /// <summary>
    /// ProjectProfile sets up the mapping for the ProjectDto.
    /// </summary>
    public class ProjectProfile : Profile
    {
        public ProjectProfile()
        {
            //Map from Project to DTO
            this.CreateMap<Project, ProjectDto>();

            //Map from DTO to Project
            this.CreateMap<ProjectDto, Project>()
                .ForMember(p => p.Tasks, o => o.Ignore());
        }
    }
}
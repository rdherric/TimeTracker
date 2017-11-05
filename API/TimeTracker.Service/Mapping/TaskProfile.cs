using System;
using AutoMapper;
using TimeTracker.Data.Entity;
using TimeTracker.Data.Extensions;
using TimeTracker.Dto;

namespace TimeTracker.Service.Mapping
{
    /// <summary>
    /// TaskProfile sets up the mapping for the TaskDto.
    /// </summary>
    public class TaskProfile : Profile
    {
        public TaskProfile()
        {
            //Map from Task to DTO
            this.CreateMap<Task, TaskDto>()
                .ForMember(dto => dto.EndDateTime, o => o.ResolveUsing(t => t.EndDateTime.ToJavaScriptDate()))
                .ForMember(dto => dto.ProjectClient, o => o.ResolveUsing<TaskProjectClientResolver>())
                .ForMember(dto => dto.StartDateTime, o => o.ResolveUsing(t => t.StartDateTime.ToJavaScriptDate()));

            //Map from DTO to Project
            this.CreateMap<TaskDto, Task>()
                .ForMember(t => t.EndDateTime, o => o.ResolveUsing(dto => dto.EndDateTime.FromJavaScriptDate()))
                .ForMember(t => t.Project, o => o.Ignore())
                .ForMember(t => t.StartDateTime, o => o.ResolveUsing(dto => dto.StartDateTime.FromJavaScriptDate()));
        }
    }
}
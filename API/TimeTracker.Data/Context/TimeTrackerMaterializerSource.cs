using System;
using System.Linq.Expressions;
using System.Reflection;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace TimeTracker.Data.Context
{
    /// <summary>
    /// TimeTrackerMaterializerSource holds methods to update data types
    /// as they are read from the database.
    /// </summary>
    public class TimeTrackerMaterializerSource : EntityMaterializerSource
    {
        /// <summary>
        /// CreateReadValueExpression updates data types based on what
        /// they are.
        /// </summary>
        /// <param name="valueBuffer">The Expression that is being filled</param>
        /// <param name="type">The Type that is being filled</param>
        /// <param name="index">The index</param>
        /// <param name="property">Metadata from EF Core</param>
        /// <returns>Expression to set the data as specified</returns>
        public override Expression CreateReadValueExpression(Expression valueBuffer, Type type, int index, IProperty property)
        {
            //If the Type is DateTime, setup the Kind as UTC
            if (type == typeof(DateTime))
            {
                //Inject the DateTimeKind call in there if possible
                return Expression.Call(
                    this.GetSetKindMethodInfo(),
                    base.CreateReadValueExpression(valueBuffer, type, index, property)
                );
            }

            //Return the base class operation
            return base.CreateReadValueExpression(valueBuffer, type, index, property);
        }


        /// <summary>
        /// Method to set the DateTimeKind.
        /// </summary>
        /// <param name="dt">The DateTime to set</param>
        /// <returns>UTC DateTime</returns>
        private static DateTime SetKind(DateTime dt)
        {
            return DateTime.SpecifyKind(dt, DateTimeKind.Utc);
        }


        /// <summary>
        /// GetSetKindMethodInfo uses Reflection to get the MethodInfo.
        /// </summary>
        /// <returns>MethodInfo for the SetKind method</returns>
        private MethodInfo GetSetKindMethodInfo()
        {
            //Get the MethodInfo for SetKind
            MethodInfo rtn = this.GetType()
                .GetMethod(nameof(this.SetKind), BindingFlags.Static | BindingFlags.NonPublic);

            //Return the result
            return rtn;
        }
    }
}
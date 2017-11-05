using System;
using System.Globalization;

namespace TimeTracker.Data.Extensions
{
    /// <summary>
    /// DateTimeExtensions contains helper methods to translate
    /// DateTimes to JavaScript dates and back.
    /// </summary>
    public static class DateTimeExtensions
    {
        #region Static Members
        public static DateTime UnixEpoch = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
        #endregion


        /// <summary>
        /// ToUnixDate calculates the given DateTime as the
        /// difference from UNIX Epoch to the UTC value.
        /// </summary>
        /// <param name="dt">The DateTime to change to UNIX date</param>
        /// <returns>Int64 seconds since UNIX Epoch</returns>
        public static long ToUnixDate(this DateTime dt)
        {
            //Calculate the seconds since UNIX Epoch
            return Convert.ToInt64(
                (dt.ToUniversalTime() - DateTimeExtensions.UnixEpoch).TotalSeconds);
        }


        /// <summary>
        /// ToJavaScriptDate calculates the given DateTime as the
        /// difference from UNIX Epoch to the UTC value in milliseconds.
        /// </summary>
        /// <param name="dt">The DateTime to change to JavaScript date</param>
        /// <returns>Int64 milliseconds since UNIX Epoch</returns>
        public static long ToJavaScriptDate(this DateTime dt)
        {
            //Calculate the milliseconds since UNIX Epoch
            //Calculate the seconds since UNIX Epoch
            return Convert.ToInt64(
                (dt.ToUniversalTime() - DateTimeExtensions.UnixEpoch).TotalMilliseconds);
        }


        /// <summary>
        /// FromJavaScriptDate calculates the DateTime from
        /// the given UNIX Epoch date.
        /// </summary>
        /// <param name="dt">The long to turn to a DateTime</param>
        /// <returns>DateTime from seconds since UNIX Epoch</returns>
        public static DateTime FromJavaScriptDate(this long dt)
        {
            //Add the seconds to the UNIX Epoch
            return DateTime.SpecifyKind(DateTimeExtensions.UnixEpoch.AddMilliseconds(Convert.ToDouble(dt)), DateTimeKind.Utc);
        }

        /// <summary>
        /// ToTimeZoneString formats the DateTime to the specified
        /// Time Zone from the minutes offset.
        /// </summary>
        /// <param name="dt">The DateTime to format</param>
        /// <param name="offset">The offset in minutes</param>
        /// <returns>Formatted DateTime string</returns>
        public static string ToTimeZoneString(this DateTime dt, int offset)
        {
            //Get the Stop TimeZoneInfo
            //TimeZoneInfo tzi =
            //    (TimeZoneInfo.GetSystemTimeZones()
            //        .FirstOrDefault(t => Convert.ToInt32(t.BaseUtcOffset.TotalMinutes) == offset) ??
            //     TimeZoneInfo.Local);

            //Format the DateTime to a string
            return dt.AddMinutes(offset).ToString(CultureInfo.CurrentCulture);
        }
    }
}
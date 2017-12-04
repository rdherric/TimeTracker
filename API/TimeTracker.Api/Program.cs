using System;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using NLog;
using NLog.Web;

namespace TimeTracker.Api
{
    public class Program
    {
        #region Constants
        private const string _nlogConfig = "nlog.config";
        #endregion


        public static void Main(string[] args)
        {
            //Setup NLog to capture all errors
            Logger logger = NLogBuilder.ConfigureNLog(Program._nlogConfig).GetCurrentClassLogger();

            try
            {
                //Build the WebHost
                IWebHost host = Program.BuildWebHost(args);

                //Get that WebHost going            
                host.Run();
            }
            catch (Exception e)
            {
                logger.Error(e);
                throw;
            }
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .UseNLog()
                .Build();
    }
}

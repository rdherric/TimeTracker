using System;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace TimeTracker.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            //Build the WebHost
            IWebHost host = Program.BuildWebHost(args);

            //Get that WebHost going            
            host.Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .Build();
    }
}

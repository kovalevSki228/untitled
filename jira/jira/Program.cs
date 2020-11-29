using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NLog.Web;
using System;

namespace Jira
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var logger = NLogBuilder.ConfigureNLog("nlog.config")
                                    .GetCurrentClassLogger();
            try
            {
                logger.Debug($"Web api started");
                var webHost = CreateWebHostBuilder(args).Build();
                webHost.Run();
            }
            catch (Exception ex)
            {
                logger.Error(ex, "Stopped because of exception");
                throw;
            }
            finally
            {
                NLog.LogManager.Shutdown();
            }
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                   .UseIIS()
                   .UseStartup<Startup>()
                   .ConfigureLogging(logging =>
                   {
                       logging.ClearProviders();
                       logging.SetMinimumLevel(LogLevel.Trace);
                   })
                   .UseNLog();
    }
}

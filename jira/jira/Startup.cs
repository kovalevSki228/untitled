using Jira.Interface;
using Jira.Interfaces;
using Jira.Model;
using Jira.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Jira
{
    public class Startup
    {
        private const string CorsPolicyName = "devOnly";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var authOptionsConfiguration = Configuration.GetSection("Authentication");
            services.Configure<AuthOptions>(authOptionsConfiguration);

            var authOptions = authOptionsConfiguration.Get<AuthOptions>();

            string connection = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<JiraContext>(options => options.UseSqlServer(connection));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = authOptions.Issuer,

                        ValidateAudience = true,
                        ValidAudience = authOptions.Audience,

                        ValidateLifetime = true,

                        IssuerSigningKey = authOptions.GetSymmetricSecurityKey(),
                        ValidateIssuerSigningKey = true,
                    };
                });

            services.AddControllers();
            services.AddCors(options =>
            {
                options.AddPolicy(name: CorsPolicyName, policy =>
                {
                    policy.WithOrigins("http://localhost:4200/")
                        .WithExposedHeaders()
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowAnyOrigin();
                });
            });

            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<ITicketService, TicketService>();
            services.AddScoped<ICommentService, CommentService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseDeveloperExceptionPage();
            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseHttpsRedirection();
            app.UseRouting();

            app.UseCors(CorsPolicyName);

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers().RequireCors(CorsPolicyName);
                endpoints.MapFallbackToFile("/index.html");
            });
        }
    }
}

using Jira.Model;
using Jira.Utilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;

namespace Jira.Controllers
{
    [Route("api/[controller]")]
    public class AppController : Controller
    {
        private readonly JiraContext dbContext;
        private readonly AuthOptions authOptions;

        public AppController(JiraContext dbContext, IOptions<AuthOptions> authOptions)
        {
            this.dbContext = dbContext;
            this.authOptions = authOptions.Value;
        }

        [HttpPost]
        [Route("")]
        public async Task<IActionResult> Setup()
        {
            await DataSeed.EnsureAdminUserIsCreated(dbContext, authOptions);
            return Ok();
        }
    }
}

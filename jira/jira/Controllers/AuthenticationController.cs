using Jira.Interfaces;
using Jira.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Jira.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : Controller
    {
        private IAuthenticationService authenticationService;

        public AuthenticationController(IAuthenticationService authenticationService)
        {
            this.authenticationService = authenticationService;
        }

        [HttpPost]
        [Route("Login")]
        public IActionResult Login([FromBody] LoginModel request)
        {
            var tocken = authenticationService.Login(request);
            return tocken != string.Empty
                ? Ok(new
                {
                    access_token = tocken
                })
                : Unauthorized();
        }

        [HttpPost]
        [Route("Registration")]
        public IActionResult Registration([FromBody] LoginModel request)
        {
            return Unauthorized();
        }
    }
}

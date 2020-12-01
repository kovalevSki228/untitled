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
        [Route("login")]
        public IActionResult Login(LoginModel request)
        {
            var token = authenticationService.Login(request);
            return Ok(token);
        }

        [HttpPost]
        [Route("register")]
        public IActionResult Register(LoginModel request)
        {
            return Unauthorized();
        }
    }
}

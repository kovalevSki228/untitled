using Jira.Model;
using Jira.Models;
using Jira.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;

namespace Jira.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : Controller
    {
        private JiraContext dbContext;
        private readonly IOptions<AuthOptions> authOptions;
        public AuthenticationController(JiraContext context, IOptions<AuthOptions> authOptions)
        {
            dbContext = context;
            this.authOptions = authOptions;
        }

        [HttpPost]
        [Route("Login")]
        public IActionResult Login([FromBody] LoginModel request)
        {
            var user = AuthenticateUser(request.Email, request.Password);

            if (user != null)
            {
                var tocken = GenerateJWT(user);

                return Ok(new
                {
                    access_token = tocken
                });
            }

            return Unauthorized();
        }

        [HttpPost]
        [Route("Registration")]
        public IActionResult Registration([FromBody] LoginModel request)
        {
            var user = dbContext.Users.SingleOrDefault(u => u.Email == request.Email);

            if (user == null)
            {
                dbContext.Users.Add(new User
                {
                    Id = Guid.NewGuid().ToString(),
                    Email = request.Email,
                    Password = request.Password
                });
                dbContext.SaveChanges();
                return Ok();
            }

            return Unauthorized();
        }

        private User AuthenticateUser(string email, string password)
        {
            return dbContext.Users.SingleOrDefault(u => u.Email == email && u.Password == password);
        }

        private string GenerateJWT(User user)
        {
            var authParams = authOptions.Value;

            var securityKey = authParams.GetSymmetricSecurityKey();
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Sub, user.Id)
            };

            var token = new JwtSecurityToken(authParams.Issuer,
                authParams.Audience,
                claims,
                expires: DateTime.Now.AddSeconds(authParams.TokenLifetime),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);

        }
    }
}

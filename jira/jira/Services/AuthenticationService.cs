using Jira.Interfaces;
using Jira.Model;
using Jira.Models;
using Jira.Utilities;
using Jira.ViewModels;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Jira.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private JiraContext dbContext;
        private readonly IOptions<AuthOptions> authOptions;
        public AuthenticationService(JiraContext dbContext, IOptions<AuthOptions> authOptions)
        {
            this.dbContext = dbContext;
            this.authOptions = authOptions;
        }

        public string Login(LoginModel request)
        {
            var user = AuthenticateUser(request.Email, request.Password);

            if (user != null)
            {
                var tocken = GenerateJWT(user);
                return tocken;
            }

            throw new NotFoundException("Email or password is incorrect");
        }

        public async Task Registration(LoginModel request)
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
                await dbContext.SaveChangesAsync();
            }
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

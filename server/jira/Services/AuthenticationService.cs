using Jira.Interfaces;
using Jira.Middlewares.Errors;
using Jira.Model;
using Jira.Models;
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
        private readonly AuthSettings authSettings;
        public AuthenticationService(JiraContext dbContext, IOptions<AuthSettings> authOptions)
        {
            this.dbContext = dbContext;
            authSettings = authOptions.Value;
        }

        public Token Login(LoginModel request)
        {
            var user = FindUser(request.Email, request.Password);

            if (user != null)
            {
                return new Token()
                {
                    AccessToken = GenerateJWT(user)
                };
            }

            throw new BadRequestException("Email or password is incorrect");
        }

        public async Task Register(LoginModel request)
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

        private User FindUser(string email, string password)
        {
            return dbContext.Users.SingleOrDefault(u => u.Email == email && u.Password == password);
        }

        private string GenerateJWT(User user)
        {
            var securityKey = authSettings.GetSymmetricSecurityKey();
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("id", user.Id)
            };

            var token = new JwtSecurityToken(authSettings.Issuer,
                authSettings.Audience,
                claims,
                expires: DateTime.Now.AddMinutes(authSettings.TokenLifetimeMinutes),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}

using Jira.Model;
using Jira.Models;
using System;
using System.Threading.Tasks;

namespace Jira.Utilities
{
    public static class DataSeed
    {
        public static Task EnsureAdminUserIsCreated(JiraContext dbContext, AuthOptions authOptions)
        {
            dbContext.Users.Add(new User
            {
                Id = Guid.NewGuid().ToString(),
                Email = authOptions.AdminEmail,
                Password = authOptions.AdminPassword
            });
            return dbContext.SaveChangesAsync();
        }
    }
}

using Jira.Model;
using Jira.Models;
using System;
using System.Threading.Tasks;

namespace Jira.Utilities
{
    public static class DataSeed
    {
        public static Task EnsureAdminUserIsCreated(JiraContext dbContext, AuthSettings authOptions)
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

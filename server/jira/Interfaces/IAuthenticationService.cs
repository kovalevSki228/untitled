using Jira.Models;
using Jira.ViewModels;

namespace Jira.Interfaces
{
    public interface IAuthenticationService
    {
        Token Login(LoginModel loginModel);
        string GetEmailUserById(string id);
    }
}

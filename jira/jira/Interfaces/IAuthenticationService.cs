using Jira.ViewModels;

namespace Jira.Interfaces
{
    public interface IAuthenticationService
    {
        string Login(LoginModel loginModel);
    }
}

using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Jira
{
    public class AuthOptions
    {
        public string AdminEmail { get; set; }
        public string AdminPassword { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public string Secret { get; set; }
        public int TokenLifetime { get; set; }

        public SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Secret));
        }
    }
}

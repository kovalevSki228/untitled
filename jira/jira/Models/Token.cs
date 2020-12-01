using System.Text.Json.Serialization;

namespace Jira.Models
{
    public class Token
    {
        [JsonPropertyName("access_token")]
        public string AccessToken { get; set; }
    }
}

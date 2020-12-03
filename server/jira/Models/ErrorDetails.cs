using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace Jira.Model
{
    public class ErrorDetails
    {
        [JsonPropertyName("status_code")]
        public int StatusCode { get; set; }
        [JsonPropertyName("message")]
        public string Message { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}

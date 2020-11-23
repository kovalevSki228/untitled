using System.Collections.Generic;

namespace Jira.ViewModel
{
    public class TicketModel
    {
        public int? Id { get; set; }
        public int CategoryId { get; set; }
        public IEnumerable<string> Labels { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
}

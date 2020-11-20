using System.Collections.Generic;

namespace jira.Model
{
    public class Ticket
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public IEnumerable<Label> Labels { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
}

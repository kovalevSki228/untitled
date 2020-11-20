using System.Collections.Generic;

namespace jira.Model
{
    public class Label
    {
        public int Id { get; set; }
        public IEnumerable<Ticket> Tickets { get; set; }
        public string Text { get; set; }
    }
}

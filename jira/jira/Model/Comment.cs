using System;

namespace jira.Model
{
    public class Comment
    {
        public int id { get; set; }
        public int TicketId { get; set; }
        public string AuthorId { get; set; }
        public DateTime DateTime { get; set; }
        public string Content { get; set; }
    }
}

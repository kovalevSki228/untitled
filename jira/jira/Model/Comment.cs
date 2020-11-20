using System;

namespace jira.Model
{
    public class Comment
    {
        public int Id { get; set; }
        public int TicketId { get; set; }
        public string AuthorId { get; set; }
        public DateTime DateTime { get; set; }
        public string Content { get; set; }
    }
}

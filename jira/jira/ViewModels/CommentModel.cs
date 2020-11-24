using System;

namespace Jira.ViewModels
{
    public class CommentModel
    {
        public int? Id { get; set; }
        public int TicketId { get; set; }
        public DateTime? DateTime { get; set; }
        public string Content { get; set; }
        public string AuthorId { get; set; }
    }
}

using System;

namespace Jira.ViewModels
{
    public class CommentModel
    {
        public int? Id { get; set; }
        public int TicketId { get; set; }
        public DateTime? CreateAt { get; set; }
        public string Content { get; set; }
        public AuthorModel Author { get; set; }
    }

    public class AuthorModel
    {
        public string Id { get; set; }
        public string Email { get; set; }
    }
}

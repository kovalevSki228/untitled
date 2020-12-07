using Jira.Models;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Jira.Model
{
    public class Comment
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int TicketId { get; set; }
        public string AuthorId { get; set; }
        public User Author { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Content { get; set; }
    }
}

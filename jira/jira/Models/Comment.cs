using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace jira.Model
{
    public class Comment
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int TicketId { get; set; }
        public string AuthorId { get; set; }
        public DateTime DateTime { get; set; }
        public string Content { get; set; }
    }
}

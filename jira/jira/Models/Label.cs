using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace jira.Model
{
    public class Label
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public IEnumerable<Ticket> Tickets { get; set; }
        public string Text { get; set; }
    }
}

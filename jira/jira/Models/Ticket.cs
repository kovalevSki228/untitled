using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Jira.Model
{
    public class Ticket
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public IEnumerable<Label> Labels { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
}

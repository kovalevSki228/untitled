using System.ComponentModel.DataAnnotations.Schema;

namespace jira.Model
{
    public class Category
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Title { get; set; }
        public int Order { get; set; }
    }
}

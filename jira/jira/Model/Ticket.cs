namespace jira.Model
{
    public class Ticket
    {
        public int id { get; set; }
        public int CategoryId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
}

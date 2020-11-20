namespace jira.ViewModel
{
    public class TicketModel
    {
        public int CategoryId { get; set; }
        public string[] Labels { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
}

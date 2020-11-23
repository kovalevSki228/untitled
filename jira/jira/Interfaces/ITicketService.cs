using Jira.ViewModel;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Jira.Interface
{
    public interface ITicketService
    {
        Task<IEnumerable<TicketModel>> GetTickets();

        Task CreateTicket(TicketModel ticket);

        Task EditTicket(TicketModel ticket);
    }
}

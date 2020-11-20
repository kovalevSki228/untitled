using jira.Model;
using jira.ViewModel;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace jira.Interface
{
    public interface ITicketService
    {
        Task<IEnumerable<Ticket>> Get();

        Task Create(TicketModel ticket);

        Task<Ticket> Details(int id);

        Task Edit(Ticket ticket);

        Task Delete(int id);
    }
}

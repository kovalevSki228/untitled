using jira.ViewModel;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace jira.Interface
{
    public interface ITicketService
    {
        Task<IEnumerable<TicketModel>> Get();

        Task Create(TicketModel ticket);

        Task Edit(TicketModel ticket);
    }
}

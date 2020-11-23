using Jira.ViewModel;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Jira.Interface
{
    public interface ITicketService
    {
        Task<IEnumerable<TicketModel>> Get();

        Task Create(TicketModel ticket);

        Task Edit(TicketModel ticket);
    }
}

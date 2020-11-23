using Jira.Interface;
using Jira.ViewModel;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Jira.Services
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : Controller
    {
        private readonly ITicketService ticketService;

        public TicketController(ITicketService ticketService)
        {
            this.ticketService = ticketService;
        }

        [Route("")]
        public async Task<IActionResult> GetTickets()
        {
            return Ok(await ticketService.GetTickets());
        }

        [HttpPost]
        [Route("")]
        public async Task<IActionResult> CreateTicket([FromBody] TicketModel ticket)
        {
            await ticketService.CreateTicket(ticket);
            return Ok();
        }

        [HttpPut]
        [Route("")]
        public async Task<IActionResult> EditTicket([FromBody] TicketModel ticket)
        {
            await ticketService.EditTicket(ticket);
            return Ok();
        }
    }
}

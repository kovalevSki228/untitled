using jira.Interface;
using jira.ViewModel;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace jira.Services
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

        public async Task<IActionResult> Get()
        {
            return Ok(await ticketService.Get());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TicketModel ticket)
        {
            await ticketService.Create(ticket);
            return Ok();
        }

        [Route("Edit")]
        [HttpPut]
        public async Task<IActionResult> Edit([FromBody] TicketModel ticket)
        {
            await ticketService.Edit(ticket);
            return Ok();
        }
    }
}

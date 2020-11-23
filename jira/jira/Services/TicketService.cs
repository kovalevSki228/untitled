using jira.Interface;
using jira.Model;
using jira.ViewModel;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace jira.Services
{
    public class TicketService : ITicketService
    {
        private readonly JiraContext dbContext;

        public TicketService(JiraContext context)
        {
            dbContext = context;
        }

        public async Task<IEnumerable<TicketModel>> Get()
        {
            var tickets = await dbContext.Tickets.Include(t => t.Labels).ToListAsync();
            return tickets.Select(t => new TicketModel()
            {
                Id = t.Id,
                CategoryId = t.CategoryId,
                Description = t.Description,
                Title = t.Title,
                Labels = t.Labels.Select(t => new string(t.Text)).ToArray()
            });
        }

        public async Task Create(TicketModel ticket)
        {
            var labels = await CreateLabels(ticket.Labels.Distinct());
            dbContext.Add(new Ticket()
            {
                Title = ticket.Title,
                CategoryId = ticket.CategoryId,
                Description = ticket.Description,
                Labels = labels.ToList()
            });
            await dbContext.SaveChangesAsync();
        }

        public async Task Edit(TicketModel ticket)
        {
            var labels = await CreateLabels(ticket.Labels.Distinct());

            var updatedTicket = dbContext.Tickets.Include(t => t.Labels).First(t => t.Id == ticket.Id);
            updatedTicket.CategoryId = ticket.CategoryId;
            updatedTicket.Title = ticket.Title;
            updatedTicket.Description = ticket.Description;
            updatedTicket.Labels = labels.ToList();

            await dbContext.SaveChangesAsync();
        }

        private async Task<IEnumerable<Label>> CreateLabels(IEnumerable<string> textLabels)
        {
            var existingLabels = await dbContext.Labels.Where(label => textLabels.Contains(label.Text)).ToListAsync();
            var newLabels = textLabels
                .Where(textLabel => existingLabels.All(el => el.Text != textLabel))
                .Select(t => new Label() { Text = t })
                .ToList();

            dbContext.Labels.AddRange(newLabels);
            await dbContext.SaveChangesAsync();
            return existingLabels.Concat(newLabels);
        }
    }
}

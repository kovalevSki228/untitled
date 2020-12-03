using Jira.Interface;
using Jira.Model;
using Jira.ViewModel;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Jira.Services
{
    public class TicketService : ITicketService
    {
        private readonly JiraContext dbContext;

        public TicketService(JiraContext context)
        {
            dbContext = context;
        }

        public async Task<IEnumerable<TicketModel>> GetTickets()
        {
            var tickets = await dbContext.Tickets.Include(t => t.Labels).ToListAsync();
            return tickets.Select(t => new TicketModel()
            {
                Id = t.Id,
                CategoryId = t.CategoryId,
                Description = t.Description,
                Title = t.Title,
                Labels = t.Labels.Select(t => t.Text)
            });
        }

        public async Task CreateTicket(TicketModel ticket)
        {
            var labels = await GetLabels(dbContext.Labels, ticket.Labels);


            dbContext.Add(new Ticket()
            {
                Title = ticket.Title,
                CategoryId = ticket.CategoryId,
                Description = ticket.Description,
                Labels = labels != null
                ? labels.ToList()
                : null
            });
            await dbContext.SaveChangesAsync();
        }

        public async Task UpdateTicket(TicketModel ticket)
        {
            var labels = await GetLabels(dbContext.Labels, ticket.Labels);
            var updatedTicket = dbContext.Tickets.Include(t => t.Labels).First(t => t.Id == ticket.Id);

            updatedTicket.CategoryId = ticket.CategoryId;
            updatedTicket.Title = ticket.Title;
            updatedTicket.Description = ticket.Description;
            updatedTicket.Labels = labels.ToList();

            await dbContext.SaveChangesAsync();
        }

        private async Task<IEnumerable<Label>> GetLabels(DbSet<Label> dbLabels, IEnumerable<string> textLabels)
        {
            if (textLabels != null)
            {
                var existingLabels = await dbLabels.Where(label => textLabels.Contains(label.Text)).ToListAsync();
                var newLabels = textLabels
                    .Where(textLabel => existingLabels.All(el => el.Text != textLabel))
                    .Select(t => new Label() { Text = t })
                    .ToList();

                return existingLabels.Concat(newLabels);
            }

            return null;
        }
    }
}

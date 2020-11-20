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

        public async Task<IEnumerable<Ticket>> Get()
        {
            return await dbContext.Tickets.ToListAsync();
        }

        public async Task Create(TicketModel ticket)
        {
            dbContext.Add(new Ticket()
            {
                Title = ticket.Title,
                CategoryId = ticket.CategoryId,
                Description = ticket.Description,
                //  Labels = await CreateLabels(ticket.Labels)
            });
            await dbContext.SaveChangesAsync();
        }

        public async Task Edit(Ticket ticket)
        {
            dbContext.Update(ticket);
            await dbContext.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var ticket = await dbContext.Tickets.FindAsync(id);
            dbContext.Tickets.Remove(ticket);
            await dbContext.SaveChangesAsync();
        }

        public async Task<Ticket> Details(int id)
        {
            return await dbContext.Tickets.FirstOrDefaultAsync(t => t.Id == id);
        }

        private async Task<IEnumerable<Label>> CreateLabels(string[] textLabels)
        {
            var existingLabels = await dbContext.Labels.Where(label => textLabels.Contains(label.Text)).ToListAsync();
            var newLabelsTexts = textLabels
                .Where(textLabel => existingLabels.All(el => el.Text != textLabel))
                .Select(t => new Label() { Text = t, Tickets = new List<Ticket>() }).ToList();
            //dbContext.Add(newLabelsTexts);
            //await dbContext.SaveChangesAsync();
            return existingLabels.Concat(newLabelsTexts);
        }
    }
}

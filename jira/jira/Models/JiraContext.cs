using Microsoft.EntityFrameworkCore;

namespace Jira.Model
{
    public class JiraContext : DbContext
    {
        public JiraContext(DbContextOptions<JiraContext> options)
            : base(options)
        {
            Database.Migrate();
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Label> Labels { get; set; }
    }
}

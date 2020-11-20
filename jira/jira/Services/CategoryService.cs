using jira.Interface;
using jira.Model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace jira.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly JiraContext dbContext;

        public CategoryService(JiraContext context)
        {
            dbContext = context;
        }

        public async Task<IEnumerable<Category>> Get()
        {
            return await dbContext.Categories.ToListAsync();
        }

        public async Task Create(Category category)
        {
            dbContext.Add(category);
            await dbContext.SaveChangesAsync();
        }

        public async Task Edit(Category category)
        {
            dbContext.Update(category);
            await dbContext.SaveChangesAsync();
        }

        public async Task DeleteConfirmed(int id)
        {
            var category = await dbContext.Categories.FindAsync(id);
            dbContext.Categories.Remove(category);
            await dbContext.SaveChangesAsync();
        }
    }
}

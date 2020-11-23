using Jira.Interface;
using Jira.Model;
using Jira.ViewModel;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Jira.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly JiraContext dbContext;

        public CategoryService(JiraContext context)
        {
            dbContext = context;
        }

        public async Task<IEnumerable<Category>> GetCategories()
        {
            return await dbContext.Categories.ToListAsync();
        }

        public async Task CreateCategory(CategoryModel category)
        {
            dbContext.Add(new Category()
            {
                Title = category.Title,
                Order = category.Order
            });
            await dbContext.SaveChangesAsync();
        }

        public async Task EditCategory(Category category)
        {
            dbContext.Update(category);
            await dbContext.SaveChangesAsync();
        }

        public async Task DeleteCategory(int id)
        {
            var category = await dbContext.Categories.FindAsync(id);
            dbContext.Categories.Remove(category);
            await dbContext.SaveChangesAsync();
        }
    }
}

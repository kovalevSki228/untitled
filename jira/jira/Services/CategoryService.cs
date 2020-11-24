using Jira.Interface;
using Jira.Model;
using Jira.ViewModel;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<IEnumerable<CategoryModel>> GetCategories()
        {
            var categories = await dbContext.Categories.ToListAsync();
            return categories.Select(c => new CategoryModel()
            {
                Id = c.Id,
                Title = c.Title,
                Order = c.Order
            });
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

        public async Task EditCategory(CategoryModel category)
        {
            var updatingCategory = dbContext.Categories.First(c => c.Id == category.Id);
            updatingCategory.Order = category.Order;
            updatingCategory.Title = category.Title;

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

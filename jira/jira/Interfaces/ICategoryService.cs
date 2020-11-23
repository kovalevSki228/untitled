using Jira.Model;
using Jira.ViewModel;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Jira.Interface
{
    public interface ICategoryService
    {
        Task<IEnumerable<Category>> GetCategories();

        Task CreateCategory(CategoryModel category);

        Task EditCategory(Category category);

        Task DeleteCategory(int id);
    }
}

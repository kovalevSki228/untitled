using Jira.ViewModel;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Jira.Interface
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryModel>> GetCategories();

        Task CreateCategory(CategoryModel category);

        Task UpdateCategory(CategoryModel category);

        Task DeleteCategory(int id);
    }
}

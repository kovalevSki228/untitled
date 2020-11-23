using Jira.Model;
using Jira.ViewModel;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Jira.Interface
{
    public interface ICategoryService
    {
        Task<IEnumerable<Category>> Get();

        Task Create(CategoryModel category);

        Task Edit(Category category);

        Task Delete(int id);
    }
}

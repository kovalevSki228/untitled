using jira.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace jira.Interface
{
    public interface ICategoryService
    {
        Task<IEnumerable<Category>> Get();

        Task Create(Category category);

        Task Edit(Category category);

        Task DeleteConfirmed(int id);
    }
}

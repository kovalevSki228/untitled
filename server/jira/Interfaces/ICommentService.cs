using Jira.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Jira.Interfaces
{
    public interface ICommentService
    {
        Task<IEnumerable<CommentModel>> GetComments();

        Task CreateComment(CommentModel comment);
    }
}

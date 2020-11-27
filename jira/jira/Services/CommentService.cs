using Jira.Interfaces;
using Jira.Model;
using Jira.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Jira.Services
{
    public class CommentService : ICommentService
    {
        private readonly JiraContext dbContext;

        public CommentService(JiraContext context)
        {
            dbContext = context;
        }

        public async Task<IEnumerable<CommentModel>> GetComments()
        {
            var comments = await dbContext.Comments.ToListAsync();
            return comments.Select(c => new CommentModel()
            {
                Id = c.Id,
                AuthorId = c.AuthorId,
                TicketId = c.TicketId,
                Content = c.Content,
                DateTime = c.DateTime
            });
        }

        public async Task CreateComment(CommentModel comment)
        {
            dbContext.Comments.Add(new Comment()
            {
                TicketId = comment.TicketId,
                AuthorId = comment.AuthorId,
                Content = comment.Content,
                DateTime = (DateTime)comment.DateTime
            });
            await dbContext.SaveChangesAsync();
        }
    }
}

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
            var author = await dbContext.Users.ToListAsync();
            return comments.Select(c => new CommentModel()
            {
                Id = c.Id,
                Author = new AuthorModel() { Email = author.SingleOrDefault(a => a.Id == c.AuthorId).Email },
                TicketId = c.TicketId,
                Content = c.Content,
                CreateAt = c.CreateAt
            });
        }

        public async Task CreateComment(CommentModel comment)
        {
            dbContext.Comments.Add(new Comment()
            {
                TicketId = comment.TicketId,
                AuthorId = comment.Author.Id,
                Content = comment.Content,
                CreateAt = (DateTime)comment.CreateAt
            });
            await dbContext.SaveChangesAsync();
        }
    }
}

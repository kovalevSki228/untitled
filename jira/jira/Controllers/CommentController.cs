using Jira.Interfaces;
using Jira.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Jira.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : Controller
    {
        private readonly ICommentService commentService;

        public CommentController(ICommentService commentService)
        {
            this.commentService = commentService;
        }

        [HttpGet]
        [Route("")]
        public async Task<IEnumerable<CommentModel>> GetCategories()
        {
            return await commentService.GetComments();
        }

        [HttpPost]
        [Route("")]
        public async Task<IActionResult> CreateCategory([FromBody] CommentModel comment)
        {
            await commentService.CreateComment(comment);
            return Ok();
        }
    }
}

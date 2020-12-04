using Jira.Interfaces;
using Jira.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Jira.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CommentController : Controller
    {
        private readonly ICommentService commentService;

        public CommentController(ICommentService commentService)
        {
            this.commentService = commentService;
        }

        [HttpGet]
        [Route("")]
        public async Task<IEnumerable<CommentModel>> GetComments()
        {
            return await commentService.GetComments();
        }

        [HttpPost]
        [Route("")]
        public async Task<IActionResult> CreateComments([FromBody] CommentModel comment)
        {
            await commentService.CreateComment(comment);
            return Ok();
        }
    }
}

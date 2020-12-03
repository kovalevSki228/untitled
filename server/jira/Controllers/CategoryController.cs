using Jira.Interface;
using Jira.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Jira.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CategoryController : Controller
    {
        private readonly ICategoryService categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            this.categoryService = categoryService;
        }

        [HttpGet]
        [Route("")]
        public async Task<IEnumerable<CategoryModel>> GetCategories()
        {
            return await categoryService.GetCategories();
        }

        [HttpPost]
        [Route("")]
        public async Task<IActionResult> CreateCategory([FromBody] CategoryModel category)
        {
            await categoryService.CreateCategory(category);
            return Ok();
        }

        [HttpPut]
        [Route("")]
        public async Task<IActionResult> UpdateCategory([FromBody] CategoryModel category)
        {
            await categoryService.UpdateCategory(category);
            return Ok();
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            await categoryService.DeleteCategory(id);
            return Ok();
        }
    }
}

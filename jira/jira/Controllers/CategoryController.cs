using Jira.Interface;
using Jira.Model;
using Jira.ViewModel;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Jira.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : Controller
    {
        private readonly ICategoryService categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            this.categoryService = categoryService;
        }

        [HttpGet]
        [Route("")]
        public async Task<IEnumerable<Category>> GetCategories()
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
        public async Task<IActionResult> EditCategory([FromBody] Category category)
        {
            await categoryService.EditCategory(category);
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

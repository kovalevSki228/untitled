using jira.Interface;
using jira.Model;
using jira.ViewModel;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace jira.Controllers
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
        public async Task<IEnumerable<Category>> Get()
        {
            return await categoryService.Get();
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CategoryModel category)
        {
            await categoryService.Create(category);
            return Ok();
        }

        [HttpPut]
        [Route("Edit")]
        public async Task<IActionResult> Edit([FromBody] Category category)
        {
            await categoryService.Edit(category);
            return Ok();
        }

        [HttpDelete]
        [Route("Delete/{id}")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            await categoryService.Delete(id);
            return Ok();
        }
    }
}

using jira.Interface;
using jira.Model;
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

        public async Task<IEnumerable<Category>> Get()
        {
            return await categoryService.Get();
        }

        [Route("Create")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Category category)
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
        [Route("Delete")]
        public async Task<IActionResult> DeleteConfirmed([FromBody] int id)
        {
            await categoryService.DeleteConfirmed(id);
            return Ok();
        }
    }
}

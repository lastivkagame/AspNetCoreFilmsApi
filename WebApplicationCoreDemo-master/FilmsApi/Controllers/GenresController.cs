using FilmsApi.Data;
using FilmsApi.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FilmsApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GenresController : ControllerBase
    {

        private readonly ApplicationContext _dbContext;

        public GenresController(ApplicationContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IEnumerable<GenreDTO> Get(int count = 10)
        {
            return _dbContext.Genres.Select(x => new GenreDTO
            {
                Id = x.Id,
                Name = x.Name,

            });
        }

        [HttpPost]
        public async Task<IActionResult> Add(GenreDTO genre)
        {
            if (genre == null)
            {
                return BadRequest();
            }

            _dbContext.Films.Add(new Film
            {
                Name = genre.Name,
            });

            await _dbContext.SaveChangesAsync();

            return Ok();
        }
    }
}

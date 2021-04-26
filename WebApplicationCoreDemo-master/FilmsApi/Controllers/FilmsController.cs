using FilmsApi.Data;
using FilmsApi.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FilmsApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FilmsController : ControllerBase
    {
        private readonly ApplicationContext _dbContext;

        public FilmsController(ApplicationContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IEnumerable<FilmDTO> Get(int count = 10)
        {
            return _dbContext.Films.Include(x => x.Genre).Select(x => new FilmDTO
            {
                Id = x.Id,
                Name = x.Name,
                Rating = x.Rating,
                GenreId = x.Genre.Id,
                GenreName = x.Genre.Name,
                FilmImage = x.FilmImage
            });
        }


        [HttpPost]
        public async Task<ActionResult<FilmDTO>> POST(FilmDTO film)
        {
            if (film == null)
            {
                return BadRequest();
            }

            //bool flag = true;
            //foreach (var item in _dbContext.Genres)
            //{
            //    if (item.Name == film.GenreName)
            //    {
            //        flag = false;
            //    }
            //}

            //if (flag)
            //{
            //    _dbContext.Genres.Add(new Genre
            //    {
            //        Name = film.Name,
            //    });

            //    await _dbContext.SaveChangesAsync();
            //}

            _dbContext.Films.Add(new Film
            {
                Name = film.Name,
                Rating = film.Rating,
                Genre = _dbContext.Genres.FirstOrDefault(x => x.Name == film.GenreName),
                FilmImage = film.FilmImage
            });

            await _dbContext.SaveChangesAsync();

            return Ok(film);
            //     return CreatedAtAction(
            //nameof(film),
            //new { id = film.Id },
            //ItemToDTO(new Film
            //{
            //    Name = film.Name,
            //    Rating = film.Rating,
            //    Genre = _dbContext.Genres.FirstOrDefault(x => x.Name == film.GenreName),
            //    FilmImage = film.FilmImage
            //}));
        }

        private static FilmDTO ItemToDTO(Film todoItem) =>
    new FilmDTO
    {
        Id = todoItem.Id,
        Name = todoItem.Name,
        Rating = todoItem.Rating,
        GenreId = todoItem.Genre.Id,
        GenreName = todoItem.Genre.Name,
        FilmImage = todoItem.FilmImage
    };

        //DELETE: api/TodoItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var todoItem = await _dbContext.Films.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            _dbContext.Films.Remove(todoItem);
            await _dbContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, FilmDTO filmDTO)
        {
            if (id != filmDTO.Id)
            {
                return BadRequest();
            }

            var todoItem = await _dbContext.Films.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            todoItem.Name = filmDTO.Name;
            todoItem.Name = filmDTO.Name;
            todoItem.Rating = filmDTO.Rating;
            todoItem.Genre = _dbContext.Genres.FirstOrDefault(x => x.Name == filmDTO.GenreName);
            todoItem.FilmImage = filmDTO.FilmImage;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!TodoItemExists(id))
            {
                return NotFound();
            }

            return NoContent();
        }

        private bool TodoItemExists(long id) =>
     _dbContext.Films.Any(e => e.Id == id);
    }
}

// CRUD
// C - Post
// R - Get
// U - Put
// D - Delete
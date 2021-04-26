using System.ComponentModel.DataAnnotations;

namespace FilmsApi.Data
{
    public class Film
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public double Rating { get; set; }

        public Genre Genre { get; set; }
        public string FilmImage { get; set; }
    }
}

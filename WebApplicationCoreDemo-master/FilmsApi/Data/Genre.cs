using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FilmsApi.Data
{
    public class Genre
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<Film> Films { get; set; }

        public Genre()
        {
            Films = new List<Film>();
        }
    }
}

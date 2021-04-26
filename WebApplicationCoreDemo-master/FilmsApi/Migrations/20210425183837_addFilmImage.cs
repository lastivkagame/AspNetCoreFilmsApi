using Microsoft.EntityFrameworkCore.Migrations;

namespace FilmsApi.Migrations
{
    public partial class addFilmImage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.AddColumn<string>(
            //    name: "FilmImage",
            //    table: "Films",
            //    nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
               name: "FilmImage",
               table: "Films",
               nullable: true);

            //migrationBuilder.DropColumn(
            //    name: "FilmImage",
            //    table: "Films");
        }
    }
}

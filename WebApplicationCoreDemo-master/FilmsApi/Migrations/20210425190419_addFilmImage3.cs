using Microsoft.EntityFrameworkCore.Migrations;

namespace FilmsApi.Migrations
{
    public partial class addFilmImage3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
              name: "FilmImage",
              table: "Films",
              nullable: true);
        }
    }
}

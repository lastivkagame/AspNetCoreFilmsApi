//let data2;
//let genres;
let url_genres = "https://localhost:44342/api/genres";

onload = async () => {
    var responce = await fetch(url_genres);
    let data2 = await responce.json();

    console.log(data2);


    let genre_container = document.getElementById("GenreContainer");
    if (genre_container != null) {
        //genre_container.innerHTML="";
        //genres = data2;

        for (let i = 0; i < data2.length; i++) {
            genre_container.innerHTML += `<button type='button' onclick='SetGenre("${data2[i].name}")' class='btn btn-outline-secondary'> ${data2[i].name} </button>`;
        }

        // console.log("up data");
    }

    //AddGenreButtons();
}

function SetGenre(data) {
    document.getElementById("InputGendre").value = data;
}
let url = "https://localhost:44342/films";
let data;
let genres;

function DeleteFIlm(id) {
    var url = `https://localhost:44342/films`;

    fetch(`${url}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));

    alert("Success deleted from DB!");
    RefreshPage();
}

function RefreshPage() {
    location.reload();
}

//let url_genres = "https://localhost:44342/api/genres";

// onload = async () => {
//     var responce = await fetch(url_genres);
//     genres = await responce.json();

//     console.log(data2);
// }

function RefreshFilms() {

    try {
        //location.reload();
        let film_container = document.getElementById("FilmsContainer");

        if (film_container != null) {
            film_container.innerHTML = "";
            
            
            onload = async () => {
                var responce = await fetch(url);
                data = await responce.json();
                
                console.log(data);

                //let film_container = document.getElementById("FilmsContainer");
                //film_container.innerHTML="";

                for (let i = 0; i < data.length; i++) {


                    let ready_code_card = "<div class='portfolio-item'><a class='portfolio-link' data-toggle='modal' href='#portfolioModal1'><div class='portfolio-hover'><div class='portfolio-hover-content'><i class='fas fa-plus fa-3x'></i></div> </div><img class='img-fluid' src=" + data[i].filmImage + " alt='' /> </a>  <div class='portfolio-caption'> <div class='portfolio-caption-heading'>" + data[i].name + "</div><div class='portfolio-caption-subheading text-muted'>ID: " + data[i].id + "<br /> Rating: " + data[i].rating + "<br />" + " Genre: " + data[i].genreId + "<br /> GenreName: " + data[i].genreName + "<br /> </div><div class='d-flex justify-content-around'> <button class='btn btn-primary' onclick='DeleteFIlm(" + data[i].id + ")'>Delete</button><button class='btn btn-primary' onclick='EditFilm(" + data[i].id + ")'>Edit</button></div></div></div></div>";
                    let card_container = document.createElement("div");

                    card_container.classList.add("col-lg-4");
                    card_container.classList.add("col-sm-6");
                    card_container.classList.add("mb-4");

                    card_container.innerHTML += ready_code_card;

                    film_container.appendChild(card_container);
                }

            }
        }
    }
    catch (ex) {
        console.log("Something went wrong!");
    }
    console.log("work refreshfilms function");
    // alert();
}

RefreshFilms();


function SetGenre(data) {
    document.getElementById("InputGendre").value = data;
}


let url2 = "https://localhost:44342/api/genres";
function AddGenreButtons() {
    onload = async () => {
        var responce = await fetch(url2);
        data2 = await responce.json();

        console.log(data2);
    }
        let genre_container = document.getElementById("GenreContainer");
        if (genre_container != null) {
            //genre_container.innerHTML="";
            genres = data2;

            for (let i = 0; i < data2.length; i++) {
                genre_container.innerHTML += `<button type='button' onclick='SetGenre("${data2[i].name}")' class='btn btn-outline-secondary'> ${data2[i].name} </button>`;
            }
        }

        // console.log("up data");
    
}


let currect_elem_id=0;

async function EditFilm(itemId){

    //let edit = document.getElementById("EditCoontainer").style.display = "block";
   window.location = "addFilm.html";

    alert(itemId);

    document.getElementById("EditText").innerText = "Edit";
    document.getElementById("CreateBtn").onclick = "EditCoontainer()";
    document.getElementById("FilmName").value = data[currect_elem_id].name;

    currect_elem_id=itemId;
}

function EditCoontainer(){
    let film = {
        isComplete: false,
        name: document.getElementById("FilmName").value,
        rating: document.getElementById("InputRating").value,
        genreName: document.getElementById("InputGendre").value,
        filmImage: document.getElementById("InputImageUrl").value,
        GenreId: 0,
    }

    fetch(`${url}/${currect_elem_id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(film)
      })
      .then(() => getItems())
      .catch(error => console.error('Unable to update item.', error));

      document.getElementById("EditText").innerText = "Create";
      document.getElementById("CreateBtn").onclick = "AddFIlmToBD()";
}

//I try different ways, but now i really don't know why it doesn't work and  don't have time to know why it, 
//thenfore please write me why and how it fix(with 'edit' similarly)
async function AddFIlmToBD() {

    //const addNameTextbox = document.getElementById('add-name');

    let film = {
        isComplete: false,
        name: document.getElementById("FilmName").value,
        rating: document.getElementById("InputRating").value,
        genreName: document.getElementById("InputGendre").value,
        filmImage: document.getElementById("InputImageUrl").value,
        GenreId: 0,
    }

    console.log(film);
/*
    // let flag = true;
    // for (let j = 0; j < genres.length; j++) {
    //     if (genres[j].name == film.genreName) {
    //         flag = false;
    //         film.GenreId = genres[j].id;
    //         break;
    //     }
    // }

    // if (flag) {
    //     let gen = {
    //         name: document.getElementById("InputGendre").value
    //     };

    //     fetch(url2, {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'api/genres/json',
    //             'Content-Type': 'api/genres/json'
    //         },
    //         body: JSON.stringify(gen)
    //     })
    //         .then(response => response.json())
    //         .then(() => {
    //             getItems();
    //             //addNameTextbox.value = '';
    //         })
    //         .catch(error => console.error('Unable to add item.', error));

    //     AddGenreButtons();

    //     for (let j = 0; j < genres.length; j++) {
    //         if (genres[j].name == film.genreName) {
    //             flag = false;
    //             film.GenreId = genres[j].id;
    //             break;
    //         }
    //     }
    // }

    // const item = {
    //   isComplete: false,
    //   name: addNameTextbox.value.trim()
    // };

    const response = await fetch(url, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(film)
    });
    if (response.ok === true) {
        const user = await response.json();
        reset();
        //document.querySelector("tbody").append(row(film));
    }


    // fetch(url, {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'films/json',
    //         'Content-Type': 'films/json'
    //     },
    //     body: JSON.stringify(film)
    // })
    //     .then(response => response.json())
    //     .then(() => {
    //         getItems();
    //         //addNameTextbox.value = '';
    //     })
    //     .catch(error => console.error('Unable to add item.', error));*/



    alert("Success!");
    //window.location.href = "index.html";
    //RefreshPage();
}



// function addItem() {
//     const addNameTextbox = document.getElementById('add-name');

//     const item = {
//       isComplete: false,
//       name: addNameTextbox.value.trim()
//     };
// let filmImage = document.createElement("img");
// filmImage.src= data[i].filmImage;

// let card_container = document.createElement("div");

// card_container.classList.add("col-lg-4");
// card_container.classList.add("col-sm-6");
// card_container.classList.add("mb-4");

// let card_portfolio_container = document.createElement("div");
// card_portfolio_container.classList.add("portfolio-item");

// let ImgContainer = document.createElement("a");
// ImgContainer.classList.add
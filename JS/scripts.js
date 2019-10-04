//Jquery function to make sure no code is run until the HTMLis fully loaded
$(function(){
    //When the page is loaded, the card should be hidden by default.
    $("#pokemonInfoCard").hide();

    //Set upt the event handler for when the search button is used.
    $("#search").click(function(){
        //Get the input from the searchbar
        let pokemonNameOrId = $("#pokemonInput"). val().toLowerCase();

        //Clear the input from the search bar
        //$("#pokemonInput").val() = 0;

        //Remove old info from the list
        $("pokemonInformationList").html("");

        getPokemonInfo(pokemonNameOrId);
    });

    function determineBackgroundColor(type) {
        switch (type) {
            case "bug":
                return "#A6B51D";
            case "dark":
                return "#4D392C";
            case "dragon":
                return "#735CDB";
            case "electric":
                return "#FCBB17";
            case "fairy":
                return "#EFA8EF";
            case "fighting":
                return "#7E321B";
            case "fire":
                return "#EA3E0D";
            case "flying":
                return "#9DAEF7";
            case "ghost":
                return "#5F5FB2";
            case "grass":
                return "#72C235";
            case "ground":
                return "#D1B055";
            case "ice":
                return "#6DD3F5";
            case "normal":
                return "#B8B1A6";
            case "poison":
                return "#924593";
            case "psychic":
                return "#EA457E";
            case "rock":
                return "#A68E44";
            case "steel":
                return "#B3B3C2";
            case "water":
                return "#2079D2";
            default:
                return "#000";
        }
    }

    //Function to retrieve in formation about a pokemon character
    function getPokemonInfo(nameOrId) {
        //Connect to the web server
        //Do this with the response

        //We need a way to asynchronously handle making the api call and do stuff when we get a response since we don't know how long it will take to get a response.

        //If we tried to write synchronou code (code that runs one line after another) this could cause problems if we try to pull information from the API information from the API response before we get it back.

        $.ajax({
            url: "https://pokeapi.co/api/v2/pokemon/" + nameOrId,
            type: "GET",
            //If the request is successful
            success: function(result) {
                //Get the name from JSON
                let name = result.name;

                //Get the sprite link
                let spriteLink = result.sprites.front_default;

                //Get the ID
                let id = result.id;

                //get the weight
                let weight = result.weight

                //get the types the pokemon has
                let types = result.types;

                $("#pokemonName").html(name.toUpperCase());
                $("#pokemonImage").attr("src", spriteLink);
                $("#pokemonInformationList").append("<li class='list-group-item'>ID: " + id + "</li>");

                $("#pokemonInformationList").append("<li class='list-group-item'>ID: " + weight + "</li>");

                for (type of types) {
                    //We need to create a new list item, configure it, and append it to our list of info
                    let li = document.createElement("li");
                    li.classList.add("list-group-item");
                    li.classList.add("text-capitalize");
                    li.innerHTML = type.type.name;
                    li.style.backgroundColor = determineBackgroundColor(type.type.name);

                    $("#pokemonInformationList").append(li);
                }

                //Make the card reappear
                $("#pokemonInfoCard").show();
            },
            //The function we pass in here will be called if our request fails
            error: function(error) {
                console.log(error);
            }
        });
    }
});
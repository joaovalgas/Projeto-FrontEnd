const searchInput = document.getElementById('search-input');
const resultArtists = document.getElementById('result-artist');
const resultPlaylists = document.getElementById('results-playlist');
const message = document.getElementById('greeting');
const actualDate = new Date();

function requestApi(searchTerm){
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result))
}

function displayResults(result){
    resultPlaylists.classList.add('hidden');

    const artistName = document.getElementById('artist-name');
    const artisImg = document.getElementById('artist-img');

    result.forEach(element => {
        artistName.innerText = element.name;
        artisImg.src = element.urlImg;
    });

    resultArtists.classList.remove('hidden');
}

window.addEventListener('load', ()=>{
    let hours = actualDate.getHours();

    if(hours > 4 &&  hours < 12){
        message.textContent = 'Bom dia!';
    }
    else if(hours >= 12 && hours < 18){
        message.textContent = 'Boa tarde!';
    }
    else{
        message.textContent = 'Boa noite!';
    }
});

document.addEventListener('input', function(){
    console.log(searchInput.value);
    const searchTerm = searchInput.value.toLowerCase();

    if(searchTerm === ''){
        resultPlaylists.classList.remove('hidden');
        resultArtists.classList.add('hidden');
        return;
    }

    requestApi(searchTerm);
    
});
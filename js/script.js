const pokemonName = document.querySelector('.pokemon-name')
const pokemonNumber = document.querySelector('.pokemon-number')
const pokemonImage =  document.querySelector('.pokemon-image')
const form = document.querySelector('.form')
const inputSearch = document.querySelector('#input-search')
const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')

let searchPokemon = 1

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`
    )

    if(APIResponse.status === 200) {
        const data = await APIResponse.json()
        return data
        console.log(data)
    } 
}


const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = ''

    const data = await fetchPokemon(pokemon)

    if(data) {
        pokemonImage.style.display = 'block'  //faz a imagem aparcer se tiver tudo certo
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        searchPokemon = data.id
    } else {
        pokemonImage.style.display = 'none'  //faz a imagem sumir se o nome estiver errado
        pokemonName.innerHTML = 'Not found :C'
        pokemonNumber.innerHTML = ''
    }
}

form.addEventListener('submit', function(evento) {
    evento.preventDefault()

    renderPokemon(inputSearch.value.toLowerCase())
    inputSearch.value = ''
})

btnPrev.addEventListener('click', function(evento) {
    if(searchPokemon > 1) {
        searchPokemon -= 1
        renderPokemon(searchPokemon)
    }
})

btnNext.addEventListener('click', function(evento) {
    if(searchPokemon < 905) {
        searchPokemon += 1
        renderPokemon(searchPokemon)
    }
})

renderPokemon(searchPokemon)

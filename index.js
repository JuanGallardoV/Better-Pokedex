const pokemons = []

document.querySelector("#addBtn").addEventListener("click", () => {
    let name = document.querySelector("#name").value
    let desc = document.querySelector("#desc").value
    let legend =  document.querySelector("#legend").checked
    let type = document.querySelector("#type").value
    let pokemon = {}
    //Cambiar: Agregar validaciones
    pokemon.name = name
    pokemon.desc = desc
    pokemon.legend = legend
    pokemon.type = type
    pokemons.push(pokemon)
    loadData()
    //Cerrar Modal
    $('#addModal').modal('hide')
    //Mostrar Toast
    $('#toast').toast('show')
})
const loadData = () => {
    let container = document.querySelector('#cards-container')
    container.innerHTML= ''
    for(let i=0; i<pokemons.length; ++i) {
        let p = pokemons[i]
        //Cambiar: Agregar lo de legendario
        //Card
        let card = document.createElement('div')
        card.classList.add('card')
        card.setAttribute('id', `${p.type}`)
        card.innerHTML = `
                <div class="card__icon">
                    <i class="fas fa-${p.type}"></i>
                    ${p.name}
                </div>
                <h2 class="card__title">${p.desc}</h2>
                <p class="card__apply">
                    <a class="card__link" onClick="deletePokemon(${i})">Eliminar <i class="fas fa-arrow-right"></i></a>
                </p>
        `
        container.appendChild(card)
        //Cambiar: Limpiar el modal
        resetModal()
    }
}

const deletePokemon = async function(id){
    console.log(pokemons, pokemons[id])
    let res = await Swal.fire({
        title:`¿Desea enviar al Profesor Oak el Pokémon ${pokemons[id].name}?`,
        showCancelButton:true,
        confirmButtonText:"Si, enviar!"
      });
      if(res.isConfirmed){
        pokemons.splice(id,1);
        loadData();
        Swal.fire("Pokémon enviado al Profesor Oak!");
      }else {
        Swal.fire("Operación Cancelada");
      }
}

const resetModal = () => {
    document.querySelector('#name').value = ''
    document.querySelector('#desc').value = ''
    document.querySelector('#noLegend').checked = true
    document.querySelector('#type').value = 'leaf'
}
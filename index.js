const pokemons = []

document.querySelector("#addBtn").addEventListener("click", () => {
    let name = document.querySelector("#name")
    let desc = document.querySelector("#desc")
    let legend = document.querySelector("#legend").checked
    let type = document.querySelector("#type").value
    let pokemon = {}
    pokemon.name = name.value
    pokemon.desc = desc.value
    pokemon.legend = legend
    pokemon.type = type
    if (!name.value || name.value === '') {
        name.focus()
        alert('Ingrese un nombre')
    } else if (!desc.value || desc.value === '') {
        desc.focus()
        alert('Ingrese una descripción')
    } else {
        pokemons.push(pokemon)
        loadData()
        //Cerrar Modal
        $('#addModal').modal('hide')
        //Mostrar Toast
        toast(pokemon.name)
        $('#toast').toast('show')
    }
})
const loadData = () => {
    let container = document.querySelector('#cards-container')
    if (pokemons.length == 0) {
        container.innerHTML = `
        <div class="rotomdex">
                <img src="assets/rotomDex.webp" alt="" id="rotom">
            <div class="speech">¡Hola!<br/>Prueba a añadir un Pokémon con el '+'</div>
            </div>
        `
    } else {
        container.innerHTML = ''
        for (let i = 0; i < pokemons.length; ++i) {
            let p = pokemons[i]
            //Card
            let card = document.createElement('div')
            card.classList.add('card')
            card.setAttribute('id', `${p.type}`)
            if (p.legend) {
                card.innerHTML = `
                    <div class="card__icon">
                        <i class="fas fa-${p.type}"></i>
                        ${p.name}
                    </div>
                    <p class="card__ball"><img src="assets/masterball.png" class="rounded me-2" id="masterball" alt="..."></p>
                    <h2 class="card__title">${p.desc}</h2>
                    <p class="card__apply">
                        <a class="card__link" onClick="deletePokemon(${i})">Eliminar <i class="fas fa-arrow-right"></i></a>
                    </p>
            `
            } else {
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
            }
            container.appendChild(card)
            //Limpiar el modal
            resetModal()
        }
    }
}

const deletePokemon = async function (id) {
    console.log(pokemons, pokemons[id])
    let res = await Swal.fire({
        title: `¿Desea liberar al Pokémon ${pokemons[id].name}?`,
        showCancelButton: true,
        confirmButtonText: "Si",
        cancelButtonText: 'No'
    });
    if (res.isConfirmed) {
        pokemons.splice(id, 1);
        loadData();
        Swal.fire("Pokémon liberado");
    } else {
        Swal.fire("¡Cancelado!");
    }
}

const resetModal = () => {
    document.querySelector('#name').value = ''
    document.querySelector('#desc').value = ''
    document.querySelector('#noLegend').checked = true
    document.querySelector('#type').value = 'leaf'
    document.querySelector('#alert').innerHTML = ''
}

document.querySelector("#cancelBtn").addEventListener("click", () => {
    resetModal()

})

const alert = (message) => {
    const wrapper = document.querySelector('#alert')
    wrapper.innerHTML = `
    <div class="alert alert-danger d-flex align-items-center" role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                        </svg>
                        <div>
                          ${message}
                        </div>`
}

const toast = (name) => {
    const wrapper = document.querySelector('body')
    if (document.querySelector('#toast')) {
        document.querySelector('#toast').remove()
    }
    let toast = document.createElement('div')
        toast.innerHTML = `
    <div class="toast fade" role="alert" aria-live="assertive" aria-atomic="true" id="toast" data-bs-delay="2000">
        <div class="toast-header">
            <img src="assets/rotomdex_sprite.png" class="rounded me-2" id="rotomIcon" alt="">
            <strong class="me-auto">RotomDex</strong>
        </div>
        <div class="toast-body">
           Los datos de ${name} se han registrado en la Pokédex
        </div>
    </div>
    `
        wrapper.appendChild(toast)
}

document.addEventListener("DOMContentLoaded",()=>{
    loadData();
});
const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const btnVaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')

let articulosCarrito = []

cargarEventListeners()

function cargarEventListeners(){
    listaCursos.addEventListener('click', agregarCurso)
    carrito.addEventListener('click', eliminarArticulo)
}

// Functions 
function eliminarArticulo(e){
    if(e.target.classList.contains('borrar-curso')){
        const articuloId = e.target.getAttribute('data-id')
        articulosCarrito = articulosCarrito.filter(articulo => articulo.id !== articuloId)
        carritoHtml()
    }

}

function agregarCurso(e){
    e.preventDefault()
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado)
    }
}

function leerDatosCurso(curso){
    const infoCurso = {
        imagen : curso.querySelector('img').src,
        titulo : curso.querySelector('h4').textContent,
        autor : curso.querySelector('.info-card p').textContent,
        precio : curso.querySelector('.precio span').textContent, 
        id : curso.querySelector('a').getAttribute('data-id'),
        cantidad : 1
    }

    const existe = articulosCarrito.some(articulo => articulo.id == infoCurso.id)

    if(existe){
        const articulos = articulosCarrito.map(articulo => {
            if(articulo.id === infoCurso.id){
                articulo.cantidad++
                return articulo
            }else{
                return articulo
            }
        })
        articulosCarrito = [...articulos]
    }else{
        articulosCarrito = [... articulosCarrito, infoCurso]
    }

    // articulosCarrito.push(infoCurso)
    // console.log(articulosCarrito);
    carritoHtml()
}

function carritoHtml(){
    limpiarHtml()
    articulosCarrito.forEach(({titulo, imagen, precio, id, cantidad}) => {
        // const {titulo, imagen, precio, id, cantidad} = articulo;
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>
                <img src = '${imagen}' width=100 />
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;

        contenedorCarrito.appendChild(row)
    })
    
}

function limpiarHtml(){
    // Lo mas as mas facil
    // afecta el rendimiento
    // contenedorCarrito.innerHTML = ''

    // forma eficiente no tan tan tan facil
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}
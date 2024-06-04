const productos = [
    { id: 1, nombre: "Taza personalizada", descripcion: "Taza de ceramica color blanca.", precio: 6700, img: './img/taza.png' },
    { id: 2, nombre: "Taza mágica personalizada", descripcion: "Taza de ceramica color negra.", precio: 9000, img: './img/tazamagica.jpg' },
    { id: 3, nombre: "Remera algodón personalizada", descripcion: "Remera de algodón peinado color negra.", precio: 12500, img: './img/remeraalgodon.jpg' },
    { id: 4, nombre: "Remera modal personalizada", descripcion: "Modal 100% poliester color blanca.", precio: 11000, img: './img/remera.png' },
    { id: 5, nombre: "Fotos polaroid", descripcion: "Papel fotográfico 180gr x10 unidades.", precio: 4400, img: './img/fotopolaroid.jpg' },
];
const costoEnvio = 8000;
let agregarEnvio = false;

cargarProductos();
mostrarCarrito();

const verificarCheckbox = document.querySelector('#envio');
verificarCheckbox.addEventListener('change', () => {
    agregarEnvio = verificarCheckbox.checked;
    mostrarCarrito();
})

//Funciones
function cargarProductos() {
    let catalogo = document.querySelector(".main");
    let html = "";

    for (const producto of productos) {
        html += `
        <div class="card" id="${producto.id}">
            <img src="${producto.img}" alt="${producto.descripcion}">
            <div class="card-body">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <b>$${producto.precio}</b>
                <button class="boton" data-id="${producto.id}">Agregar</button>
            </div>
        </div>
        `;
    }

    catalogo.innerHTML = html;

    document.querySelectorAll(".boton").forEach(btn => {
        btn.addEventListener("click", () => {
            const idProducto = parseInt(btn.getAttribute("data-id"), 10);
            agregarAlCarrito(idProducto);
        });
    });
}

function agregarAlCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const product = productos.find(product => product.id === id);
    const productosEnCarrito = carrito.find(p => p.id === id);

    if (productosEnCarrito) {
        productosEnCarrito.cantidad += 1;
        productosEnCarrito.precioTotal = productosEnCarrito.cantidad * productosEnCarrito.precio;
    } else {
        carrito.push({
            id: product.id,
            nombre: product.nombre,
            precio: product.precio,
            cantidad: 1,
            precioTotal: product.precio
        });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

function mostrarCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let contenedorCarrito = document.querySelector('.carrito');
    let totales = document.querySelector('.totales');
    let carritoHTML = '';

    for (const p of carrito) {
        carritoHTML += `
        <div class="card-carrito" id="${p.id}">
            <h3>${p.nombre}</h3>
            <p>Cantidad: ${p.cantidad}</p>
            <p>Precio: $${p.precio}</p>
            <p>Total: $${p.precioTotal}</p>
            <button class="eliminar" data-id="${p.id}">Eliminar</button>
        </div>
        `;
    }

    contenedorCarrito.innerHTML = carritoHTML;

    document.querySelectorAll('.eliminar').forEach(btn => {
        btn.addEventListener('click', () => {
            let btnEliminar = parseInt(btn.getAttribute('data-id'), 10);
            eliminarDelCarrito(btnEliminar);
        });
    });

    let totalCarrito = carrito.reduce((acc, p) => acc + p.precioTotal, 0);

    if (agregarEnvio) {
        totalCarrito += costoEnvio;
    }

    totales.innerHTML = `Total: $${totalCarrito}
        <button class="eliminar" id="confirmar">Confirmar</button>`;

    carrito.length > 0 ? comprobarPedido("Pedido confirmado!"):comprobarPedido("Selecciona productos para confirmar tu pedido!");
}

function eliminarDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(p => p.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}
function comprobarPedido(dato){
    const btnConfirmar = document.querySelector("#confirmar");
        btnConfirmar.addEventListener('click', () => {
            Swal.fire(dato);
        })
}
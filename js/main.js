let productos = [
    {id:1, nombre: "Taza personalizada", descripcion: "Taza de ceramica color blanca.", precio: 9000, img: './img/taza.png' },
    {id:2, nombre: "Taza mágica personalizada", descripcion: "Taza de ceramica color negra.", precio: 10000, img: './img/tazamagica.jpg' },
    {id:3, nombre: "Remera algodon personalizada", descripcion: "Remera de algodon peinado color negra.", precio: 12500, img: './img/remeraalgodon.jpg' },
    {id:4, nombre: "Remera modal personalizada", descripcion: "Modal 100% poliester color blanca.", precio: 11000, img: './img/remera.png' },
    {id:5, nombre: "Fotos polaroid", descripcion: "Papel fotográfico 180gr x10 unidades.", precio: 4400, img: './img/fotopolaroid.jpg' },
]

function cargarProductos(){
    let catalogo = document.querySelector(".main");
    let html = "";

    for (const producto of productos){
        html += `
        <div class = "card" id = ${producto.id}>
            <img src=${producto.img} alt=${producto.descripcion}>
            <div class= "card-body">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <b>$${producto.precio}</b>
                <button class="boton" data-id=${producto.id}>Agregar</button>
            </div>
        </div>
        `;
    }

    catalogo.innerHTML = html;
}

cargarProductos();
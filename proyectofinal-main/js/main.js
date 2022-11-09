const iva = 0.19;
const carrito = [];
const div = document.getElementById("contenedor")
const filtro = document.getElementById("nombre")
const card = document.getElementsByClassName("card")
const btn = document.getElementById("boton_buscar")
const min =  document.getElementById("minimo")
const max =  document.getElementById("maximo")
const rango = document.getElementById("rango")
const validaRango = document.getElementById("error_rango")

/*clase producto*/
class Producto {
    constructor(nombre, categoria, precio, stock, imagen, miniatura) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
        this.miniatura = miniatura
    }
    
    comprar(cantidad) {
        let cantidadNumero = parseInt(cantidad);
        let precioOriginal = this.precio;
        if (this.stock > 0) {
            while (cantidadNumero > this.stock || cantidadNumero <= 0 || Number.isNaN(cantidadNumero)) {
                alert("ingrese una cantidad valida. Stock disponible: " + this.stock);
                cantidadNumero = parseInt(prompt("Ingrese nueva cantidad a pedir."));
            }
            this.descuento();
            alert("Se realizo su pedido de " + cantidadNumero + " unidades del producto " + this.nombre);
            alert("El precio por esas unidades es de " + (this.precio * cantidadNumero));
            carrito.push(new Producto(this.nombre, this.categoria, this.precio, cantidadNumero))  //agrego al carrito.
            this.stock -= cantidadNumero;
            this.precio = precioOriginal; // precio original DEl producto.

        } else {
            alert("No tenemos stock disponible. Disculpe las molestias");
        }
    };
}

let camisaLocalDelJunior = 200.000
let camisaVisitanteDelJunior = 210.000
let camisaLocalDeColombia = 200.000
let camisaVisitanteDeColombia = 200.000
let camisaDelLiverpoolLuisDiaz = 210.000
let camisaRetroDelJunior = 140.000
/*valor total del carrito*/

function valorCarrito(carrito) {
    const totalCarrito = carrito.reduce((acumulador, producto) => acumulador + (producto.precio * producto.stock), 0) * 1.21;
    alert("el valor total de la compra es de: $" + totalCarrito)
    return (totalCarrito)
}
/*productos nuevos*/
const producto1 = new Producto("camisaLocalDelJunior", "camisaDelJunior", "",200.000, 70,);
const producto2 = new Producto("camisaVisitanteDelJunior", "camisaDelJunior", 210.000, 40);
const producto3 = new Producto("camisaDelLiverpoolLuisDiaz", "camisaDelLiverpool", 210.000, 30);
const producto4 = new Producto("camisaLocalDeColombia", "camisaDeColombia", 200.000, 60);
const producto5 = new Producto("camisaVisitanteDeColombia", "camisadeColombia", "" 200.000, 30);
const producto6 = new Producto("camisaRetroDelJunior", "camisaRetroJunior", 140.000, 40);
let listaProductos = JSON.parse(localStorage.getItem("productos")) || [producto1, producto2, producto3, producto4, producto5, producto6]

function cargarProductos(){
    if(JSON.parse(localStorage.getItem("productos")) === null){
        localStorage.setItem("productos",JSON.stringify(listaProductos))    //pusheo mi lista de productos a local storage si no hay nada.
    }
}

function mayuscula (palabra){
    let capital = palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()
    return(capital)
}

function armarCarrito (lista){
    let contador = 0 //genero identificador de cantidad de productos
    lista.forEach(producto => {
        div.innerHTML += `<div class="card productos_estilo" id="prod${producto.id}" style="width: 18rem;">
        <img src="${producto.imagen}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <p class="card-text">Precio: ${producto.precio}</p>
            <a class="btn btn-primary" id="comprar${contador}">Comprar</a>
            <input type="button" id="restar${contador}" value="-">
            <input type="number" class="cantidad" id="cantidad${contador}" value=1 />
            <input type="button" id="sumar${contador}" value="+">
        </div>
        <span id="problema${producto.id}"></span>
        </div>
        `
        contador += 1
    })
    restar()  // genero eventos de boton restar
    sumar()   // genero eventos de boton sumar
    comprar() // genero eventos de boton comprar
}

/*Defino los productos standar de la web*/
function mostrarProductos() {
    let listaFiltro = listaProductos.filter(producto => producto.nombre.includes(filtro.value)) //filtro
    cargarProductos()
    if (listaFiltro.length == 0) {
        listaFiltro = listaProductos.filter(producto => producto.nombre.includes(mayuscula(filtro.value))) // verifico si puso la primera letra mayuscula
        if (listaFiltro.length == 0) {
            listaFiltro = listaProductos.filter(producto => producto.nombre.includes(filtro.value.toLowerCase())) // verifico si no uso mayusculas
            if (listaFiltro.length == 0) {
                div.innerHTML = `<img src="./images/productoNoEncontrado.jpg">`
            } 
        } else {
            listaFiltro = listaProductos.filter(producto => producto.nombre.includes(mayuscula(filtro.value))) // sino filtro , limpio el div y ingreso cada item del array filtrado
            console.log("estoy en el segundo else.")
            if (parseInt(min.value) >=0) {  // verifico si el campo minimo tiene un valor valido
                validaRango.innerHTML = "" // borro mensaje de error
                min.classList.remove("error") //borro clase error
                listaFiltro = listaFiltro.filter(producto =>producto.precio >=  min.value) // filtro por los valores declarados en precios.
                if(parseInt(max.value) > 0){  // verifico si el campo maximo tiene un valor valido
                    if(parseInt(min.value) <= parseInt(max.value)){ // verifico que el campo minimo no sea mayor al campo maximo
                        validaRango.innerHTML = ""
                        max.classList.remove("error")
                        listaFiltro = listaFiltro.filter(producto =>producto.precio <=  max.value) // filtro por los valores declarados en precios.
                        div.innerHTML = ""
                        armarCarrito(listaFiltro)
                    } else{  // error valor minimo mayor a valor maximo
                        validaRango.innerHTML = "Error! el valor minimo no puede ser mayor maximo!"
                        min.className = "error"
                        max.className = "error"
                    }
                } else {    // error por valor maximo vacio o menor a 1
                    validaRango.innerHTML = "Error! el valor maximo no puede ser menor a 1 o vacio!"
                    max.className = "error"
                }
            } else {    // errror valor minimo menor a 0
                validaRango.innerHTML = "Error! el valor minimo no puede ser menor a 0 o vacio!"
                min.className = "error"
            }
        }
    } else {
        console.log("estoy en el tercer else.")
        if (parseInt(min.value) >=0) {
            validaRango.innerHTML = ""
            min.classList.remove("error")
            listaFiltro = listaFiltro.filter(producto =>producto.precio >=  min.value) // filtro por los valores declarados en precios.
            if(max.value > 0){
                if(parseInt(min.value) <= parseInt(max.value)){
                    validaRango.innerHTML = ""
                    max.classList.remove("error")
                    listaFiltro = listaFiltro.filter(producto =>producto.precio <=  max.value) // filtro por los valores declarados en precios.
                    div.innerHTML = ""
                    armarCarrito(listaFiltro)
                } else{     // error valor minimo mayor a valor maximo
                    validaRango.innerHTML = "Error! el valor minimo no puede ser mayor maximo!"
                    min.className = "error"
                    max.className = "error"
                }
            } else {    // error por valor maximo vacio o menor a 1
                validaRango.innerHTML = "Error! el valor maximo no puede ser menor a 1 o vacio!"
                max.className = "error"
            }
        } else {    // errror valor minimo menor a 0
                validaRango.innerHTML = "Error! el valor minimo no puede ser menor a 0 o vacio!"
                min.className = "error"
        }
    }
}

/*Funcion para boton de restar cantidad*/
function restar(){
    const botonesResta = document.querySelectorAll('[id^=restar]')  // busco todos mis botones de restar cantidad
    const inputsCantidad = document.querySelectorAll('[id^=cantidad]') // busco todos mis inputs de cantidad
    botonesResta.forEach(btn => {                                   // por cada boton restar genero un evento para restar al input correspondiente
        btn.addEventListener('click', event => {
            if(inputsCantidad[btn.id.slice(6)].value > 0){
                 inputsCantidad[btn.id.slice(6)].value --  // separo el id de restar para sacar el numero identificador
                }
        });
        });
}

/*Funcion para boton de sumar cantidad*/
function sumar(){
    const botonesSumar = document.querySelectorAll('[id^=sumar]')   // busco todos mis botones de sumar cantidad
    const inputsCantidad = document.querySelectorAll('[id^=cantidad]') // busco todos mis inputs de cantidad
    botonesSumar.forEach(btn => {                                   // por cada boton restar genero un evento para sumar al input correspondiente
        btn.addEventListener('click', event => {
                if(inputsCantidad[btn.id.slice(5)].value >= 0){
                 inputsCantidad[btn.id.slice(5)].value ++  // separo el id de restar para sacar el numero identificador
                }
        });
        });
}

function comprar(){
    let listaFiltros = JSON.parse(localStorage.getItem("productos")) // probar sice 0 de array anterior o spread operator.
    const botonesComprar = document.querySelectorAll('[id^=comprar]')  // busco todos mis botones de comprar
    const inputsCantidad = document.querySelectorAll('[id^=cantidad]') // busco todos mis inputs de cantidad
    const productos = document.querySelectorAll('[id^=prod]')
    const errores = document.querySelectorAll('[id^=problema]')

    botonesComprar.forEach(btn => {                                   // por cada boton restar genero un evento para restar al input correspondiente
        let idProducto = btn.id.slice(7)    // busco mi id de boton y lo corto para que me de el numero de objeto.
        let idListaProducto = parseInt(productos[idProducto].id.slice(4))   // busco mi id de producto que corresponde a la lista de productos.
        //console.log(productos)
        btn.addEventListener('click', event => {    //evento click para comprar
            carrito = JSON.parse(localStorage.getItem("carrito")) || []
            if (inputsCantidad[idProducto].value > (listaProductos[listaProductos.findIndex(producto => (producto.id === idListaProducto))].stock)){ //verifico si pido mas de mi stock
                errores[idProducto].innerHTML = `No tenemos suficiente stock!`
                console.log("Stock menor a lo pedido!")
            } else{
                errores[idProducto].innerHTML = "" //limpio el mensaje de error
             if(inputsCantidad[idProducto].value > 0){ // verifico que el input no sea 0
                errores[idProducto].innerHTML = ""
                 let prodAux = listaFiltros.filter(producto =>producto.id ===  idListaProducto)[0]  // filtro el producto seleccionado y lo guardo en un auxiliar
                 if (carrito.findIndex(producto => (producto.id === idListaProducto)) >= 0) {   //si el producto ya esta en el carrito sumo stock, si no pusheo un objeto
                    carrito[carrito.findIndex(producto => (producto.id === idListaProducto))].stock += parseInt(inputsCantidad[idProducto].value) // agrego el stock al carrito
                    listaProductos[listaProductos.findIndex(producto => (producto.id === idListaProducto))].stock -= parseInt(inputsCantidad[idProducto].value) // disminuyo stock en el producto original
                    localStorage.setItem("productos",JSON.stringify(listaProductos))
                    localStorage.setItem("carrito",JSON.stringify(carrito))
                    mostrarAlerta(prodAux.nombre,inputsCantidad[idProducto].value)
                } else {    // si el producto no esta en el carrito hago push
                    listaProductos[listaProductos.findIndex(producto => (producto.id === idListaProducto))].stock -= parseInt(inputsCantidad[idProducto].value) // disminuyo stock en el producto original
                    prodAux.stock = parseInt(inputsCantidad[idProducto].value) // seteo cuanto stock compro
                    carrito.push(prodAux)
                    localStorage.setItem("productos",JSON.stringify(listaProductos))
                    localStorage.setItem("carrito",JSON.stringify(carrito))
                    mostrarAlerta(prodAux.nombre,inputsCantidad[idProducto].value)
                    }
                } else{
                errores[idProducto].innerHTML = `No puedes pedir 0!`
                }}
        }); 
        });
}

filtro.addEventListener("keyup", function (e){     //apretar enter genera la busqueda
    if (e.key === 'Enter') {
        mostrarProductos()
      }
})

btn.addEventListener("click", mostrarProductos) // boton buscar

/*Funciones para alertas*/
function mostrarAlerta(producto,cantidad){
    document.getElementById("alerta").classList.remove("alertaBorrar")  //saco class que deja opacidad 0%.
                    document.getElementById("alerta").innerHTML = `
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>Se agrego ${cantidad} ${producto} al carrito.</strong>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
                    `                                                   // Genero la ventana modal.
                    document.getElementById("alerta").classList.add("alertaMostrar")// agrego class para mostrar la ventana 100% opacidad.
                    setTimeout(cerrarAlerta, 3000);                     // luego de 3 segundos borro la ventana modal.
}

function cerrarAlerta(){
    document.getElementById("alerta").classList.add("alertaBorrar")
    setTimeout(borrarAlerta,3000)
}

function borrarAlerta(){
    document.getElementById("alerta").innerHTML =""
}

//setTimeout();
mostrarProductos()
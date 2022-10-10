const iva = 0.19;
const carrito = [];

/*clase producto*/
class Producto {
    constructor(nombre, categoria, precio, stock) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
        this.stock = stock;
    }
    descuento() {
        if (this.precio > 200.000) {
            this.precio = this.precio * 0.9;
        }
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

let camisa del Junior = 200.000
let camisa de Colombia = 200.000
let camisa del Liverpool = 210.000
let camisa Retro = 140.000
/*valor total del carrito*/

function valorCarrito(carrito) {
    const totalCarrito = carrito.reduce((acumulador, producto) => acumulador + (producto.precio * producto.stock), 0) * 1.21;
    alert("el valor total de la compra es de: $" + totalCarrito)
    return (totalCarrito)
}
/*productos nuevos*/
const producto1 = new Producto("Camisa local del Junior", "Camisa del Junior", 200.000, 70);
const producto2 = new Producto("Camisa visitante del Junior", "Camisa del Junior", 210.000, 40);
const producto3 = new Producto("Camisa del Liverpool Luis Diaz", "Camisa del Liverpool", 210.000, 30);
const producto4 = new Producto("Camisa local de Colombia", "Camisa de Colombia", 200.000, 60);
const producto5 = new Producto("Camisa visitante de Colombia", "Camisa de Colombia", 260, 50);
const producto6 = new Producto("Camisa retro del Junior", "Camisa retro Junior", 180, 50);

function bienvenida () {
    alert('¡Bienvenid@ a la tienda del Junior! ¡Vamos a ayudarte a calcular tu producto!')
}
  
let nombre = prompt ('Ingresa tu nombre')
let apellido = prompt ('Ingresa tu apellido')

function comprarComponentes(){
    let agregarMas = "si" 
    let opcionComprar
    while (agregarMas === "si") {
        opcionComprar = parseInt(prompt("que quiere comprar? 1)Camisa local del Junior 2)Camisa visitante del Junior 3)Camisa del Liverpool Luis Diaz 4)Camisa local de Colombia 5)Camisa visitante de Colombia 6)Camisa retro del Junior 7)Salir"));
        while (opcionComprar != 1 && opcionComprar != 2 && opcionComprar != 3 && opcionComprar != 4) {
          alert("Ingrese un valor valido");
        }
        if(opcionComprar === 1){
            let cantidadComprar = parseInt(prompt("cuantas unidades quieres comprar?"));
            ingresarCamisa(opcion,cantidadComprar);
            agregarMas = prompt("Desea agregar mas productos? si/no").toLowerCase();
            while (agregarMas != "si" && agregarMas != "no") {
                alert("Valor ingresado no valido. Ingrese si o no.");
                agregarMas = prompt("Desea agregar mas productos? si/no").toLowerCase();
  }
        } if (opcionComprar ===2){
            let cantidadComprar = parseInt(prompt("cuantas unidades quieres comprar?"));
            ingresarCamisa(opcion,cantidadComprar);
            agregarMas = prompt("Desea agregar mas productos? si/no").toLowerCase();
            while (agregarMas != "si" && agregarMas != "no") {
                alert("Valor ingresado no valido. Ingrese si o no.");
                agregarMas = prompt("Desea agregar mas productos? si/no").toLowerCase();
  }
        } if (opcionComprar === 3) {
            let cantidadComprar = parseInt(prompt("cuantas unidades quieres comprar?"));
            ingresarCamisa(opcion,cantidadComprar);
            agregarMas = prompt("Desea agregar mas productos? si/no").toLowerCase();
            while (agregarMas != "si" && agregarMas != "no") {
                alert("Valor ingresado no valido. Ingrese si o no.");
                agregarMas = prompt("Desea agregar mas productos? si/no").toLowerCase();
  }
        } if(opcionComprar === 4){
        let cantidadComprar = parseInt(prompt("cuantas unidades quieres comprar?"));
        ingresarCamisa(opcion,cantidadComprar);
        agregarMas = prompt("Desea agregar mas productos? si/no").toLowerCase();
        while (agregarMas != "si" && agregarMas != "no") {
            alert("Valor ingresado no valido. Ingrese si o no.");
            agregarMas = prompt("Desea agregar mas productos? si/no").toLowerCase();
}
        } if (opcionComprar ===5){
            let cantidadComprar = parseInt(prompt("cuantas unidades quieres comprar?"));
            ingresarCamisa(opcion,cantidadComprar);
            agregarMas = prompt("Desea agregar mas productos? si/no").toLowerCase();
            while (agregarMas != "si" && agregarMas != "no") {
                alert("Valor ingresado no valido. Ingrese si o no.");
                agregarMas = prompt("Desea agregar mas productos? si/no").toLowerCase();
}
        } if (opcionComprar === 6) {
            let cantidadComprar = parseInt(prompt("cuantas unidades quieres comprar?"));
            ingresarCamisa(opcion,cantidadComprar);
            agregarMas = prompt("Desea agregar mas productos? si/no").toLowerCase();
            while (agregarMas != "si" && agregarMas != "no") {
                alert("Valor ingresado no valido. Ingrese si o no.");
                agregarMas = prompt("Desea agregar mas productos? si/no").toLowerCase();
}
  
        } if (opcionComprar === 7){
            break
        }
    }
    valorCarrito(carrito);
    alert("Gracias, vuelva pronto!.");
}
} else {
    
}

let camisaJunior = 200.000
let camisaColombia = 200.000
let camisaLiverpool = 210.000
let camisaRetro = 140.000

function bienvenida () {
    alert('¡Bienvenid@ a la tienda del Junior! ¡Vamos a ayudarte a calcular tu producto!')
}

let camisa = prompt ('Ingresa como quieres tu camisa.')    
let nombre = prompt ('Ingresa tu nombre')
let apellido = prompt ('Ingresa tu apellido')
let formaDePago = parseInt (prompt('Ingresa forma de pago, 1: Crédito 2: Débito'))
switch (formaDePago) {
    case 1:
        alert(`el precio por camisa es de ${precioCamisa}`);
        let elijePago = prompt ('¿Deseas continuar? si/no');
        if (elijePago == 'si') {
            alert(`la camisa ${camisa} se ha añadido al carrito.`)
        } else {
            alert('La operación se ha cancelado.');
        }
        break;
    case 2:
        alert(`el precio por camisa es de ${precioCamisa}`);
        break;
    default:
        alert('El dato ingresado es incorrecto')
    }

let nuevaConsulta = 0;
do {
    nuevaConsulta = parseInt (prompt('¿Quieres seguir comprando?'))
} while (nuevaConsulta != no);
if (nuevaConsulta == no) {
    alert('Vuelva pronto.')
} else {
    
}
// Descripción funcional
// 1. Armar un primer listado de productos de productos y carbos con las siguientes propiedades: 1. id, 2. Nombre, 3. Carbos, 4. Unidad de medida. OK
// 2. Preguntar si desea agregar algun producto con un CONFIRM. OK
// 3. Si es TRUE, entonces promptear la posibilidad de agregar al array "productos" de a uno por vez. Iterar hasta que confirm es FALSE. OK
// 4. CARBO MAX Y MIN: Promptear cuanto es el carbo max y min por hora. Hacerlo con un confirm. "El sugerido es 70 min 90 max. Si está OK, confirme. Sino, pedir que ingrese los valores por PROMPT". NO uso el estándar porque se hace muy largo (Lo establezco como constantes fijas). OK
// 5. Crear un "carrito" para agregar alimentos para 1 hora de carrera (un array)
// 6. Ciclo para agregar productos y sumar carbos hasta superar el máximo de carbos. OK
// 7. Al final mostrar cómo quedó compuesto el "carrito". Usar eso de mensaje"" y el +-. Cuando haya productos repetidos usar SOME para poner 2 x Gu, por ejemplo. OK (pero me compliqué con el SOME y lo hice con un if y un find)

// /////////////////////////

alert("Bienvenido/a a mi calculadora de alimentación para carreras de trail.\n\nPara cada hora de carrera se estima una necesidad de reposición de 70 a 90 gramos de carbohidratos.");

const alimentos = [];

class Alimento {
    constructor(id, nombre, carbos, um) {
        this.id = id;
        this.nombre = nombre;
        this.carbos = carbos;
        this.um = um;
    };
};

const alimento1 = new Alimento(1, "Gel Roctane Gu", 21, "Sachet");
const alimento2 = new Alimento(2, "Nutremax", 60, "500 ml");
const alimento3 = new Alimento(3, "Dátil", 5, "Unidad");
const alimento4 = new Alimento(4, "Membrillito", 20, "Unidad 30gr");

alimentos.push(alimento1, alimento2, alimento3, alimento4);

console.log (alimentos);

let mensajeInicial = "";

alimentos.forEach(el => {
    mensajeInicial += el.id + ". " + el.nombre + ": " + el.carbos + " gr/ " + el.um + "\n";
});

let agregarAlimentos = confirm("Listado de alimentos y los gramos de carbohidratos por unidad de medida.\n"  + mensajeInicial + "\n" + "¿Desea agregar alimentos personalizados?");

let id = alimentos.length + 1;

while (agregarAlimentos) {
    const nombre = prompt("Ingrese el nombre del alimento:");
    const carbos = parseFloat(prompt("Ingrese los gramos de carbohidratos (g):"));
    const um = prompt("Ingrese la unidad de medida (ej. unidad, g, ml):");

    if (nombre && !isNaN(carbos) && um) {
        const nuevoAlimento = new Alimento(id, nombre, carbos, um);
        alimentos.push(nuevoAlimento);
        id++;

        agregarAlimentos = confirm("¿Desea agregar otro alimento?");
    } else {
        alert("Por favor, complete todos los campos correctamente.");
        agregarAlimentos = confirm("¿Desea intentar agregar el alimento nuevamente?");
    }
}

let totalCarbos = 0;
let carrito = [];
class ItemCarrito {
    constructor(alimento, cantidad) {
        this.alimento = alimento;
        this.cantidad = cantidad;
    }
}

function mostrarAlimentosDisponibles() {
    let mensaje = "Elige alimentos del siguiente listado para alcanzar tu objetivo de carbohidratos:\n\n";
    alimentos.forEach(el => {
        mensaje += el.id + ". " + el.nombre + ": " + el.carbos + " gr/ " + el.um + "\n";
    });
    return mensaje;
}

function mostrarCarrito() {
    if (carrito.length === 0) {
        return "El carrito está vacío.";
    }
    let mensajeCarrito = "Carrito actual:\n";
    carrito.forEach(item => {
        mensajeCarrito += item.cantidad + " x " + item.alimento.nombre + "\n";
    });
    return mensajeCarrito;
}

const carboMax = 90;
const carboMin = 70;

let seguirSeleccionando = true;

while (seguirSeleccionando) {
    let mensajeAlimentos = mostrarAlimentosDisponibles();
    let mensajeCarrito = mostrarCarrito();
    let seleccion = parseInt(prompt(mensajeAlimentos + "\nTotal de carbohidratos acumulados: " + totalCarbos + "g\n\n" + mensajeCarrito + "\nIngrese el ID del alimento que desea agregar:"));

    let alimentoSeleccionado = alimentos.find(alimento => alimento.id === seleccion);
    
    if (alimentoSeleccionado) {
        totalCarbos += alimentoSeleccionado.carbos;
        alert("Has agregado " + alimentoSeleccionado.nombre + "\n\nCarbohidratos acumulados: " + totalCarbos + " gr");

        let itemCarrito = carrito.find(item => item.alimento.id === seleccion);
        if (itemCarrito) {
            itemCarrito.cantidad += 1;
        } else {          
            let nuevoItem = new ItemCarrito(alimentoSeleccionado, 1);
            carrito.push(nuevoItem);
        }
    } else {
        alert("ID de alimento no válido. Intenta nuevamente.");
    }

    if (totalCarbos >= carboMin) {
        if (totalCarbos >= carboMax) {
            alert("Has alcanzado el máximo recomendado de carbohidratos: " + totalCarbos + " gr");
            seguirSeleccionando = false;
        } else {
            seguirSeleccionando = confirm("Has alcanzado el mínimo necesario de carbohidratos.\n¿Deseas agregar más alimentos?");
        }
    } else {
        seguirSeleccionando = confirm("Aún no has alcanzado el mínimo de carbohidratos necesarios.\n¿Deseas agregar más alimentos?");
    }
}

alert("Total de carbohidratos agregados para 1(una) hora de carrera: " + totalCarbos + "gr\n\n" + mostrarCarrito() +"\n\nSi desea calcular otra hora de carrera actualice la página y vuelva a empezar.\n\nMuchas Gracias!");

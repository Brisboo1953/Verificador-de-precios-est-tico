
const idiomas = {
  es: {
    mensaje: "Idioma: Español",
    codigoBarras: "Codigo de barras",
    fechaOptions: {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    },
    locale: 'es-ES',
    noEncontrado: "El producto no se encuentra",
    producto: "Producto",
    precio: "Precio"
  },
  en: {
    mensaje: "Language: English",
    codigoBarras: "Barcode",
    fechaOptions: {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    },
    locale: 'en-US',
    noEncontrado: "Product not found",
    producto: "Product",
    precio: "Price"
  }
};

const productos = [
  ["1", "Palomitas", "$ 23.00", "palomitas.jpg"],
  ["2", "Refresco", "$ 18.00", "refresco.jpeg"],
  ["3", "Nachos", "$ 35.00", "nachos.jpeg"],
  ["4", "Hot Dog", "$ 30.00", "hotdog.jpg"],
  ["5", "Pizza", "$ 50.00", "pizza.jpg"],
  ["6", "Helado", "$ 25.00", "helado.jpg"],
  ["7", "Chocolate", "$ 20.00", "chocolate.jpeg"],
  ["8", "Galletas", "$ 15.00", "galletas.jpeg"],
  ["9", "Papas Fritas", "$ 28.00", "papasfritas.jpeg"],
  ["10", "Dulces", "$ 10.00", "dulces.jpeg"],
  ["11", "Te Helado", "$ 12.00", "te.png"],
  ["12", "Sushi", "$ 22.00", "sushi.jpg"],
  ["13", "Salmon", "$ 50.00", "salmon.jpeg"],
  ["14", "Burritos", "$ 26.00", "burritos.jpg"],
  ["15", "Ensalada", "$ 40.00", "ensalada.jpeg"],
  ["16", "Tostitos con queso", "$ 32.00", "tostitos.jpg"],
  ["17", "Malteada", "$ 27.00", "malteada.jpg"],
  ["18", "Boneless", "$ 18.00", "boneless.jpg"],
  ["19", "Limonada", "$ 24.00", "limonada.jpeg"],
  ["20", "Gomitas", "$ 38.00", "gomitas.jpg"]
];

const productos_en = [
  ["1", "Popcorn", "$ 23.00", "palomitas.jpg"],
  ["2", "Soda", "$ 18.00", "refresco.jpeg"],
  ["3", "Nachos", "$ 35.00", "nachos.jpeg"],
  ["4", "Hot Dog", "$ 30.00", "hotdog.jpg"],
  ["5", "Pizza", "$ 50.00", "pizza.jpg"],
  ["6", "Ice Cream", "$ 25.00", "helado.jpg"],
  ["7", "Chocolate", "$ 20.00", "chocolate.jpeg"],
  ["8", "Cookies", "$ 15.00", "galletas.jpeg"],
  ["9", "French Fries", "$ 28.00", "papasfritas.jpeg"],
  ["10", "Candy", "$ 10.00", "dulces.jpeg"],
  ["11", "Iced Tea", "$ 12.00", "te.png"],
  ["12", "Sushi", "$ 22.00", "sushi.jpg"],
  ["13", "Salmon", "$ 20.00", "salmon.jpeg"],
  ["14", "Burritos", "$ 26.00", "burritos.jpg"],
  ["15", "Salad", "$ 40.00", "ensalada.jpeg"],
  ["16", "Tostitos with cheese", "$ 32.00", "tostitos.jpg"],
  ["17", "Milk Shake", "$ 27.00", "malteada.jpg"],
  ["18", "Boneless", "$ 18.00", "boneless.jpg"],
  ["19", "Lemonade", "$ 24.00", "limonada.jpeg"],
  ["20", "Gummies", "$ 38.00", "gomitas.jpg"]
];

let idiomaActual = 'es';
let codigo = "";

function cambiarIdioma() {
  const toggle = document.getElementById("toggle");
  idiomaActual = toggle.checked ? 'en' : 'es';

  const langData = idiomas[idiomaActual];
  document.getElementById("mensaje").textContent = langData.mensaje;

  const respuesta = document.getElementById("respuesta");
  if (respuesta.innerHTML.includes(idiomas.es.codigoBarras) || respuesta.innerHTML.includes(idiomas.en.codigoBarras)) {
    respuesta.innerHTML = `
      <img src="./img/barcode.gif" alt="" width="25%" height="25%">
      <br>${langData.codigoBarras}
    `;
  }

  actualizarFechaHora();
}

function actualizarFechaHora() {
  const ahora = new Date();
  const langData = idiomas[idiomaActual];
  const fechaHoraFormateada = ahora.toLocaleDateString(langData.locale, langData.fechaOptions);
  document.getElementById('fecha-hora').textContent = fechaHoraFormateada;
}

function buscar(cod) {
  let encontrado = false;
  const lang = idiomas[idiomaActual];
  const listaProductos = idiomaActual === 'es' ? productos : productos_en;

  for (let i = 0; i < listaProductos.length; i++) {
    if (listaProductos[i][0] === cod) {
      document.getElementById("respuesta").innerHTML = `
        ${lang.producto}: ${listaProductos[i][1]} <br>
        ${lang.precio}: ${listaProductos[i][2]} <br>
        <img src="./img/${listaProductos[i][3]}" width="25%" height="25%" >
      `;
      encontrado = true;
      break;
    }
  }

  if (!encontrado) {
    document.getElementById("respuesta").innerHTML = lang.noEncontrado;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("toggle").addEventListener("change", cambiarIdioma);
  document.getElementById("theme-toggle").addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
  });

  actualizarFechaHora();
  setInterval(actualizarFechaHora, 1000);

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") {
      codigo += event.key;
    } else {
      buscar(codigo);
      codigo = "";
    }
  });
});

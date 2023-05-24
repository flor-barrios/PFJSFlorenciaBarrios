//Definiendo precios a los medelos
const preciosBase = {
  Ford: {
    Fiesta: 100,
    Focus: 120,
    Mustang: 200,
    Explorer: 250,
    F150: 300
  },
  Chevrolet: {
    Spark: 90,
    Sonic: 110,
    Malibu: 180,
    Traverse: 220,
    Silverado: 320
  },
  Toyota: {
    Yaris: 95,
    Corolla: 130,
    Camry: 200,
    RAV4: 240,
    Tacoma: 290
  },
  Honda: {
    Fit: 90,
    Civic: 120,
    Accord: 190,
    CVR: 220,
    Ridgeline: 290
  },
  Nissan: {
    Versa: 95,
    Sentra: 120,
    Altima: 190,
    Rogue: 230,
    Titan: 300
  }
};

//Cargar modelos de los autos asociadas a la marca del auto
function cargarModelos() {
  const marca = document.getElementById("marca").value;
  const modelos = Object.keys(preciosBase[marca]);

  //Generar las opciones de modelos dependiendo la eleccion de marca
  const modeloSelect = document.getElementById("modelo");
  modeloSelect.innerHTML = "<option value=''>Selecciona un modelo</option>";

  //Bucle que recorre el array modelos
  for (let i = 0; i < modelos.length; i++) {
    const modelo = modelos[i];
    const option = document.createElement("option");
    option.value = modelo;
    option.textContent = modelo;
    modeloSelect.appendChild(option);
  }
}

//Calcular la cotización en base a lo pedido
function calcularCotizacion() {
  const marca = document.getElementById("marca").value;
  const modelo = document.getElementById("modelo").value;
  const año = document.getElementById("año").value;
  const edad = document.getElementById("edad").value;

  //Todos los datos deben ser rellenados
  if (!marca || !modelo || !año || !edad ) {
    alert("Por favor completa todos los campos");
    return;
  }

  const precioBase = preciosBase[marca][modelo];
  let coeficienteEdad = 1;

  //Defieniendo el rango de edad
  if (edad >= 18 && edad < 25) {
    coeficienteEdad = 1.5;
  } else if (edad >= 25 && edad < 60) {
    coeficienteEdad = 1;
  } else if (edad >= 60) {
    coeficienteEdad = 1.3;
  } else {
    alert("La edad debe ser mayor o igual a 18");
    return;
  }
  
  // Validar que el año no sea mayor al año actual
  const añoActual = new Date().getFullYear();
  if (año > añoActual) {
    alert("El año ingresado no puede ser mayor al año actual");
    return;
  }

  // Definir antigüedad del auto
  let coeficienteAño = 1;
  const antiguedad = añoActual - año;

  if (antiguedad >= 0 && antiguedad < 5) {
    coeficienteAño = 2;
  } else if (antiguedad >= 5 && antiguedad < 10) {
    coeficienteAño = 1.5;
  } else if (antiguedad >= 10) {
    coeficienteAño = 1;
  } else {
    alert("El año debe ser válido");
    return;
  }
  
  //Cotizacion final
  const precioCotizacion = precioBase * coeficienteEdad * coeficienteAño;
  const resultado = document.getElementById("resultado");
  resultado.textContent = `El precio de la cotización es: ${precioCotizacion}$`;
}

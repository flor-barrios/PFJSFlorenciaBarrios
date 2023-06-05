//Definiendo precios a los modelos
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

// Cargar modelos de los autos asociados a la marca del auto
function cargarModelos() {
  const marca = document.getElementById("marca").value;
  const modelos = Object.keys(preciosBase[marca]);

  // Generar las opciones de modelos dependiendo de la elección de marca
  const modeloSelect = document.getElementById("modelo");
  modeloSelect.innerHTML = "<option value=''>Selecciona un modelo</option>";

  // Bucle que recorre el array de modelos
  modelos.forEach(modelo => {
    const option = document.createElement("option");
    option.value = modelo;
    option.textContent = modelo;
    modeloSelect.appendChild(option);
  });
}

function mostrarDatosPersonales() {
  const marca = document.getElementById("marca").value;
  const modelo = document.getElementById("modelo").value;
  const año = document.getElementById("año").value;

  // Verificar que los campos de datos del auto estén completos
  if (!marca || !modelo || !año) {
    alert("Por favor completa los datos del auto");
    return;
  }

  // Ocultar los contenedores innecesarios
  document.getElementById("datos-personales").style.display = "block";
  document.getElementById("cotizar-seguro").style.display = "block";
  document.getElementById("Marca-Modelo").style.display = "none";
  document.getElementById("Anio").style.display = "none";
  document.getElementById("Siguiente").style.display = "none";
}

function mostrarResultadoCotizacion(marca, modelo, año, precioCotizacion) {
  // Ocultar contenedores innecesarios
  document.getElementById("datos-personales").style.display = "none";
  document.getElementById("cotizar-seguro").style.display = "none";
  document.getElementById("Marca-Modelo").style.display = "none";
  document.getElementById("Anio").style.display = "none";
  document.getElementById("Siguiente").style.display = "none";

  // Mostrar el resultado de la cotización
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = `
    <h3>Resultado de la cotización</h3>
    <p>Marca: ${marca}</p>
    <p>Modelo: ${modelo}</p>
    <p>Año: ${año}</p>
    <p>Cotización: $${precioCotizacion}</p>
  `;
  resultado.style.display = "block";

  // Mostrar el botón "Recalcular"
  const recalcularContainer = document.getElementById("Recalcular");
  recalcularContainer.style.display = "block";

  // Ocultar el botón "Calcular cotización"
  const cotizarSeguroContainer = document.getElementById("cotizar-seguro");
  cotizarSeguroContainer.style.display = "none";
  }
  
  // Calcular la cotización en base a lo pedido
  function calcularCotizacion() {
  const marca = document.getElementById("marca").value;
  const modelo = document.getElementById("modelo").value;
  const año = document.getElementById("año").value;
  const edad = document.getElementById("edad").value;
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const email = document.getElementById("email").value;
  
  // Verificar que todos los campos estén completos
  if (!marca || !modelo || !año || !edad || !nombre || !apellido || !email) {
  alert("Por favor completa todos los campos");
  return;
  }
  
  const precioBase = preciosBase[marca][modelo];
  let coeficienteEdad = 1;
  
  // Definir el rango de edad
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
  
  // Cotizacion final
  const precioCotizacion = precioBase * coeficienteEdad * coeficienteAño;
  
  // Mostrar el resultado de la cotización
  mostrarResultadoCotizacion(marca, modelo, año, precioCotizacion);
  }
  
  // Redirigir al inicio
  const recalcularBtn = document.getElementById("Recalcular");
  recalcularBtn.addEventListener("click", function () {
  window.location.href = "./index.html";
  });

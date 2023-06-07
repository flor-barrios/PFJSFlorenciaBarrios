//Definiendo precios a los modelos
const preciosBase = {
  Ford: {
    Fiesta: 1000,
    Focus: 1200,
    Mustang: 2000,
    Explorer: 2500,
    F150: 3000
  },
  Chevrolet: {
    Spark: 900,
    Sonic: 1100,
    Malibu: 1800,
    Traverse: 2200,
    Silverado: 3200
  },
  Toyota: {
    Yaris: 950,
    Corolla: 1300,
    Camry: 2000,
    RAV4: 2400,
    Tacoma: 2900
  },
  Honda: {
    Fit: 900,
    Civic: 1200,
    Accord: 1900,
    CVR: 2200,
    Ridgeline: 2900
  },
  Nissan: {
    Versa: 950,
    Sentra: 1200,
    Altima: 1900,
    Rogue: 2300,
    Titan: 3000
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

// Función para limpiar el mensaje de error
function limpiarError() {
  const errorContainer = document.getElementById("error");
  errorContainer.textContent = ""; 
}

function mostrarDatosPersonales() {
  // Limpiar el mensaje de error
  limpiarError();

  const marca = document.getElementById("marca").value;
  const modelo = document.getElementById("modelo").value;
  const año = document.getElementById("año").value;

  // Verificar que los campos de datos del auto estén completos
  if (!marca || !modelo || !año) {
    const error = document.getElementById("error");
    error.textContent = "Por favor completa los datos del auto";
    return;
  }

  // Ocultar los contenedores innecesarios
  document.getElementById("datos-personales").style.display = "block";
  document.getElementById("cotizar-seguro").style.display = "block";
  document.getElementById("Marca-Modelo").style.display = "none";
  document.getElementById("Anio").style.display = "none";
  document.getElementById("Siguiente").style.display = "none";

  // Guardar los datos en el Local Storage
  const datosAuto = {
    marca: marca,
    modelo: modelo,
    año: año
  };
  localStorage.setItem("datosAuto", JSON.stringify(datosAuto));
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

  // Guardar los datos de la cotización en el Local Storage
  const datosCotizacion = {
    marca: marca,
    modelo: modelo,
    año: año,
    precioCotizacion: precioCotizacion
  };

  localStorage.setItem("datosCotizacion", JSON.stringify(datosCotizacion));
}

// Calcular la cotización en base a lo pedido
function calcularCotizacion() {
  // Limpiar el mensaje de error
  limpiarError();

  const marca = document.getElementById("marca").value;
  const modelo = document.getElementById("modelo").value;
  const año = document.getElementById("año").value;
  const edad = document.getElementById("edad").value;
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const email = document.getElementById("email").value;

  // Verificar que todos los campos estén completos
  if (!marca || !modelo || !año || !edad || !nombre || !apellido || !email) {
    const error = document.getElementById("error");
    error.textContent = "Por favor completa todos los campos";
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
    const errorContainer = document.getElementById("error");
    errorContainer.textContent = "La edad debe ser mayor o igual a 18";
    return;
  }

  // Validar que el año no sea mayor al año actual
  const añoActual = new Date().getFullYear();
  if (año > añoActual) {
    const error = document.getElementById("error");
    error.textContent = "El año ingresado no puede ser mayor al año actual";
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
    const error = document.getElementById("error");
    error.textContent = "El año debe ser válido";
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
      // Eliminar los datos de la cotización del Local Storage
      localStorage.removeItem("datosCotizacion");
      window.location.href = "./index.html";
    });

    // Comprobar si hay datos de cotización guardados en el Local Storage al cargar la página
    window.addEventListener("DOMContentLoaded", function () {
      const datosCotizacion = localStorage.getItem("datosCotizacion");
      if (datosCotizacion) {
        const { marca, modelo, año, precioCotizacion } = JSON.parse(datosCotizacion);
        mostrarResultadoCotizacion(marca, modelo, año, precioCotizacion);
      }
    });



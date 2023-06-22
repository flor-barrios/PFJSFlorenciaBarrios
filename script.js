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
  const anio = document.getElementById("anio").value;

  // Verificar que los campos de datos del auto estén completos
  if (!marca || !modelo || !anio) {
    const error = document.getElementById("error");
    Toastify({
      text: "Por favor completa los datos del auto",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top", 
      position: "left", 
      stopOnFocus: true,
      style: {
        background: "#f47458",
      },
      onClick: function(){} 
    }).showToast();
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
    anio: anio
  };
  
  localStorage.setItem("datosAuto", JSON.stringify(datosAuto));
}

function mostrarResultadoCotizacion(marca, modelo, anio, precioCotizacion) {
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
    <p>Año: ${anio}</p>
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
  const cotizacion = {
    marca: marca,
    modelo: modelo,
    anio: anio,
    precioCotizacion: precioCotizacion
  };

  const cotizacionesAnteriores = JSON.parse(localStorage.getItem("cotizacionesAnteriores")) || [];
  cotizacionesAnteriores.push(cotizacion);
  localStorage.setItem("cotizacionesAnteriores", JSON.stringify(cotizacionesAnteriores));
}

// Calcular la cotización en base a lo pedido
function calcularCotizacion() {
  // Limpiar el mensaje de error
  limpiarError();

  const marca = document.getElementById("marca").value;
  const modelo = document.getElementById("modelo").value;
  const anio = document.getElementById("anio").value;
  const edad = document.getElementById("edad").value;
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const email = document.getElementById("email").value;

  // Verificar que todos los campos estén completos
  if (!marca || !modelo || !anio || !edad || !nombre || !apellido || !email) {
    const error = document.getElementById("error");
    Toastify({
      text: "Por favor completa todos los datos",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top", 
      position: "left", 
      stopOnFocus: true,
      style: {
        background: "#f47458",
      },
      onClick: function(){} 
    }).showToast();
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
    Toastify({
      text: "La edad debe ser mayor o igual a 18 años",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top", 
      position: "left", 
      stopOnFocus: true,
      style: {
        background: "#f47458",
      },
      onClick: function(){} 
    }).showToast();
    return;
  }

  // Validar que el año no sea mayor al año actual
  const anioActual = new Date().getFullYear();
  if (anio > anioActual) {
    const error = document.getElementById("error");
    Toastify({
      text: "El año ingresado no puede ser mayor al año actual",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top", 
      position: "left", 
      stopOnFocus: true,
      style: {
        background: "#f47458",
      },
      onClick: function(){} 
    }).showToast();
    return;
  }

  // Definir antigüedad del auto
  let coeficienteAnio = 1;
  const antiguedad = anioActual - anio;

  if (antiguedad >= 0 && antiguedad < 5) {
    coeficienteAnio = 2;
  } else if (antiguedad >= 5 && antiguedad < 10) {
    coeficienteAnio = 1.5;
  } else if (antiguedad >= 10) {
    coeficienteAnio = 1;
  } else {
    const error = document.getElementById("error");
    Toastify({
      text: "El año debe ser valido",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top", 
      position: "left", 
      stopOnFocus: true,
      style: {
        background: "#f47458",
      },
      onClick: function(){} 
    }).showToast();
    return;
  }

  // Cotizacion final
  const precioCotizacion = precioBase * coeficienteEdad *coeficienteAnio;

  // Mostrar el resultado de la cotización
  mostrarResultadoCotizacion(marca, modelo, anio,precioCotizacion);
  }
  
  // Redirigir al inicio
  const recalcularBtn = document.getElementById("btnRecalcular");
  recalcularBtn.addEventListener("click", function () {
    window.location.href = "./index.html";
  });

  // Comprobar si hay datos de cotización guardados en el Local Storage al cargar la página
  window.addEventListener("DOMContentLoaded", function () {
    fetch('datos.json')
      .then(response => response.json())
      .then(data => {
        const { marca, modelo, anio, precioCotizacion } = data;
        mostrarResultadoCotizacion(marca, modelo, anio, precioCotizacion);
      })
      .catch(error => {
        console.log('Error al cargar los datos:', error);
      });
  });
  

  function mostrarCotizacionesAnteriores() {
    const cotizacionesAnteriores = JSON.parse(localStorage.getItem("cotizacionesAnteriores")) || [];
    const cotizacionesAnterioresContainer = document.getElementById("cotizacionesAnterioresContainer");
    
    // Limpiar las cotizaciones anteriores
    cotizacionesAnterioresContainer.innerHTML = ""; 
  
    // Mostrar las últimas 3 cotizaciones
    const ultimasCotizaciones = cotizacionesAnteriores.slice(-3);
    ultimasCotizaciones.forEach(cotizacion => {
      const li = document.createElement("li");
      Toastify({
        text: `Marca: ${cotizacion.marca}, 
        Modelo: ${cotizacion.modelo}, 
        Año: ${cotizacion.anio}, 
        Cotización: $${cotizacion.precioCotizacion}`,
        duration: -1,
        newWindow: true,
        close: true,
        gravity: "center", 
        position: "center", 
        stopOnFocus: true,
        style: {
          background: "#184656",
        },
        onClick: function(){} 
      }).showToast();
    });
  
  };

  // Mostrar el contenedor de las cotizaciones anteriores
  document.getElementById("CotizacionesAnteriores").style.display = "block";

    
// Definir una variable global para almacenar los datos
let datosMarcasYModelos;

// Cargar marcas y modelos de autos
function cargarMarcasYModelos() {
  fetch("preciosBase.json")
    .then(response => response.json())
    .then(data => {
      // Almacenar los datos en la variable global
      datosMarcasYModelos = data; 

      const marcas = Object.keys(data.preciosBase);

      const marcaSelect = document.getElementById("marca");
      marcaSelect.innerHTML = "<option value=''>Selecciona una marca</option>";

      marcas.forEach(marca => {
        const option = document.createElement("option");
        option.value = marca;
        option.textContent = marca;
        marcaSelect.appendChild(option);
      });

      cargarModelos(); 
    })

    .catch(error => {
      const toast = Toastify({
      text: 'Error al cargar los datos, por favor vuelve a cargar la página.',
      duration: -1,
      newWindow: true,
      close: true,
      gravity: "center", 
      position: "center", 
      stopOnFocus: true,
      style: {
        background: "#f8f9fa",
        color: "black",
        fontWeight: "bold",
        width: "500px", 
        height: "200px", 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      onClick: function(){} 
      });
      toast.showToast();

      // Ocultar el toast después de la duración del error
      setTimeout(function() {
      toast.hideToast();
      }, duration);
    });
}

function cargarModelos() {
  if (datosMarcasYModelos) {
    const marcaSelect = document.getElementById("marca");
    const marcaSeleccionada = marcaSelect.value;

    let modelos = [];

    // Buscar la marca seleccionada en los datos
    if (datosMarcasYModelos.preciosBase.hasOwnProperty(marcaSeleccionada)) {
      modelos = Object.keys(datosMarcasYModelos.preciosBase[marcaSeleccionada]);
    }

    const modeloSelect = document.getElementById("modelo");
    modeloSelect.innerHTML = "<option value=''>Selecciona un modelo</option>";

    modelos.forEach(modelo => {
      const option = document.createElement("option");
      option.value = modelo;
      option.textContent = modelo;
      modeloSelect.appendChild(option);
    });
  }
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

  // Obtener el año del auto ingresado por el usuario
  const anioAuto = parseInt(document.getElementById('anio').value);

  // Validar si el año es válido
  const currentYear = new Date().getFullYear();
  if (isNaN(anioAuto) || anioAuto < 1800 || anioAuto > currentYear) {
  const errorContainer = document.getElementById("error");
  Toastify({
    text: "Por favor, ingresa un año de auto válido.",
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top",
    position: "left",
    stopOnFocus: true,
    style: {
      background: "#f47458",
    },
    onClick: function () { }
  }).showToast();
  return;
  }

  // Ocultar los contenedores innecesarios
  document.getElementById("datosPersonales").style.display = "block";
  document.getElementById("cotizarSeguro").style.display = "block";
  document.getElementById("marcaModelo").style.display = "none";
  document.getElementById("Anio").style.display = "none";
  document.getElementById("siguiente").style.display = "none";

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
  document.getElementById("datosPersonales").style.display = "none";
  document.getElementById("cotizarSeguro").style.display = "none";
  document.getElementById("marcaModelo").style.display = "none";
  document.getElementById("Anio").style.display = "none";
  document.getElementById("siguiente").style.display = "none";

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
  const recalcularContainer = document.getElementById("recalcular");
  recalcularContainer.style.display = "block";

  // Ocultar el botón "Calcular cotización"
  const cotizarSeguroContainer = document.getElementById("cotizarSeguro");
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

  const precioBase = datosMarcasYModelos.preciosBase[marca][modelo];
  let coeficienteEdad = 1;

  // Definir el rango de edad
  if (edad >= 18 && edad < 25) {
    coeficienteEdad = 1.5;
  } else if (edad >= 25 && edad < 60) {
    coeficienteEdad = 1;
  } else if (edad >= 60 && edad <= 100) {
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

 // Evento para cargar las marcas y modelos al cargar la página
  window.addEventListener("DOMContentLoaded", cargarMarcasYModelos);

  // Evento para cargar los modelos al seleccionar una marca
  const marcaSelect = document.getElementById("marca");
  marcaSelect.addEventListener("change", cargarModelos);  

  function mostrarCotizacionesAnteriores() {
    const cotizacionesAnteriores = JSON.parse(localStorage.getItem("cotizacionesAnteriores")) || [];
    const cotizacionesAnterioresContainer = document.getElementById("cotizacionesAnterioresContainer");
  
    // Limpiar las cotizaciones anteriores
    cotizacionesAnterioresContainer.innerHTML = "";
  
    // Mostrar las últimas 3 cotizaciones
    const ultimasCotizaciones = cotizacionesAnteriores.slice(-3);
  
    // Concatenar los textos de las cotizaciones en una variable
    let cotizacionesTexto = "";
    ultimasCotizaciones.forEach(cotizacion => {
      cotizacionesTexto += `Marca: ${cotizacion.marca}, 
          Modelo: ${cotizacion.modelo}, 
          Año: ${cotizacion.anio}, 
          Cotización: $${cotizacion.precioCotizacion}\n\n`;
    });
  
    // Mostrar las cotizaciones anteriores en el contenedor
    Toastify({
      text: cotizacionesTexto,
      duration: -1,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "#184656",
      },
      onClick: function () { }
    }).showToast();
  };
  

  // Mostrar el contenedor de las cotizaciones anteriores
  document.getElementById("CotizacionesAnteriores").style.display = "block";

    
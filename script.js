// Cargar marcas de autos desde JSON
function cargarMarcas() {
  // Datos de marcas de autos
  const marcasJSON = '[{"name": "Ford"},{"name": "Chevrolet"},{"name": "Toyota"},{"name": "Honda"},{"name": "Nissan"}]';
  const marcas = JSON.parse(marcasJSON);

  // Generar las opciones de marcas
  const marcaSelect = document.getElementById("marca");
  marcaSelect.innerHTML = "<option value=''>Selecciona una marca</option>";

  marcas.forEach(marca => {
    const option = document.createElement("option");
    option.value = marca.name;
    option.textContent = marca.name;
    marcaSelect.appendChild(option);
  });
}

// Cargar modelos de autos asociados a la marca seleccionada
function cargarModelos() {
  const marca = document.getElementById("marca").value;

  // Datos de modelos de autos 
  const modelosJSON = {
    "Ford": ["Fiesta", "Focus", "Mustang", "Explorer", "F150"],
    "Chevrolet": ["Spark", "Sonic", "Malibu", "Traverse", "Silverado"],
    "Toyota": ["Yaris", "Corolla", "Camry", "RAV4", "Tacoma"],
    "Honda": ["Fit", "Civic", "Accord", "CVR", "Ridgeline"],
    "Nissan": ["Versa", "Sentra", "Altima", "Rogue", "Titan"]
  };

  const modelos = modelosJSON[marca];

  // Generar las opciones de modelos
  const modeloSelect = document.getElementById("modelo");
  modeloSelect.innerHTML = "<option value=''>Selecciona un modelo</option>";

  modelos.forEach(modelo => {
    const option = document.createElement("option");
    option.value = modelo;
    option.textContent = modelo;
    modeloSelect.appendChild(option);
  });
}

//Precios de los autos
const preciosBase = {
  "Ford": {
    "Fiesta": 1000,
    "Focus": 1200,
    "Mustang": 2000,
    "Explorer": 1800,
    "F150": 2500
  },
  "Chevrolet": {
    "Spark": 900,
    "Sonic": 1100,
    "Malibu": 1900,
    "Traverse": 1700,
    "Silverado": 2200
  },
  "Toyota": {
    "Yaris": 950,
    "Corolla": 1150,
    "Camry": 1950,
    "RAV4": 1750,
    "Tacoma": 2300
    },
    "Honda": {
    "Fit": 950,
    "Civic": 1150,
    "Accord": 1950,
    "CVR": 1750,
    "Ridgeline": 2300
    },
    "Nissan": {
    "Versa": 900,
    "Sentra": 1100,
    "Altima": 1900,
    "Rogue": 1700,
    "Titan": 2200
    }
  };


function mostrarDatosPersonales() {
  const marca = document.getElementById("marca").value;
  const modelo = document.getElementById("modelo").value;
  const año = document.getElementById("año").value;

  // Validar que el año no sea mayor al año actual
  const añoActual = new Date().getFullYear();
  if (año > añoActual) {
    const alerta = document.createElement("p");
    alerta.textContent = "El año ingresado no puede ser mayor al año actual";
    alerta.style.color = "red";
    document.getElementById("Siguiente").appendChild(alerta);
    return;
  }

  // Verificar que los campos de datos del auto estén completos
  if (!marca || !modelo || !año) {
    const alerta = document.createElement("p");
    alerta.textContent = "Por favor completa los datos del auto";
    alerta.style.color = "red";
    document.getElementById("Siguiente").appendChild(alerta);
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
   // Almacenar datos en localStorage
   localStorage.setItem("marca", marca);
   localStorage.setItem("modelo", modelo);
   localStorage.setItem("año", año);

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
    const alerta = document.createElement("p");
    alerta.textContent = "Por favor completa todos los campos";
    alerta.style.color = "red";
    document.getElementById("resultado").appendChild(alerta);
    return;
  }

  // Almacenar datos en localStorage
  localStorage.setItem("marca", marca);
  localStorage.setItem("modelo", modelo);
  localStorage.setItem("año", año);
  localStorage.setItem("edad", edad);
  localStorage.setItem("nombre", nombre);
  localStorage.setItem("apellido", apellido);
  localStorage.setItem("email", email);
  
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
  const errorElement = document.getElementById("error");
  errorElement.textContent = "La edad debe ser mayor o igual a 18";
  errorElement.style.color = "red";
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
  const errorElement = document.getElementById("error");
  errorElement.textContent = "El año debe ser válido";
  errorElement.style.color = "red";
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

  function cargarDatosAlmacenados() {
    const marca = localStorage.getItem("marca");
    const modelo = localStorage.getItem("modelo");
    const año = localStorage.getItem("año");
    const edad = localStorage.getItem("edad");
    const nombre = localStorage.getItem("nombre");
    const apellido = localStorage.getItem("apellido");
    const email = localStorage.getItem("email");
  
    if (marca && modelo && año && edad && nombre && apellido && email) {
      // Establecer los valores en los campos del formulario
      document.getElementById("marca").value = marca;
      document.getElementById("modelo").value = modelo;
      document.getElementById("año").value = año;
      document.getElementById("edad").value = edad;
      document.getElementById("nombre").value = nombre;
      document.getElementById("apellido").value = apellido;
      document.getElementById("email").value = email;
    }
  }
  
  window.addEventListener("DOMContentLoaded", cargarDatosAlmacenados);
  
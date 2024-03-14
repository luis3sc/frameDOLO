  const TIPO_CAMBIO = {
  "peru": 1,
  "mexico": 0.40,
  "argentina": 0.40,
  "brasil": 0.40,
  "ecuador": 0.40,
  "bolivia": 0.40,
  "venezuela": 0.40,
  "colombia": 0.40,
  "estados_unidos": 0.40
};

const simboloMonedaPeru = document.getElementById("simbolo-moneda-peru");
const simbolosMoneda = document.querySelectorAll(".simbolo-moneda");

function cambiarPais() {
  const pais = document.getElementById("pais").value;
  // Actualizar el contenido de los divs con la información del nuevo país
  const precio1Valor = document.getElementById("precio1-valor");
  const precio2Valor = document.getElementById("precio2-valor");
  const precio3Valor = document.getElementById("precio3-valor");

  const simboloMoneda = document.querySelectorAll(".simbolo-moneda");

  if (pais === "peru") {
    precio1Valor.textContent = `S/ ${0.00.toFixed(2)}`;
    precio2Valor.textContent = `S/ ${50.00.toFixed(2)}`;
    precio3Valor.textContent = `S/ ${100.00.toFixed(2)}`;

    for (const simbolo of simboloMoneda) {
      simbolo.textContent = "S/";
    }
  } else {
    precio1Valor.textContent = `$ ${0.00.toFixed(2)}`;
    precio2Valor.textContent = `$ ${50.00.toFixed(2)}`;
    precio3Valor.textContent = `$ ${100.00.toFixed(2)}`;

    for (const simbolo of simboloMoneda) {
      simbolo.textContent = "$";
    }
  }

  cambiarPrecio();
}

function cambiarPrecio() {
  const pais = document.getElementById("pais").value;
  const precio1Valor = document.getElementById("precio1-valor");
  const precio2Valor = document.getElementById("precio2-valor");
  const precio3Valor = document.getElementById("precio3-valor");

  const valor1 = 0 * TIPO_CAMBIO[pais];
  const valor2 = 50 * TIPO_CAMBIO[pais];
  const valor3 = 100 * TIPO_CAMBIO[pais];

  if (pais === "peru") {
    precio1Valor.textContent = `${valor1.toFixed(2)}`;
    precio2Valor.textContent = `${valor2.toFixed(2)}`;
    precio3Valor.textContent = `${valor3.toFixed(2)}`;
  } else {
    precio1Valor.textContent = `${valor1.toFixed(2)}`;
    precio2Valor.textContent = `${valor2.toFixed(2)}`;
    precio3Valor.textContent = `${valor3.toFixed(2)}`;
  }

  const plan1 = document.querySelector('input[name="plan1"]:checked').value;
  const plan2 = document.querySelector('input[name="plan2"]:checked').value;
  const plan3 = document.querySelector('input[name="plan3"]:checked').value;


  if (plan1 === "12") {
    precio1Valor.textContent = `${(valor1 * 10).toFixed(2)}`;
  }
  if (plan2 === "12") {
    precio2Valor.textContent = `${(valor2 * 9.5).toFixed(2)}`;
  }
  if (plan3 === "12") {
    precio3Valor.textContent = `${(valor3 * 8).toFixed(2)}`;
  }
}

cambiarPrecio(); // Inicializar los precios al cargar la página

document.querySelectorAll('input[type="radio"]').forEach(radio => {
  radio.addEventListener('change', cambiarPrecio);
});

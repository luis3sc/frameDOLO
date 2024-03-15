//  CUando selecciona el input se mantiene su color  //
  function changeColorOnFocus() {
    const inputs = document.querySelectorAll(".inputhover");

    for (const input of inputs) {
      input.addEventListener("focus", () => {
        input.classList.add("focused");
      });
    
      input.addEventListener("blur", () => {
        input.classList.remove("focused");
      });
    }
  }

// input de PAISES //
    const phoneInputField = document.querySelector("#phone");
const validationMessageElement = document.querySelector("#validation-message");

const allowedCountries = ["ar","cu","co","cr","sv", "ht", "hn", "py","es", "do","pa","pe", "bo", "pr","ni", "gt","br", "ve", "cl", "mx", "us", "ec", "pt","uy"];

const phoneInput = window.intlTelInput(phoneInputField, {
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
  onlyCountries: allowedCountries,
});

// Función para validar la cantidad de dígitos en el input
function validatePhoneNumber() {
  const fullNumber = phoneInput.getNumber();
  const isValid = fullNumber.length >= 10;

  if (isValid) {
    validationMessageElement.textContent = "";
    phoneInputField.setCustomValidity(""); // Corrected: Set custom validity on the input field
  } else {
    validationMessageElement.textContent = "Número no válido ";
    phoneInputField.setCustomValidity("Número no válido "); // Corrected
  }
}

// Función para enviar mensaje a WhatsApp
function sendDataToWhatsApp() {
  const fullNumber = phoneInput.getNumber()
  const message = generateWhatsAppMessage();
  const encodedMessage = encodeURIComponent(message);
  const whatsappNumber = "51989396941";

  if (fullNumber.length >= 10) {

    const whatsAppLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

    window.open(whatsAppLink, "_blank");
  } else {
    alert("El número de teléfono no es válido");
  }
}
function generateWhatsAppMessage() {
  const fullNumber = phoneInput.getNumber();
  const nombre = document.getElementById("nombre").value;
  const gmail = document.getElementById("gmail").value;
  const pais = document.getElementById("pais").value;
  const nombrenegocio = document.getElementById("nombrenegocio").value;
  const socialmedia = document.getElementById("socialmedia").value;
  const socialmedia2 = document.getElementById("facebook").textContent + document.getElementById("socialmedia2").value;    
    
	  const message = `¡Hola! Quiero hacer un pedido
	  \nDetalles del Pedido:
	  --------------------
	  *Cliente*
	  Nombre: *${nombre}*
    Celular: *${fullNumber}*
	  --------------------
	  *Negocio*
	  Nombre del Negocio: *${nombrenegocio}*
	  Red Social: *${socialmedia}*
	  Facebook: *${socialmedia2}*
	  --------------------
	  --------------------
	  ¡Gracias!`;
	  return message;
	}
// Función para validar la longitud mínima de un campo (reutilizable)
function validateMinLength(inputId, minLength, validationMessageId) {
  const input = document.getElementById(inputId);
  const validationMessage = document.getElementById(validationMessageId);

  if (input.value.length >= minLength) {
    validationMessage.textContent = "";
    input.setCustomValidity("");
  } else {
    validationMessage.textContent = "Falta completar";
    input.setCustomValidity("Longitud mínima: " + minLength + " caracteres");
  }
}


// Iniciar funciones
changeColorOnFocus();
validatePhoneNumber();

  const scriptURL = 'https://script.google.com/macros/s/AKfycbwV1EKQyMuFX6lN8VGY-BG9T8ir7Icq1MzOSPRLAeVK0JxezwP213C0RhO6j9TKYbV6/exec';
  const form = document.forms['google-sheet'];
  const messageDiv = document.getElementById('mensaje');
  

  form.addEventListener('submit', e => {
  e.preventDefault();
  
fetch(scriptURL, { method: 'POST', body: new FormData(form) })
   
    .then(response => {
      if (response.ok) {
        // Hide the form and display the message
        form.style.display = 'none';
        messageDiv.textContent = 'Gracias por completar el formulario. Pronto nos comunicaremos contigo.';
        messageDiv.style.display = 'block';
      } else {
        console.error('Error!', response.statusText); // Log the error status for debugging
        alert("Error al enviar los datos. Inténtalo nuevamente más tarde.");
      }
    })
    .catch(error => {
      console.error('Error!', error.message);
      alert("Error al enviar los datos. Inténtalo nuevamente más tarde.");
    });
});

// Agregar evento "submit" al formulario
document.querySelector("#google-sheet").addEventListener("submit", function(e) {
  e.preventDefault();
  validatePhoneNumber();
  validateMinLength("nombre", 3, "nombre-validation");
  validateMinLength("gmail", 3, "gmail-validation");
  validateMinLength("pais", 3, "pais-validation");
  validateMinLength("nombrenegocio", 3, "nombrenegocio-validation");
  validateMinLength("socialmedia", 3, "socialmedia-validation");
  validateMinLength("socialmedia2", 3, "socialmedia2-validation");
  if (phoneInputField.checkValidity() && document.getElementById("nombre").checkValidity() && document.getElementById("gmail").checkValidity() && document.getElementById("pais").checkValidity() && document.getElementById("nombrenegocio").checkValidity() && document.getElementById("socialmedia").checkValidity() && document.getElementById("socialmedia2").checkValidity()) {
    sendDataToWhatsApp();      
  }
});

// Agregar eventos "input" y "blur" a los inputs para la validación
phoneInputField.addEventListener("input", validatePhoneNumber);
phoneInputField.addEventListener("blur", validatePhoneNumber);

document.getElementById("nombre").addEventListener("blur", () => validateMinLength("nombre", 3, "nombre-validation"));
document.getElementById("gmail").addEventListener("blur", () => validateMinLength("gmail", 3, "gmail-validation"));
document.getElementById("pais").addEventListener("blur", () => validateMinLength("pais", 3, "pais-validation"));
document.getElementById("nombrenegocio").addEventListener("blur", () => validateMinLength("nombrenegocio", 3, "nombrenegocio-validation"));
document.getElementById("socialmedia").addEventListener("blur", () => validateMinLength("socialmedia", 3, "socialmedia-validation"));
document.getElementById("socialmedia2").addEventListener("blur", () => validateMinLength("socialmedia2", 3, "socialmedia2-validation"));

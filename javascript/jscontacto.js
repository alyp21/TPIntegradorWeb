const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const phoneRegex = /^[+()\d\s-]{8,20}$/;

const form = document.getElementById('formContacto');
const errName = document.getElementById('errorNombre');
const errEmail = document.getElementById('errorEmail');
const errPhone = document.getElementById('errorTelefono');
const errMessage = document.getElementById('errorMensaje');
const formErrors = document.getElementById('erroresForm');
const submittedData = document.getElementById('submittedData');

function clearErrors(){
    errName.textContent = '';
    errEmail.textContent = '';
    errPhone.textContent = '';
    errMessage.textContent = '';
    formErrors.textContent = '';
}

function sanitize(str){
    return String(str).replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

form.addEventListener('submit', function(e){
    e.preventDefault();
    clearErrors();

    const name = form.elements['name'].value.trim();
    const email = form.elements['email'].value.trim();
    const phone = form.elements['phone'].value.trim();
    const message = form.elements['message'].value.trim();

    let hasError = false;
    const errors = [];

    if(!name){
        errNombre.textContent = 'Debes ingresar tu nombre. ';
        hasError = true;
    } else if (name.length > 50){
        errorNombre.textContent = 'El nombre no puede tener mas de 50 caracteres. 😾 ';
        hasError = true;
    }

    if(!email){
        errorEmail.textContent = 'Debes ingresar tu email.';
        hasError = true;
    } else if(!emailRegex.test(email)){
        errorEmail.textContent = 'Ingresa un email valido. 😾';
        hasError = true;
    }

    if(!phone){
        errorTelefono.textContent = 'Debes ingresar tu telefono.';
        hasError = true;
    } else if(!phoneRegex.test(phone)){
        errorTelefono.textContent = 'Ingresa un numero valido. 😾';
        hasError = true;
    } else {
        const digits = phone.replace(/\D/g,'');
        if(digits.length < 8 || digits.length > 15){
            errorTelefono.textContent = 'El telefono debe tener entre 8 y 15 dígitos. 😾';
            hasError = true;
        }
    }

    if(message.length > 300){
        errorMensaje.textContent = 'El mensaje no puede superar los 300 caracteres. 😾';
        hasError = true;
    }

    if(hasError){
        erroreForm.textContent = 'Hay errores en el formulario. 😿' + 
        '\n Corregilos para continuar!';
        return;
    }

    submittedData.innerHTML = '';
    const card = document.createElement('div');
    const title = document.createElement('h2');
    title.textContent = 'Datos enviados';
    card.appendChild(title);

    const list = document.createElement('ul');

    function addRow(label, value){
        const li = document.createElement('li');
        li.textContent = label + ': ' + value;
        list.appendChild(li);
    }

    addRow('Nombre', sanitize(name));
    addRow('Email', sanitize(email));
    addRow('Teléfono', sanitize(phone));
    addRow('Mensaje', sanitize(mensaje || '(sin mensaje)'));

    card.appendChild(list);

    const resetBtn = document.createElement('button');
    resetBtn.type = 'button';
    resetBtn.textContent = 'Enviar otro mensaje';
    resetBtn.addEventListener('click', function(){
        submittedData.innerHTML = '';
        form.reset();
    });
    card.appendChild(resetBtn);

    submittedData.appendChild(card);
});

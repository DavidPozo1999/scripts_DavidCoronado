
const postal=document.getElementById("postal");
const numEntero=document.getElementById("entero");
const numReal=document.getElementById("real");
const telefono=document.getElementById("telefono");
const fechaNacimiento=document.getElementById("fecha");
const email=document.getElementById("email");
const DNI=document.getElementById("DNI");
const numURL=document.getElementById("URL");
const password=document.getElementById("password");
const button=document.querySelector("button");

const errorPostal=document.querySelector(".error-postal");
const errorEntero=document.querySelector(".error-entero");
const errorReal=document.querySelector(".error-real");
const errorTelefono=document.querySelector(".error-telefono");
const errorFecha=document.querySelector(".error-fecha");
const errorEmail=document.querySelector(".error-email");
const errorDNI=document.querySelector(".error-dni");
const errorURL=document.querySelector(".error-url");
const errorPassword=document.querySelector(".error-password");


function validarPostal(postal){
    const regex=/(([1-4][0-9][0-9][0-9][0-9])|(0(?=[1-9][0-9][0-9][0-9]))|(5(?=[0-2][0-9][0-9][0-9])))/;

    if(!regex.test(postal.value)){
        postal.classList.add("is-invalid");
        errorPostal.textContent="Postal incorrecto";
    }else{
        postal.classList.remove("is-invalid");
        errorPostal.textContent="";
    }
}

function validarEntero(entero){
    const regex=/^[+-]?\d+$/;

    if(!regex.test(entero.value)){
        entero.classList.add("is-invalid");
        errorEntero.textContent="Numero invalido";
    }else{
        entero.classList.remove("is-invalid");
        errorEntero.textContent="";
    }
}

function validarReal(real){
    const regex=/^[+-]?\d+(\.\d*)?([eE][+-]?\d+)?$/;
    if(!regex.test(real.value)){
        real.classList.add("is-invalid");
        errorReal.textContent="Numero invalido"
    }else{
        real.classList.remove("is-invalid");
        errorReal.textContent="";
    }
}

function validarTelefono(telefono){
    const regex=/^[6789]\d{8}$/;
    if(!regex.test(telefono.value)){
        telefono.classList.add("is-invalid");
        errorTelefono.textContent="Número telefono incorrecto";
    }else{
        telefono.classList.remove("is-invalid");
        errorTelefono.textContent="";
    }
}

function validarFecha(fecha){
    const regex = /^([0][1-9]|[12][0-9]|3[01])(\/|-)([0][1-9]|[1][0-2])\2(\d{4})/;
    if(!regex.test(fecha.value)){
        fecha.classList.add("is-invalid");
        errorFecha.textContent="Fecha incorrecta";
    }else{
        fecha.classList.remove("is-invalid");
        errorFecha.textContent="";
    }
}

function validarEmail(email){
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!regex.test(email.value)){
        email.classList.add("is-invalid");
        errorEmail.textContent="email incorrecto";
    }else{
        email.classList.remove("is-invalid");
        errorEmail.textContent="";
    }
}

function validarDNI(dni){
    const regex=/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;

    if(!regex.test(dni.value)){
        dni.classList.add("is-invalid");
        errorDNI.textContent="DNI invalido";
    }else{
        dni.classList.remove("is-invalid");
        errorDNI.textContent="";
    }

}

function validarURL(URL){
    const regex = /^(https?|ftp):\/\/([a-z0-9-]+\.)+[a-z]{2,6}\/?([/?].*)?$/;
    if(!regex.test(URL.value)){
        URL.classList.add("is-invalid");
        errorURL.textContent="URL INVALIDA";
    }else{
        URL.classList.remove("is-invalid");
        errorURL.textContent="";
    }

}
function validarPassword(password){
    const contieneMinuscula = /[a-z]/.test(password.value);
    const contieneMayuscula = /[A-Z]/.test(password.value);
    const contieneNumero = /\d/.test(password.value);
    const longitudValida = password.value.length >= 8;

    if(password.value==""){
        password.classList.add("is-invalid");
        errorPassword.textContent="Campo vacio";
        return false;
    }else{
        if(!longitudValida){
            password.classList.add("is-invalid");
            errorPassword.textContent="Tiene que tener mínimo 8 caracteres";
            return false;
        }else if(!contieneMinuscula){
            password.classList.add("is-invalid");
            errorPassword.textContent="Tiene que contener mínimo una minuscula";
            return false;
        }else if(!contieneMayuscula){
            password.classList.add("is-invalid");
            errorPassword.textContent="Tiene que contener mínimo una mayuscula";
            return false;
        }else if(!contieneNumero){
            password.classList.add("is-invalid");
            errorPassword.textContent="Tiene que contener mínimo un número";
            return false;
        }else{
            password.classList.remove("is-invalid");
            errorPassword.textContent="";
            return true;
        }
    }
}
button.addEventListener("click",(e)=>{
    e.preventDefault();
    validarPostal(postal);
    validarEntero(numEntero);
    validarReal(numReal);
    validarTelefono(telefono);
    validarFecha(fechaNacimiento);
    validarEmail(email);
    validarDNI(DNI);
    validarURL(numURL);
})
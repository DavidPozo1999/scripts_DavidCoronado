//Recogemos los campos del formulario
const nombre=document.getElementById("nombre");
const nombreUsuario=document.getElementById("nick");
const password=document.getElementById("contraseña");
const cuentaBancaria=document.getElementById("cuenta");
const tarjetaCredito=document.getElementById("tarjeta");
const condicion=document.getElementById("condicion");
const button=document.querySelector("button");
const form=document.querySelector("form");

//Recogemos los contenedores de errores
const errorNombre=document.querySelector(".error-name");
const errorNick=document.querySelector(".error-nick");
const errorPassword=document.querySelector(".error-password");
const errorCuenta=document.querySelector(".error-cuenta");
const errorTarjeta=document.querySelector(".error-tarjeta");

//Creación de las funciones para cada campo
function validarNombre(nombre){
    const regex = /^[a-zA-Z]+$/;
    if(nombre.value==""){
        nombre.classList.add("is-invalid");
        errorNombre.textContent="Campo vacio";
        return false;
    }else if(!regex.test(nombre.value)){
        nombre.classList.add("is-invalid");
        errorNombre.textContent="Caracteres incorrectos";
        return false;
    }else{
        nombre.classList.remove("is-invalid");
        errorNombre.textContent="";
        return true;
    }
}

function validarNick(nick){
    if(nick.value==""){
        nick.classList.add("is-invalid");
        errorNick.textContent="Campo vacio";
        return false
    }else{
        nick.classList.remove("is-invalid");
        errorNick.textContent="";
        return true;
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

function validarCuenta(cuenta){
    const regex=/^(ES\d{2}\d{4}\d{4}\d{2}\d{10})$/;

    if(cuenta.value==""){
        cuenta.classList.add("is-invalid");
        errorCuenta.textContent="Campo vacio";
        return false;
    }else if(!regex.test(cuenta.value)){
        cuenta.classList.add("is-invalid");
        errorCuenta.textContent="Cuenta incorrecta";
        return false;
    }else{
        cuenta.classList.remove("is-invalid");
        errorCuenta.textContent="";
        return true;
    }
}

function validarTarjeta(tarjeta){
    const regex=/^\d{13,19}$/;

    if(tarjeta.value==""){
        tarjeta.classList.add("is-invalid");
        errorTarjeta.textContent="Campo vacio";
        return false;
    }else if(!regex.test(tarjeta.value)){
        tarjeta.classList.add("is-invalid");
        errorTarjeta.textContent="numero de cuenta incorrecto";
        return false;
    }else{
        tarjeta.classList.remove("is-invalid");
        errorTarjeta.textContent="";
        return true;
    }
}

function validarCondicion(condicion){
    if(!condicion.checked){
        condicion.classList.add("is-invalid");
        return false;
    }else{
        condicion.classList.remove("is-invalid");
        return true;
    }
}

//Eventos tipo blur para cuando el campo pierda el foco
nombre.addEventListener("blur", ()=>{validarNombre(nombre)});
nombreUsuario.addEventListener("blur", ()=>{validarNick(nombreUsuario)});
password.addEventListener("blur", ()=>{validarPassword(password)});
cuentaBancaria.addEventListener("blur", ()=>{validarCuenta(cuentaBancaria)});
tarjetaCredito.addEventListener("blur", ()=>{validarTarjeta(tarjetaCredito)});
condicion.addEventListener("blur", ()=>{validarCondicion(condicion)});


//Evento click para validar los campos
button.addEventListener("click",(e)=>{
    e.preventDefault();
    const nombreCondicion=validarNombre(nombre);
    const nickCondicion=validarNick(nombreUsuario);
    const passwordCondicion=validarPassword(password);
    const cuentaCondicion=validarCuenta(cuentaBancaria);
    const tarjetaCondicion=validarTarjeta(tarjetaCredito);
    const condicionCondicion=validarCondicion(condicion);
    //Comprobación de si están bien los campos. En el caso de que lo este hacemos el submit
    if(nombreCondicion && nickCondicion && passwordCondicion && cuentaCondicion && tarjetaCondicion && condicionCondicion){
        form.submit();
    }

})


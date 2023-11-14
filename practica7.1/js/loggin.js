
//Primero recogemos los input y el boton
const inputEmail=document.getElementById("email");
const inputPassword=document.getElementById("password");
const button=document.getElementById("button");

function validarEmail(email){
    //Recogemos el contenedor de error
    const error=document.querySelector(".error-group p");
    //Recogemos el valor del input
    const value=email.value;

    //Comprobación de si la cadena está vacia
    if(value.length===0){
        error.classList.remove("hide-error");
        return false;
    }

    //Comprobación de si la cadena incluye el arroba
    if(!value.includes("@")){
        error.classList.remove("hide-error");
        return false;
    }
   
    //Dividimos la cadena en dos partes para verificar si son correctas
    const parts=value.split("@");
    const leftPart=parts[0];
    const rightPart=parts[1];

    //que la parte izquierda no tenga más de 64 caracteres
    if(leftPart.length>64){
        error.classList.remove("hide-error");
        return false;

    //Comprobación de si escribe un punto al principio o al final de la parte izquierda.
    }else if(leftPart.charAt(0)=="." || leftPart.charAt(leftPart.length-1)=="."){
        error.classList.remove("hide-error");
        return false;
    }else{
        for(let i=0; i< leftPart.length; i++){
            if(leftPart.charAt(i)===leftPart.charAt(i+1)){
                error.classList.remove("hide-error");
                return false;
            }
        }
    }

    //Comprobacion de la parte derecha del arroba

    
}

function validarPassword(password){
    alert(password)
}

button.addEventListener("click",(e)=>{
    validarEmail(inputEmail);
})
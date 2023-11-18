
//recogemos los input, el boton y el campo error
const inputEmail=document.getElementById("email");
const inputPassword=document.getElementById("password");
const button=document.getElementById("button");
const error=document.querySelector(".error-group p")

function validarEmail(email){
    //Recogemos el valor del input
    const value=email.value;

    //Comprobación de si la cadena está vacia
    if(value.length===0){
        return false;
    }

    //Comprobación de si la cadena incluye el arroba
    if(!value.includes("@")){
        return false;
    }
    //Dividimos la cadena en dos partes para verificar si son correctas
    const parts=value.split("@");
    const leftPart=parts[0];
    const rightPart=parts[1];

    //que la parte izquierda no tenga más de 64 caracteres
    if(leftPart.length>64){
        return false;

    //Comprobación de si escribe un punto al principio o al final de la parte izquierda.
    }else if(leftPart.charAt(0)=="." || leftPart.charAt(leftPart.length-1)=="."){
        return false;
    }else{
        for(let i=0; i< leftPart.length; i++){
            if(leftPart.charAt(i)===leftPart.charAt(i+1)){
                return false;
            }
        }
    }

    //Comprobacion de la parte derecha del arroba

    //Comprobación de longitud
    if(rightPart.length < 1){
        return false;
    }
    //Comprobamos que solo pueda escribir letras, numeros, guiones y puntos
    const patronDominio=/^[a-zA-Z0-9.-]+$/;
    if(!patronDominio.test(rightPart)){
        return false;
    }
    return true;

}


//Creación funcion llamada a API
function fetchDataLogin(email, password, error){
    //valor de email
    const valueEmail=email.value;
    //valor password
    const valuePassword=password.value;
    //URL de la API
    const URL="https://jsonplaceholder.typicode.com/users";

    //Llamada a la API.
    fetch(URL)
    .then(response=>{
        if(!response.ok){
            throw new Error(`Error: ${response.status}`)
        }
        //Retorno de los datos en json
        return response.json()
    })
    .then((userList)=>{
        //Comprobación de si los valores de los campos de texto coinciden con lo datos de la api
        const userFind= userList.find(usuario=> usuario.email===valueEmail && usuario.address.zipcode===valuePassword);
        
        //Si coincide le enviamos a la siguiente página
        if(userFind){
            window.open("./blog.html");
        }else{
            error.classList.remove("hide-error");
        }
    })
    .catch((error)=>{
        console.log(error);
        error.classList.remove("hide-error");
    })
}
button.addEventListener("click",(e)=>{
    //Detención del submit
    e.preventDefault();
    
    //Comprobación de si los datos de los campos están escritos correctamente
    if(validarEmail(inputEmail)){
        error.classList.add("hide-error");
        fetchDataLogin(inputEmail,inputPassword, error);
    }else{
        error.classList.remove("hide-error");
    }
})
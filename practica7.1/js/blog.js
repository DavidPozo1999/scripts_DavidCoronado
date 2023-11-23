
//Funcion llamada a api para recoger todos los datos de los usuarios
//Le pasamos un parametro si al llamar a la funcion le pasamos el parametro
//realizara una llamada sobre un usuario en concreto. Si no pasa el parametro
//hara un fetch a todos los usuarios
async function accedeUsers(id){
    
    if(id===undefined){
        //URL de la API
        const URL="https://jsonplaceholder.typicode.com/users";

        try{
            const response=await fetch(URL);

            if(!response.ok){
                throw new Error(`error: ${response.status}`);
            }else{
                const data=await response.json();
                pintaUsuarios(data);
            }
        }catch(error){
            console.error(error);
        }
    }else{
        //URL de la API
        const URL=`https://jsonplaceholder.typicode.com/users/${id}`;

        try{
            const response=await fetch(URL);

            if(!response.ok){
                throw new Error(`error: ${response.status}`);
            }else{
                const data=await response.json();
                pintaFicha(data);
            }
        }catch(error){
            console.error(error);
        }
    }
}

//Funcion que pinta una tabla en el body con datos de los usuarios.
//Le pasamos un parametro que será una lista con todos los usuarios
//dentro de la funcion sacamos los datos que queramos.
//Cada usuario tendra un enlace que llamará a otra función para pintar
//una tarjeta con sus datos.
function pintaUsuarios(userList){
    //Recogemos el contenedor donde vamos a crear la tabla
    const container=document.querySelector("main");
    container.innerHTML="";
    //Creacion de la tabla
    const table=document.createElement("table");
    table.classList.add("table");
    //Creacion del encabezado
    const thead=document.createElement("thead");
    thead.classList.add("thead-dark")
    //creacion fila de encabezado
    const headerRow=document.createElement("tr");

    //Creacion de columnas
    const headerColumn=document.createElement("th");
    headerColumn.textContent="#";
    headerRow.appendChild(headerColumn);
    const headerColumn2=document.createElement("th");
    headerColumn2.textContent="USERNAME";
    headerRow.appendChild(headerColumn2);
    const headerColumn3=document.createElement("th");
    headerColumn3.textContent="EMAIL";
    headerRow.appendChild(headerColumn3);
    const headerColumn4=document.createElement("th");
    headerColumn4.textContent="POSTS";
    headerRow.appendChild(headerColumn4);

    thead.appendChild(headerRow);
    table.appendChild(thead);

    //Creacion del cuerpo
    const tbody=document.createElement("tbody");
        for(x of userList){
            //Creacion de la fila
            const bodyRow=document.createElement("tr");

            //Creacion de las columnas
            var bodyColumn=document.createElement("td");
            bodyColumn.textContent=`${x.id}`;
            bodyRow.appendChild(bodyColumn);
            
            var bodyColumn2=document.createElement("td");
            bodyColumn2.textContent=`${x.name}`;
            bodyRow.appendChild(bodyColumn2);
            
            var bodyColumn3=document.createElement("td");
            bodyColumn3.textContent=`${x.email}`;
            bodyRow.appendChild(bodyColumn3);
            
            var bodyColumn4=document.createElement("td");

            //Creacion de enlaces.
            var a=document.createElement("a");
            a.href="#";
            a.dataset.id=x.id;
            a.textContent="Mostrar Posts";
            bodyColumn4.appendChild(a);

            bodyRow.appendChild(bodyColumn4);
            tbody.appendChild(bodyRow);
        }
        table.appendChild(tbody);
        container.appendChild(table);

        //Recogemos los enlaces de los posts de cada usuario
        const enlaces=table.querySelectorAll("a");
        
        //Evento click y llamada a la función obtenerPosts pasando el id del enlace
        enlaces.forEach(enlace=>{
            enlace.addEventListener("click",(e)=>{
                obtenerPosts(enlace.dataset.id);
            })
        })
}

//Está funcion pinta una ficha en el body con diferentes
//datos del usuario.
function pintaFicha(data){
    //Recogemos el contenedor
    const main=document.querySelector("main");
    main.innerHTML="";
    //Creamos un contenedor y se lo añadimos al anterior contenedor
    const containerCreate=document.createElement("div");
    containerCreate.classList.add("card-container");
    main.appendChild(containerCreate);

    //Recogemos el elemento y le añadimos todo el codigo de la tarjeta
    const container=document.querySelector("main .card-container");

    container.innerHTML=`<div class="card-container">
    <div class="img-container">
        <img src="./img/logo.avif" alt="">
    </div>
    <h3>${data.name}</h3>
    <p class="company">${data.company.name}</p>
    <div class="horizontal-line"></div>
    <div class="dataUser">
        <div class="data-group">
            <h5>${data.address.street}</h5>
            <p>calle</p>
        </div>
        <div class="data-group">
            <h5>${data.address.city}</h5>
            <p>Ciudad</p>
        </div>
        <div class="data-group">
            <h5>${data.website}</h5>
            <p>Website</p>
        </div>
    </div>
</div>`
}

//Funcion que sirve para obtener todos los posts ya sean de un usuario en concreto
//o todos los posts de todos los usuarios, eso dependerá de si a la hora de hacer la llamada
//a la función, le pasamos el id del usuario o no. También envio un parametro que guardo el número de la
//pagina por decirlo asi para poder pasarlo despues a la función que me pinte los posts y así hacer la paginación.
async function obtenerPosts(id, pagina){
    //Si se le pasa el parametro id entonces hacemos la llamada para los posts de ese usuario.
    //en caso contrario hacemos una llamada para todos los posts.
    if(id!=undefined){
        try{
            //enlace de la API
            let URL=`https://jsonplaceholder.typicode.com/posts?userId=${id}`;
            
            const responsePost=await fetch(URL);
            //Si falla la llamada lanzamos un error
            if(!responsePost.ok){
                throw new Error(`Status: ${responsePost.status}`);
            }
            const dataPost=await responsePost.json();
            const idUser=dataPost[0].userId;
            
            //Llamada para recoger los datos del usuario
            URL=`https://jsonplaceholder.typicode.com/users/${idUser}`;
            
            const responseUser=await fetch(URL);

            if(!responseUser.ok){
                throw new Error(`Status: ${responseUser.status}`);
            }

            //LLamada a la función para pintar los posts de un usuario en concreto
            const dataUser=await responseUser.json();

            //Comprobamos el numero de la pagina, si no tiene le ponemos el 1
            if(pagina!=undefined){
                numberPage=pagina
            }else{
                numberPage=1
            }
            pintarPosts(dataPost, dataUser, numberPage);
        }catch(error){
            console.error(error);
        }
    }else{
        try{
            let URL="https://jsonplaceholder.typicode.com/posts";
            const responsePost=await fetch(URL);
            if(!responsePost.ok){
                throw new Error(`status: ${responsePost.status}`);
            }
            const dataPost=await responsePost.json();
            
            //Array donde voy a guardar los datos de los usuarios de cada post.
            var miArray= new Array();
            for(post of dataPost){
                    try{
                        //Llamada a la API
                        const userId=post.userId;
                        let URL=`https://jsonplaceholder.typicode.com/users/${userId}`;
                        let responseUser=await fetch(URL);
                        if(!responseUser.ok){
                            throw new Error(`status: ${responseUser.status}`)
                        }
                        let dataUser=await responseUser.json();
                        
                        //Realizo la función del find para saber si el objeto ya está en el array o no
                        let usuarioEncontrado=miArray.find(user=> user.id===dataUser.id);
                        if(!usuarioEncontrado){
                            miArray.push(dataUser);
                        }
                        if(pagina!=undefined){
                            numberPage=pagina
                        }else{
                            numberPage=1
                        }
                    }catch(error){
                        console.log(error);
                    }
            }
            pintarTodosPosts(dataPost, miArray, numberPage)
        }catch(error){
            console.log(error);
        }
    }
}

//En está función pinto todos los posts de los usuarios.
//Le paso la lista de los posts y los datos del usuario, más la página
//para poder realizar la paginación. 
function pintarPosts(dataPost, dataUser, pagina){
    //Contenedor principal
    const main=document.querySelector("main");
    main.innerHTML="";
    //Creamos una etiqueta contenedor y se la anidamos al contenedor padre
    const div=document.createElement("div");
    div.classList.add("posts-container");
    main.appendChild(div);
    const container=document.querySelector("main .posts-container");
    //Hacemos las variables para sacar de 5 en 5 los posts para la paginación.
    let ultimoElemento=pagina*5;
    let primerElemento=ultimoElemento-5;
    const postArray=dataPost.slice(primerElemento, ultimoElemento);

    //Tambien sacamos la cantidad de paginas que tendremos para poder crear los botones necesarios.
    const pageCount=dataPost.length/5;
    for(let x=primerElemento; x< ultimoElemento; x++){
        container.innerHTML+=`<h3>${postArray[x-primerElemento].title}</h3>
                                <a href="#" class="user" onclick="accedeUsers(${dataUser.id})">${dataUser.name}</a>
                                <p>${postArray[x-primerElemento].body}</p>`;
    }
    pintarBotones(pagina, dataUser.id, pageCount);
}

//Está funcion funcion parecida a la anterior. Le paso una lista de posts, otra lista de usuarios y la pagina
function pintarTodosPosts(dataPost, dataUser, pagina){
    //Recogemos el contenedor pirncipal
    const main=document.querySelector("main");
    main.innerHTML="";

    //Creamos una etiqueta contenedor y se la anidamos al main
    const div=document.createElement("div");
    div.classList.add("posts-container");
    main.appendChild(div);
    //Hacemos las variables para sacar de 5 en 5 los posts.
    let ultimoElemento=pagina*5;
    let primerElemento=ultimoElemento-5;
    const postArray=dataPost.slice(primerElemento, ultimoElemento);
    const container=document.querySelector("main .posts-container");
    
    //Tambien sacamos la cantidad de paginas que tendremos, para los botones.
    const pageCount=dataPost.length/5;
    //Hacemos un for para imprimir todos los posts. Buscamos el indice del usuario para poder
    //sacar el usuario que ha creado ese post.
    for(let x=primerElemento; x< ultimoElemento; x++){
        const positionUser=dataUser.findIndex( usuario=> usuario.id===dataPost[x].userId);
        container.innerHTML+=`<h3>${postArray[x-primerElemento].title}</h3>
                                <a href="#" class="user" onclick="accedeUsers(${dataUser[positionUser].id})">${dataUser[positionUser].name}</a>
                                <p>${dataPost[x-primerElemento].body}</p>`;
    }
    pintarBotones(pagina, dataUser.id, pageCount);

}


function pintarBotones(pagina, userId, pageCount){
    //Contenedor principal
    const main=document.querySelector("main");
    
    //Creamos una etiqueta contenedor
    const div=document.createElement("div");
    div.classList.add("buttons-container");
    main.appendChild(div);
    const container = document.querySelector("main .buttons-container");

     // Creamos los elementos de los botones
    const prevButton = document.createElement("button");
    const nextButton = document.createElement("button");
     // Establecemos las clases y atributos
    prevButton.classList.add("prevButton");
    nextButton.classList.add("nextButton");

    //Si la pagina es igual a 1, entonces solo generamos el boton de next, en caso contrario creamos los dos botones
    if (pagina === 1) {
        nextButton.setAttribute("data-id", pagina + 1);
        nextButton.innerHTML = '<img src="./img/arrow-right.svg" alt="">';
        container.appendChild(nextButton);
    }else{
        //Si la pagina es la ultima solamente creamos el boton de prev, y si es menor entonces creamos los dos botones.
        if(pagina<pageCount){
            prevButton.setAttribute("data-id", Math.max(pagina - 1, 1));
            prevButton.innerHTML = '<img src="./img/arrow-left.svg" alt="">';
            container.appendChild(prevButton);
            nextButton.setAttribute("data-id", pagina + 1);
            nextButton.innerHTML = '<img src="./img/arrow-right.svg" alt="">';
            container.appendChild(nextButton);
        }else if(pagina===pageCount){
            prevButton.setAttribute("data-id", Math.max(pagina - 1, 1));
            prevButton.innerHTML = '<img src="./img/arrow-left.svg" alt="">';
            container.appendChild(prevButton);
        }
    }
    // Añadimos eventos de clic a los botones
    nextButton.addEventListener("click", (e) => {
        //Convertimos el data-set en numero
        const pageId = parseInt(e.currentTarget.dataset.id);
        if(!isNaN(pageId)){
            obtenerPosts(userId, pageId);
        }else{
            console.log("El dataset es NaN")
        }
    });
    prevButton.addEventListener("click", (e) => {
        //Convertimos el data-set en numero
        const pageId = parseInt(e.currentTarget.dataset.id);
        if(!isNaN(pageId)){
            obtenerPosts(userId, pageId);
        }else{
            console.log("El dataset es NaN")
        }
    });

}
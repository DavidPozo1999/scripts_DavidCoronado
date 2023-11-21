

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

function pintaFicha(data){
    //Recogemos el contenedor
    const main=document.querySelector("main");
    main.innerHTML="";
    //Creamos un contenedor y se lo añadimos al anterior contenedor
    const containerCreate=document.createElement("div");
    containerCreate.classList.add("card-container");
    main.appendChild(containerCreate);

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
async function obtenerPosts(id){
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
            console.log(URL)
            const responseUser=await fetch(URL);

            if(!responseUser.ok){
                throw new Error(`Status: ${responseUser.status}`);
            }

            //LLamada a la función para pintar los posts de un usuario en concreto
            const dataUser=await responseUser.json();
            console.log(dataUser.name)
            pintarPosts(dataPost, dataUser);
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
            var miArray= new Array();
            for(post of dataPost){
                    try{
                        const userId=post.userId;
                        let URL=`https://jsonplaceholder.typicode.com/users/${userId}`;
                        let responseUser=await fetch(URL);
                        if(!responseUser.ok){
                            throw new Error(`status: ${responseUser.status}`)
                        }
                        let dataUser=await responseUser.json();
                        
                        let usuarioEncontrado=miArray.find(user=> user.id===dataUser.id);
                        if(!usuarioEncontrado){
                            miArray.push(dataUser);
                        }
                    }catch(error){
                        console.log(error);
                    }
            }
            pintarTodosPosts(dataPost, miArray)
        }catch(error){
            console.log(error);
        }
    }
}


function pintarPosts(dataPost, dataUser){
    //Contenedor principal
    const main=document.querySelector("main");
    main.innerHTML="";
    
    //Creamos una etiqueta contenedor
    const div=document.createElement("div");
    div.classList.add("posts-container");
    main.appendChild(div);

    const container=document.querySelector("main .posts-container");
    for(let x=0; x< 5; x++){
        container.innerHTML+=`<h3>${dataPost[x].title}</h3>
                                <a href="#" class="user" onclick="accedeUsers(${dataUser.id})">${dataUser.name}</a>
                                <p>${dataPost[x].body}</p>`;
    }
}

function pintarTodosPosts(dataPost, dataUser){
    //Recogemos el contenedor pirncipal
    const main=document.querySelector("main");
    main.innerHTML="";

    //Creamos una etiqueta contenedor y se la anidamos al main
    const div=document.createElement("div");
    div.classList.add("posts-container");
    main.appendChild(div);

    const container=document.querySelector("main .posts-container");

    for(let x=0; x< dataPost.length; x++){
        const positionUser=dataUser.findIndex( usuario=> usuario.id===dataPost[x].userId);
        container.innerHTML+=`<h3>${dataPost[x].title}</h3>
                                <a href="#" class="user" onclick="accedeUsers(${dataUser[positionUser].id})">${dataUser[positionUser].name}</a>
                                <p>${dataPost[x].body}</p>`;
    }
}
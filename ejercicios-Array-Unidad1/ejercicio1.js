/*Ejercicio 1.- Crear la clase persona con los atributos nombre, apellidos, población, edad,
estudios, carnet de conducir. Los atributos edad y estudios son privados por lo que deben de
constar de sus correspondientes setters y getters, el resto de los atributos son públicos. Debe
tener un constructor para crear instancias de la clase. Si cuando se crea un objeto, el atributo
no se corresponde con su tipo deberá de dar una alerta */


class Persona{
    #edad;
    #estudio;
    constructor(nombre, apellido, poblacion, edad, estudio, carnetConducir){
        this._nombre=nombre;
        this._apellido=apellido;
        this._poblacion=poblacion;
        this.#edad=edad;
        this.#estudio=estudio;
        this._carnetConducir=carnetConducir;
    }

    /*
    get nombre(){
        return this._nombre;
    }
    get apellido(){
        return this._apellido;
    }

    get poblacion(){
        return this._poblacion;
    }
    */
    get edad(){
        return this.#edad;
    }

    get estudio(){
        return this.#estudio;
    }

    /*
    get carnetConducir(){
        return this._carnetConducir;
    }

    set nombre(nombre){
        this._nombre=nombre;
    }
    set apellido(apellido){
        this._apellido=apellido;
    }
    set poblacion(poblacion){
        this._poblacion=poblacion;
    }
    */
    set edad(edad){
        this.#edad=edad;
    }
    set estudio(estudio){
        this.#estudio=estudio;
    }
    /*
    set carnetConducir(carnetConducir){
        this._carnetConducir=carnetConducir;
    }
    */
}

const persona=new Persona("David","Coronado","Los Yébenes",24,"Muchos", true);

if(typeof(persona._nombre)!="string"){
    alert("nombre incorrecto");
}else if(typeof(persona._apellido)!="string"){
    alert("apellido incorrecto");
}else if(typeof(persona._poblacion)!="string"){
    alert("poblacion incorrecta");
}else if(typeof(persona.edad)!="number"){
    alert("edad incorrecta");
}else if(typeof(persona.estudio)!="string"){
    alert("estudios incorrectos");
}else if(typeof(persona._carnetConducir)!="boolean"){
    alert("carnet incorrecto");
}


//EJercicio 2
/*
Ejercicio 2.- Crear un array con objetos persona , ordénalo y muéstralos en una pagina web
*/

//Creamos los objetos de la clase persona
const persona2=new Persona("Pedro","Diezma","Los Yébenes",25,"ESO",true);
const persona3=new Persona("Danito","Senpai","Sonseca",25,"Outer wilds",true);
const persona4=new Persona("Tomas","Towser","Sonseca",24,"Telecomunicaciones",false);
const persona5=new Persona("Alex","Barba-Abruda","Rumania",30,"DAM",true);

//creamos el array y añadimos todos los objetos
const arrayPersonas=new Array(persona, persona2, persona3, persona4, persona5);

//Ordenamos el array por la edad.
arrayPersonas.sort((a,b)=>{
    return a.edad-b.edad;
});
//Recogemos el contenedor del body para mostrar una lista de los objetos
const listContainer=document.querySelector(".list-container");

//Creamos la etiqueta ul
const ul=document.createElement("ul");

//Recorremos el array
arrayPersonas.forEach(persona=>{
    //Creamos etiqueta li, insertamos el texto y la anidamos al ul
    const li=document.createElement("li");
    li.textContent="Nombre:"+persona._nombre+ " Apellido:"+persona._apellido+" Población: "+persona._poblacion+" edad:"+persona.edad+" estudio:"+persona.estudio+ " carnet:" +persona._carnetConducir;
    ul.appendChild(li);
})
listContainer.appendChild(ul);

/* Ejercicio 3.- Crea un map donde la clave se el dni y el valor sea un objeto persona. Ordena el 
map por orden de clave. Intenta ordenar este por edad. Partiendo de una página web vacía, 
crea una tabla, donde cada fila se corresponde con un alumno, y las columnas los 
correspondientes atributos*/

const mapaPersonas=new Map();
mapaPersonas.set("03939995A",persona);
mapaPersonas.set("37631627Q",persona2);
mapaPersonas.set("10416300Z",persona3);
mapaPersonas.set("72241671M",persona4);
mapaPersonas.set("29838233B",persona5);

//Creamos una matriz para guardar todas las claves y ordenarlas
const clavesOrdenadas=Array.from(mapaPersonas.keys());
clavesOrdenadas.sort();

//Creamos un nuevo mapa con las claves ordenadas
const mapaPersonasOrdenado=new Map();

clavesOrdenadas.forEach(clave=>{
    mapaPersonasOrdenado.set(clave,mapaPersonas.get(clave));
})


//Creamos la estructura completa de la tabla
const tableContainer=document.querySelector(".table-container")
const table=document.createElement("table");
const thead=document.createElement("thead");
const filaHeader=document.createElement("tr");
const ColumnaDni=document.createElement("th");
const ColumnaNombre=document.createElement("th");
const ColumnaApellido=document.createElement("th");
const ColumnaPoblacion=document.createElement("th");
const ColumnaEdad=document.createElement("th");
const ColumnaEstudio=document.createElement("th");
const columnaCarnet=document.createElement("th");
ColumnaDni.textContent="DNI";
ColumnaNombre.textContent="NOMBRE";
ColumnaApellido.textContent="APELLIDO";
ColumnaPoblacion.textContent="POBLACION";
ColumnaEdad.textContent="EDAD";
ColumnaEstudio.textContent="ESTUDIO";
columnaCarnet.textContent="CARNET";
filaHeader.appendChild(ColumnaDni);
filaHeader.appendChild(ColumnaNombre);
filaHeader.appendChild(ColumnaApellido);
filaHeader.appendChild(ColumnaPoblacion);
filaHeader.appendChild(ColumnaEdad);
filaHeader.appendChild(ColumnaEstudio);
filaHeader.appendChild(columnaCarnet);
thead.appendChild(filaHeader);
table.appendChild(thead);


const tbody=document.createElement("tbody");

//Recorremos el mapa y vamos añadiendo el contenido a filas que anidaremos a la tabla
mapaPersonasOrdenado.forEach((persona, clave)=>{
    const filaCuerpo=document.createElement("tr");
    const ColumnaDni=document.createElement("td");
    const ColumnaNombre=document.createElement("td");
    const ColumnaApellido=document.createElement("td");
    const ColumnaPoblacion=document.createElement("td");
    const ColumnaEdad=document.createElement("td");
    const ColumnaEstudio=document.createElement("td");
    const columnaCarnet=document.createElement("td");
    ColumnaDni.textContent=clave;
    ColumnaNombre.textContent=persona._nombre;
    ColumnaApellido.textContent=persona._apellido;
    ColumnaPoblacion.textContent=persona._poblacion;
    ColumnaEdad.textContent=persona.edad;
    ColumnaEstudio.textContent=persona.estudio;
    columnaCarnet.textContent=persona._carnetConducir;
    filaCuerpo.appendChild(ColumnaDni);
    filaCuerpo.appendChild(ColumnaNombre);
    filaCuerpo.appendChild(ColumnaApellido);
    filaCuerpo.appendChild(ColumnaPoblacion);
    filaCuerpo.appendChild(ColumnaEdad);
    filaCuerpo.appendChild(ColumnaEstudio);
    filaCuerpo.appendChild(columnaCarnet);
    tbody.appendChild(filaCuerpo);
})
//Anidamos la tabla al html
table.appendChild(tbody);
tableContainer.appendChild(table);

//Por ultimo recogemos todas las filas y columnas y les damos algo de estilo
table.style.border="1px solid black";

const filasHeader=document.querySelectorAll("th");
const filas=document.querySelectorAll("td");

filasHeader.forEach(columna=>{
    columna.style.border="1px solid black";
    columna.style.textAlign="Center";
})
filas.forEach(fila=>{
    columna.style.border="1px solid black";
    columna.style.textAlign="Center";

})
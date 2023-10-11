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
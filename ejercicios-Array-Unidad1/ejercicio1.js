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

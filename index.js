class Usuario {
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
        this.mostrarLibros = [];
    }

    getFullName() {
        return console.log(`El usuario se llama ${this.nombre} ${this.apellido}`);
    }

    addMascota(nombreMascota) {
        this.mascotas.push(nombreMascota);
    }

    countMascotas() {
        return console.log(`Cantidad de mascotas: ${this.mascotas.length}`);
    }

    addBooks(libro) {
        this.libros.push(libro);
    }

    getBookNames() {
        for(let libro of this.libros) {
            this.mostrarLibros.push(libro.nombre)
        }
        console.log(this.mostrarLibros)
    }
}

let usuarioN = new Usuario(
    'Juan José', 
    'Amborggio', 
    [
        {nombre: "El Código DaVinci", author: "Dan Brown"},
        {nombre: "Inteligencia Emocional", author: "Daniel Goleman"}
    ], 
    ['Perro','Coballo']);

// Prueba de funciones
usuarioN.getFullName();
usuarioN.addMascota('Hamster');
usuarioN.countMascotas();
usuarioN.addBooks({nombre: 'Cinco Esquinas', autor: 'Mario Vargas Llosa'});
usuarioN.getBookNames();



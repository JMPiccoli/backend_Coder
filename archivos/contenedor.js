const fs = require("fs")
let nameFile = "./products.json"
let products = []


class Contenedor{

    constructor(nameFile){
        this.nameFile = nameFile 
    }

    async getData(){
        try {
            const data = await fs.promises.readFile(this.nameFile, "utf-8");
            products = JSON.parse(data);

        } catch (error) {
            if(error.code == "ENOENT") {
                fs.writeFile(this.nameFile, "[]", (error)=>{
                    if(error){
                        console.log("El archivo no pudo crearse.")
                    }
                })
                products = [];
            }
        }
    }

	save = async (object) => {
		try {
			if (products.length > 0) {
				object.id = products[products.length - 1].id + 1;
				products.push(object);
                console.log(object);
				let productsJson = JSON.stringify(products, null, 2);
				await fs.promises.writeFile(this.nameFile, productsJson);
				console.log(
					`Se ha agregado ${object.name} como un nuevo producto`
				);
			} else {
				object.id = 1;
				products.push(object);
				let productsJson = JSON.stringify(products, null, 2);
				await fs.promises.writeFile(this.nameFile, productsJson);
				console.log(
					`Se ha agregado el producto ${object.name}`
				);
			}
		} catch (err) {
			console.log("Ha ocurrido un error, el producto no ha sido guardado");
		}
	};

    async getAll() {
        const datos = await this.getData();
        return JSON.parse(datos);
    };

	getById = async (id) => {
		try {
			let aux;
			products.map((element, index) => {
				if (element.id === id) {
					aux = element;
				} else {
					aux = null;
				}
			});
			if (aux != null) {
				console.log(aux);
			} else {
				console.log("No existe ese ID");
			}
			return aux;
		} catch (error) {
			console.log("No existe ese ID");
			return null;
		}
	};
	deleteById = async (id) => {
		try {
			if (products.find((element) => element.id === id)) {
				let aux = products.filter((element) => element.id != id);
				products = aux;
				await fs.promises.writeFile(
					this.file,
					JSON.stringify(products, null, 2)
				);
				await console.log(`Se ha eliminado el id: ${id}`);
			} else {
				console.log("No se encuentra ese ID");
			}
		} catch (error) {
			console.log("Algo ha salido mal");
		}
	};

	deleteAll = async () => {
		try {
			await fs.promises.writeFile(this.nameFile, JSON.stringify([]));
		} catch (error) {
			console.log("Algo ha salido mal");
		}
	};

}

const product1 = {
	name: "Cuaderno",
	price: 440.25,
};

const product2 = {
	name: "Boligrafo bic",
	price: 95.40,
};

const product3 = {
	name: "Block de hojas rayadas x 500",
	price: 1250.30,
};

const archivo = new Contenedor(nameFile);

async function main() {
	await archivo.getData(nameFile);
	await archivo.save(product1);
	await archivo.save(product2);
	await archivo.save(product3);
	// await archivo.getAll();
	//await archivo.getById(4);
	//await archivo.deleteAll();
	//await archivo.deleteById(1);
	console.log("Fin de la ejecucion");
}

main();
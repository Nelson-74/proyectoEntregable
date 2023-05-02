//const fs = require("fs");
import fs from "fs";

class ProductManager {
  constructor(){
    this.path = "./products.json"    
  }
   
  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf8");
        return JSON.parse(data);
      }
      await fs.promises.writeFile(this.path, JSON.stringify([]));
      return [];
    } catch (error) {
      console.log("Error al leer el archivo", error);
    }
  }

  async addProduct(product) {
    try {
      const data = await this.getProducts();
      const toLookForCode = data.find((p) => p.code === product.code);
      if(toLookForCode){
        return "existing code"
      }if (
        !product.title|| !product.description || !product.price || !product.thumbnail || !product.code || !product.stock
      ){
        return "missing fields to load"
      }
      const lastDataId = data.length > 0 ? data[data.length -1].id + 1 : 1;
      const newProduct = { ...product, id: lastDataId};
      data.push(newProduct);
      const productString = JSON.stringify(data, null, 2);
      await fs.promises.writeFile(this.path, productString);
      return lastDataId;
    } catch (error) {
      throw new Error ("Error al agregar el producto");
    }
  }    

  async getProductById(id) {
    try {
      const data = await this.getProducts();
      const productFound = data.find((p) => p.id === id);
      if (!productFound) {
        throw new Error ("El producto con el id solicitado no fue encontrado");
      }
      return productFound;
    } catch (error) {
      throw new Error("El producto con el id solicitado no fue encontrado");
    }
  }

  async updateProduct(id, newData) {
    try {
      const data = await this.getProducts();
      const index = data.findIndex((p) => p.id === id);
      if (index !== -1) {
        data[index] = { ...newData, id };
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(data, null, 2)
        );
        return data[index];
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("Error al actualizar el producto");
    }
  }

  async deleteProduct(id) {
    try {
      const data = await this.getProducts();
      const index = data.findIndex((p) => p.id === id);
      if (index !== -1) {
        data.splice(index, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(data));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error("Error al eliminar el producto");
    }
  }

  
}


const product1 = {
    title: "Ultraboost 5.0 Dna W",
    description : "zapatillas running de mujer",
    price : 57000,
    thumbnail : "https://assets.adidas.com/images/w_600,f_auto,q_auto/4c0a24c14af8499bb112adfb001b7083_9366/Zapatillas_Ultraboost_5.0_DNA_Blanco_GX3028.jpg",
    code : "uk3554",
    stock: 15
  }  


const productManager = new ProductManager();

//console.log(ProductManager.getProducts());
//console.log(await ProductManager.getProductById(6));
//console.log(ProductManager.getProductById());
//console.log(ProductManager.addProduct(product1));
//console.log(new ProductManager);
//new ProductManager((product1)); 
//console.log( updateProduct());
 
const product2 ={
  title: "Ultraboost 5.0 Dna W",
  description : "zapatillas running de mujer",
  price : 57000,
  thumbnail : "https://assets.adidas.com/images/w_600,f_auto,q_auto/4c0a24c14af8499bb112adfb001b7083_9366/Zapatillas_Ultraboost_5.0_DNA_Blanco_GX3028.jpg",
  code : "uk3554",
  stock: 15
}

const product3 ={
  title: "zapatillas ultraboost 1.0",
  description : "zapatillas running de hombre",
  price : 60000,
  thumbnail : "https://assets.adidas.com/images/w_600,f_auto,q_auto/fbeecf98adaa4edb9cc3af2d0155a85a_9366/Zapatillas_Ultraboost_1.0_Naranja_IG7310.jpg",
  code : "uk9542",
  stock: 9
}

const product4 ={
  title: "zapatillas terrex Ax4",
  description : "zapatillas outdoor de mujer",
  price : 47000,
  thumbnail : "https://assets.adidas.com/images/w_600,f_auto,q_auto/484eea27f4564036be7fad660078802d_9366/Zapatillas_de_Senderismo_Terrex_AX4_Primegreen_Gris_GV7506.jpg",
  code : "uk3435",
  stock: 5
}

const product5 ={
  title: " zapatillas trail running terrex",
  description : "zapatillas outdoor de hombre",
  price : 45000,
  thumbnail : "https://assets.adidas.com/images/w_600,f_auto,q_auto/4857c1fc0699484f8e51af0800ea1bc1_9366/Zapatillas_de_Trail_Running_Terrex_Soulstride_Azul_GZ9035.jpg",
  code : "abc123",
  stock: 7
}

const product6 ={
  title: "remera fram print ",
  description : "remera de mujer",
  price : 13000,
  thumbnail : "https://assets.adidas.com/images/w_600,f_auto,q_auto/d24e9bfdbfd44324852aadbf0017187d_9366/Remera_FARM_Print_Estampada_Azul_HE4924.jpg",
  code : "m3840",
  stock: 25
}

const product7 ={
  title: "remera aeroready",
  description : "remera de hombre",
  price : 12000,
  thumbnail : "https://assets.adidas.com/images/w_600,f_auto,q_auto/888caa3570c3447bb8d0adb20135373a_9366/Remera_AEROREADY_Feelstrong_Camo_Sport_Gris_HD4319.jpg",
  code : "l4648",
  stock: 11
}

const product8 ={
  title: "campera premium slim ",
  description : "Campera para mujer",
  price : 58000,
  thumbnail : "https://assets.adidas.com/images/w_600,f_auto,q_auto/b3802c9cc8594ecf9bd4ae9400f2a0d4_9366/Campera_Con_Capucha_Premium_Slim_Rosa_HM2611.jpg",
  code : "m3456",
  stock: 3
}

const product9 ={
  title: "campera térmica",
  description : "campera para hombre",
  price : 69000,
  thumbnail : "https://assets.adidas.com/images/w_600,f_auto,q_auto/385ece0cea53490e8344a7f90123281c_9366/Campera_Termica_con_Capucha_VARILITE_Negro_BQ7782.jpg",
  code : "b9920",
  stock: 4
}

const product10 ={
  title: "camiseta alternativa selección",
  description : "camiseta para mujer",
  price : 21000,
  thumbnail : "https://assets.adidas.com/images/w_600,f_auto,q_auto/a3e5c68026ca49288f15afa201048d57_9366/Camiseta_Alternativa_Seleccion_Argentina_Femenina_23_Negro_HT4228.jpg",
  code : "a2223",
  stock: 9
}

const product11 ={
  title: "chomba de entremamiento Boca",
  description : "chomba para hombres",
  price : 22000,
  thumbnail : "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/0c4ee951be8b47139fceaf860105d94c_9366/Chomba_de_Entrenamiento_Boca_Juniors_Azul_HC0996_01_laydown.jpg",
  code : "m1974",
  stock: 10
}

const product12 ={
  title: "zapatillas adidas grand court",
  description : "zapatillas para niñas",
  price : 23000,
  thumbnail : "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/53668cf51f1840e9ab3faf8c00d1e1f4_9366/Zapatillas_adidas_Grand_Court_Blanco_HP8910_04_standard.jpg",
  code : "n1435",
  stock: 8
}

const product13 ={
  title: "conjunto buzo con capucha",
  description : "conjunto para niños",
  price : 24000,
  thumbnail : "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/f342e66e2e1a4ff39601ae8301227f4b_9366/Conjunto_Buzo_con_Capucha_Camo_Azul_HK0319_01_laydown.jpg",
  code : "n7890",
  stock:5 
} 
  
export default ProductManager;
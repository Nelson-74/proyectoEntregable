import express from "express";
import ProductManager from "./productsManager.js";
const container = new ProductManager();
app.use(express.json);
app.use(express.urlencoded({extended: true}));

const app = express();
const port = 3000;


app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
  });

  app.get('/', (req, res) => {
    res.send('Hello World!')
  });

app.get ("/products", async (req,res) => {
    try {
        const {limit} = req.query.limit;
        const products = await container.getProducts();
        if(limit){
            res.status(200).json(products.slice(0, limit));
        }else{
            res.status(200).json(products);    
        }
        
    } catch (error) {
        res.status(500).json({message: "There was a mistake"});
    }
}); 

app.get ("/products/:id", async (req,res) => {
    try {
        const {id} = req.params.pid;
        const productFound = container.getProductById(parseInt(id));
            if (!productFound){
                 return res.status(404).json({error: "Product not found"});
            }else{
             res.status(200).json(product);
            }
    }catch (error){
        res.status(500).json({message: "There was a mistake"})
    }
}); 
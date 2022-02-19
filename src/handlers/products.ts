import express, { Request, Response } from 'express'
import { Product, ShoppingStore } from '../models/product'
import authenticateToken from '../middleware/authenticateJWT'

const store = new ShoppingStore()

//express handler function
const index = async (_req: Request, res: Response ) =>{
    const products = await store.index()
    res.json(products)
}

const show = async(_req:Request, res:Response) =>{
    const productID: string = _req.params.id
    const products = await store.show(parseInt(productID))
    res.json(products)
}

const create = async(_req:Request, res:Response) =>{
    try{
        const product: Product = {
            name:_req.body.name,
            category:_req.body.category,
            price:_req.body.price
        }
        const result = await store.create(product)
        res.json(result)
    } catch(error){
        res.status(400)
        res.json(error)
    }
}

//route express function with route and response 
const product_routes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id',show)
    app.post('/products', authenticateToken,create)
}

export default product_routes
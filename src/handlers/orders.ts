import express, { Request, Response } from 'express'
import {Order, ShoppingStoreOrders} from '../models/order'
//import authenticateToken from '../middleware/authenticateJWT'

const store = new ShoppingStoreOrders()

//express handler function
const index = async (_req: Request, res: Response ) =>{
    const orders = await store.index()
    res.json(orders)
}


const create = async(_req: Request, res: Response) =>{
        try {
            const order: Order ={
                status:_req.body.status,
                user_id:_req.body.user_id,
            }
            const createdOrder = await store.create(order);
            res.json(createdOrder);  

        }catch(error){
            res.status(400)
            res.json(error)
        }
}

const getUserOrders = async (_req: Request, res: Response) => {
    const userID: string = _req.params.id
    try{
        //const userOrders = await store.getUserOrders(parseInt(userID))
        const userOrders = await store.getUserOrders(userID)
        res.json(userOrders)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}


//route express function with route and response 
const order_routes = (app: express.Application) => {
    app.get('/orders', index)
    app.get('/userorders/:id', getUserOrders)
    app.post('/orders', create)
}

export default order_routes
import express, { Request, Response } from 'express'
import authenticateToken from '../middleware/authenticateJWT'
import {User, ShoppingStoreUser}from '../models/user';

const store = new ShoppingStoreUser()

//express handler function
const index = async (_req: Request, res: Response ) =>{
    const users = await store.index()
    res.json(users)
}

const show = async(_req:Request, res:Response) =>{
    const userID: string = _req.params.id
    const users = await store.show(parseInt(userID))
    res.json(users)
}

const create = async(_req:Request, res:Response) =>{
    try{
        const user: User = {
            firstName: _req.body.firstname,
            lastName: _req.body.lastname,
            password_digest: _req.body.password_digest
        }
        if (!user.firstName || !user.password_digest) {
            res.json('invalid username and password!')
            return
          }
          const createdUser = await store.create(user);
          res.json(createdUser);  
    }catch(error){
        res.status(400)
        res.json(error)
    }
}

//route express function with route and response 
const user_routes = (app: express.Application) => {
    app.get('/users', authenticateToken,index)
    app.get('/users/:id', authenticateToken, show)
    app.post('/users/create', create)
}

export default user_routes
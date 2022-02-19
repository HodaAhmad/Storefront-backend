import express, { Request, Response } from 'express'
//import authenticateToken from '../middleware/authenticateJWT'
import {User, ShoppingStoreUser}from '../models/user';
import  jwt  from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

const store = new ShoppingStoreUser()

//express handler function
const index = async (_req: Request, res: Response ) =>{
    const users = await store.index()
    res.json(users)
}

const show = async(_req:Request, res:Response) =>{
    const userID: string = _req.params.id
    const users = await store.show(userID)
    res.json(users)
}
/*
const create = async(_req:Request, res:Response) =>{
    const user: User = {
        firstName: _req.body.firstname,
        lastName: _req.body.lastname,
        password_digest: _req.body.password_digest
    }
    try{
        if (!user.firstName || !user.password_digest) {
            res.json('invalid username and password!')
            return
          }
          const createdUser = await store.create(user);
          var token = jwt.sign({user: createdUser}, process.env.TOKEN_SECRET as string);
          res.json(token);  
          
    }catch(error){
        res.status(400)
        res.json(error)
    }
}
*/
const create = async(_req: Request, res: Response) => {
    const user: User = {
        firstName: _req.body.firstName,
        lastName: _req.body.lastName,
        password_digest: _req.body.password_digest
    }
    try{
        const newUser = await store.create(user)
        var token = jwt.sign({user: newUser}, process.env.TOKEN_SECRET as string);
        res.status(200).json(token)
    }
    catch (err){
        res.status(400)
    }
}
//route express function with route and response 
const user_routes = (app: express.Application) => {
    app.get('/users',index)
    app.get('/users/:id', show)
    app.post('/create',create)
}

export default user_routes
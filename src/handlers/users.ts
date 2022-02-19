import express, { Request, Response } from 'express'
import authenticateToken from '../middleware/authenticateJWT'
import {User, ShoppingStoreUser}from '../models/user';
import  jwt  from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

const store = new ShoppingStoreUser()

const index = async (_req: Request, res: Response ) =>{
    const users = await store.index()
    res.status(200).json(users)
}

const show = async(_req:Request, res:Response) =>{
    const userID: string = _req.params.id
    const user = await store.show(userID)
    res.status(200).json(user)
}


const create = async(_req: Request, res: Response) => {
    const user: User = {
        firstName: _req.body.firstName,
        lastName: _req.body.lastName,
        password_digest: _req.body.password_digest
    }
    try{
        const newUser : User = await store.create(user)
        const token = jwt.sign({user: newUser}, process.env.TOKEN_SECRET as string);
        res.send({token})
    }
    catch (err){
        res.json(err as string+user)
        res.status(400)
    }
}

const login  = async (_req: express.Request, res: express.Response) => {
    try {
      const user: User = await store.authenticateUser(
        _req.body.firsNname,
        _req.body.lastName,
        _req.body.password_digest
      )
      if (user !== null){
      const token = jwt.sign({ user }, process.env.TOKEN_SECRET as string);
      const {password_digest, ...others} = user
      res.send({ ...others,token });
      }
    } catch (err) {
      res.status(400);
      res.json(err as string);
    }
  };
  
//route express function with route and response 
const user_routes = (app: express.Application) => {
    app.get('/users',authenticateToken,index)
    app.get('/users/:id', authenticateToken ,show)
    app.post('/users',create)
}

export default user_routes
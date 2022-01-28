import client from '../database';

export type Order = {
    id?: number;
    status: string;
    user_id?: number;
}

export type OrderProduct = {
    id?: number;
    quantity: number;
    productID: number;
    orderID:number;
}

export class ShoppingStoreOrders{

    //creating order
    async create(order: Order): Promise<Order>{
        try{
            const conn = await client.connect() //connecting to database
            const sql = `INSERT INTO orders(user_id, status) VALUES ($1,$2) RETURNING *`
            const result = (await conn.query(sql, [order.user_id, order.status])).rows[0]
            conn.release()
            return result;
        }catch(e){
            throw new Error(`Could not create order. ${e}`)
        }
    }
    //index getting all orders
    async index(): Promise<Order[]> {
        try {
          const conn = await client.connect() //connect to db
          const sql = `SELECT * FROM orders` //sql query
          const result = (await conn.query(sql)).rows //query passing
          conn.release() //close connection
          return result
        } catch (err) {
          throw new Error(`cannot get orders. ${err}`)
        }
      }

    //get order 
    async show(id: number): Promise<Order>{
        try{
            const conn = await client.connect() //connect to db
            const sql = `SELECT * FROM orders WHERE id=($1)` //sql query
            const result = (await conn.query(sql)).rows[0] //getting result order
            conn.release() //closing connection
            return result
        } catch (err){
            throw new Error(`could not get specified order ${err}` )
        }
    }

    //get orders by user
    async getUserOrders(user_id: number): Promise<Order[]>{
        try{
            const conn = await client.connect() //connect to db
            const sql = `SELECT * FROM orders WHERE user_id=($1) AND status ='active'` //getting result orders by user
            const result = await conn.query(sql, [user_id]) 
            conn.release() //closing connection
            return result.rows
        } catch (err){
            throw new Error(`could not get user orders ${err}` )
        }
    }

}
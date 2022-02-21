import client from "../database";

export type Product = {
    id?: string;
    name: string;
    price: Number;
    category: string;
}

export class ShoppingStore{
    //index function
    async index(): Promise<Product[]>{
        try{
            const conn = await client.connect()
            const sql = 'SELECT * FROM product'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err){
            throw new Error(`cannot get products ${err}`)
        }
    }

    //get product funtion
    async show (id: string) : Promise<Product> {
        try{
            const conn = await client.connect() //db connection
            const sql = `SELECT * FROM product WHERE id=($1)` //sql query
            const result = (await conn.query(sql, [id])).rows[0] //passing query
            conn.release() //closing connection
            return result 
        } catch (e) {
            throw new Error (`cannot find specified product $`)
        }
    }

    //create product function
    async create(product: Product): Promise<Product> {
        try {
            const conn = await client.connect() //db connection
            const sql = 'INSERT INTO product (name, price, category) VALUES ($1, $2, $3) RETURNING *;';
            const sqlValues = [product.name, product.price, product.category]; //setting query values
            const result = (await conn.query(sql, sqlValues)).rows[0]; 
            conn.release() //closing connection
            return result 
        } catch (err) {
            throw new Error(`Could not create product Error: ${err}`);
        }
    }

}
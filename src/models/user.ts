import dotenv from 'dotenv'
import client from '../database'
import bcrypt from 'bcrypt'

export type User = {
	id?: string;
	firstName: string;
	lastName: string;
	password_digest: string;
};

//getting salt and pepper
dotenv.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export class ShoppingStoreUser {
    //index functions
    async index(): Promise<User[]> {
      try {
        const conn = await client.connect() //connecting to database
        const sql = `SELECT * FROM users;` //sql query
        const result = await conn.query(sql) //passing query
        conn.release() //closing connection
        return result.rows //returning the result
      } catch (error) {
        throw new Error(`Cannot get users ${error}`) //error handling for no users found
      }
    }

    //get user function
    async show(id: string): Promise<User> {
        try {
          const conn = await client.connect() //connecting to database
          const sql = 'SELECT * FROM users WHERE id=($1);' //sql query
          const result = await conn.query(sql, [id]) //passing query
          conn.release() //closing connection
          return result.rows[0]
        } catch (err) {
          throw new Error(`Could not get user with passed id. ${err}`) //error handling for no user with specified id found
        }
      } 

      //create user function
      async create(usr: User): Promise<User> {
        const hashedPassword = bcrypt.hashSync(
          usr.password_digest + BCRYPT_PASSWORD,
          parseInt(SALT_ROUNDS as string, 10)
        )
        try {
          const conn = await client.connect()
          const sql = 'INSERT INTO users (firstName, lastName, password_digest) VALUES ($1, $2, $3) RETURNING *'
          const result = await conn.query(sql, [
            usr.firstName,
            usr.lastName,
            hashedPassword
          ])
          conn.release()
          console.log(`user ${usr.id} created successfully `)
          return result.rows[0]
        } catch (err) {
          throw new Error(`Could not add user ${usr.id}. ${err}`)
        }
      } 

      async delete(id: string) : Promise<User>{
        try{
          const conn = await client.connect()
          const sql = `DELETE FROM users WHERE id=($1)`
          const result = await (await conn.query(sql,[id])).rows
          conn.release()
          return result[0];
        } catch (err){
          throw new Error(`couldnt delete user with id${id}. ${err}`)
        }
      }
      
    //password authintication function
async authenticate(fname: string, lname: string, password:string) : Promise<User | null> {
    
    const conn = await client.connect()
    const sql = 'SELECT password_digest FROM users WHERE firstName=($1) AND lastName =($2);'

    const result = await conn.query(sql, [fname, lname])

    //console.log(password+pepper)

    if(result.rows.length) {
        const user = result.rows[0]

        //console.log(user)

        if (bcrypt.compareSync(password+BCRYPT_PASSWORD, user.password_digest)){
            return user
        }
    }
    return null
    }
}

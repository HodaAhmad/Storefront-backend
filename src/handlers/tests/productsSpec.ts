import supertest from "supertest";
import app from "../../server";
import { Product } from "../../models/product";
import { request } from "express";
import { User } from "../../models/user";

const route = supertest(app); 
let token:string

describe('Testing product endpoints', () => {

    describe('testing for  /products', () => {
        const testUser: User = {
            firstName: 'Test',
            lastName:'Test',
            password_digest: 'goodgood'
        }
        
        const testProduct:Product = {
            name:'test',
            price:10,
            category:'test'

        }
        const testProduct2:Product = {
            name:'test2',
            price:20,
            category:'test2'

        }

        beforeAll(async() =>{
            const response = await route.post('/users').send(testUser)
            token = response.body.token
        })
        it('should create new product', async () => {
            await route
              .post('/products')
              .send(testProduct)
              .set('Authorization', 'bearer ' + token)
              .expect(200);
          });

        it ('should list products' ,async() =>{
            await route
            .get('/products')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
        })

    })
}) 


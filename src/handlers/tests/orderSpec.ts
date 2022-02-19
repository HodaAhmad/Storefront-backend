
import supertest from 'supertest'
import app from '../../server'
import { Order, OrderProduct } from '../../models/order'
import { User } from '../../models/user'

const route = supertest(app)
let order: Order
let token: String
let result: supertest.Response

describe('testing for  /orders', () => {
    const testUser: User = {
        firstName: 'Test',
        lastName:'Test',
        password_digest: 'goodgood'
    }
    
    const testOrder:Order = {
        status:'active',
        user_id: testUser.id
    }
    

    beforeAll(async() =>{
        const response = await route.post('/users').send(testUser)
        token = response.body.token
    })

    it('should create new order', async () => {
        await route
          .post('/orders')
          .send(testOrder)
          .set('Authorization', 'bearer ' + token)
          .expect(200);
      });

    it ('should list orders' ,async() =>{
        await route
        .get('/orders')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
    })



})
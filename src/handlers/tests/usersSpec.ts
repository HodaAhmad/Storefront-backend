import supertest from "supertest";
import app from "../../server";
import { User } from "../../models/user";

const route = supertest(app)

let token: string
let result: supertest.Response


describe('Testing /users endpoints', () =>{
    let token: string

    const testUser: User = {
        firstName: 'Hoda',
        lastName: 'Anis',
        password_digest: 'hodahoda'
      };

    it('should create new user', async () => {
        const response = await route.post('/users').send(testUser);
        expect(200);
        token = response.body.token;
        //console.log('Token', token);
      });

    it(' Should respond with status 200', async () =>{
        result = await route.post(`/users`).send({
            firstName: 'Hoda',
            lastName:'Anis',
            password_digest: 'goodgod'
        })
        token = result.body.accessToken; 
        expect(result.status).toEqual(200)

    })


}) 
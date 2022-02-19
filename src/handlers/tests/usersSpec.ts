import supertest from "supertest";
import app from "../../server";
import { User } from "../../models/user";

const route = supertest(app)

let testUser: User
let token: string
let result: supertest.Response

describe('Testing user endpoints', () =>{
    it('POST api/users/create . Should respond with status 200', async () =>{
        result = await route.post(`/api/users/create`).send({
            firstName: 'Hoda',
            lastName:'Anis',
            password_digest: 'goodgod'
        })
        expect(result.status).toEqual(201)
    })
})
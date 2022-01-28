import { User, ShoppingStoreUser } from "../user";

const store = new ShoppingStoreUser()

let testUser : User;


describe("User Model", ()=>{
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    //testing index method
    it('Should return a list of users : index method', async () => {
        const result = await store.index();
        expect(result).toEqual([]);
    });

    //testing create method
    it("Should create a user : create method", async () => {
        const resultUser: User = await store.create({
            firstName: "Hoda",
            lastName: "Anis",
            password_digest: 'goodgreat'
        })
        testUser = resultUser
        console.log(testUser)

        expect(testUser).toEqual(
            jasmine.objectContaining({
                id: resultUser.id,
                firstName: "Hoda",
                lastName: "Anis"
            })
        )
    })
    
   
    //testing show method
    it("Should return a user : show method", async () => {
        const result = await store.show(testUser.id as number);
        expect(result).toEqual(
            jasmine.objectContaining({
                id: testUser.id,
                firstName: 'Hoda',
                lastName: 'Anis'
            })
        )
    }); 
    
});
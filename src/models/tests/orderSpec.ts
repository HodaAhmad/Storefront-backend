import { Order, ShoppingStoreOrders } from "../order";
import { ShoppingStoreUser, User } from "../user";

const store = new ShoppingStoreOrders()
const userStore = new ShoppingStoreUser()

let testOrder: Order;
let testUser: User

describe("Order Model", ()=>{

    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    beforeAll(async () => {
        const result: User = await userStore.create({
          firstName: 'test',
          lastName: 'test',
          password_digest: 'good'
        })
        testUser = result
      })
    afterAll(async () => {
        await userStore.delete(testUser.id as number)
    })
    //testing index method
    it('Should return a list of orders : index method', async () => {
        const result = await store.index();
        expect(result).toEqual([]);
    });

    //should create an order
    it('should create an order : create method', async () => {
        const result = await store.create({
            user_id: testUser.id, 
            status: "Open"
        })
        testOrder = result
        expect(result).toEqual(jasmine.objectContaining({
            id: testOrder.id,
            user_id: testUser.id, 
            status: "Open"
        })
        );
    })


});   
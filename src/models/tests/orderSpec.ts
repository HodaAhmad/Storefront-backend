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
    
      it('should have a show method', () => {
        expect(store.show).toBeDefined();
      });
    
      it('should have a create method', () => {
        expect(store.create).toBeDefined();
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
        await userStore.delete(testUser.id as string)
    })
    //testing index method
    it('Should return a list of orders : index method', async () => {
        const result = await store.index();
        expect(result).toContain(
            jasmine.objectContaining({
                id: 1,
                status: 'active'
            })
        );
    });

    //should create an order
    it('should create an order : create method', async () => {
        const result = await store.create({
            //user_id: testUser.id, 
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
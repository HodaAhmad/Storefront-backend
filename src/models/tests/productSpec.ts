
import { Product, ShoppingStore } from '../product';


const store = new ShoppingStore()

/*const productTest: Product = {
    "name":"Product",
    "category":"Category",
    "price":0 
}; */
let testProduct : Product;

describe("Product Model", ()=>{
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
      });
    
      it('should have a show method', () => {
        expect(store.show).toBeDefined();
      });
    
      it('should have a create method', () => {
        expect(store.create).toBeDefined();
      });

    //testing index method
    it('Should return a list of products : index method', async () => {
        const result = await store.index();
        expect(result).toContain(
            jasmine.objectContaining({
                id: 1
            })
        );
    });

    it('should create a product', async () => {
        const result = await store.create({
            name: 'new product',
            price: 0,
            category:'products'
        });
        testProduct = result;
        expect(result).toEqual({
            id: testProduct.id,
            name: testProduct.name,
            price: testProduct.price,
            category:testProduct.category
        })
        testProduct = result
    })
});
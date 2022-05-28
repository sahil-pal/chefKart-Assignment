const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/app');
const messageBundle = require('../src/locales/en');
const {SUCCESS,SERVER_ERROR} = require('../src/utils/config').STATUS_CODES;

// Assertion style
chai.should();
chai.use(chaiHttp);

// Test suite for User APIs
describe('Cart API',()=>{

    /**
     * Test the GET route : Display Cart
     */
     describe("GET /cart/display",()=>{
        it("It should display that cart is empty for newly created user", (done) => {
            const cartData = {
                userID : 'test2@gmail.com',
            };
            chai.request(server)
                .post("/cart/display")
                .send(cartData)
                .end((error,response)=>{
                    response.statusCode.should.equal(SUCCESS);
                    response.body.should.have.property('message').eq(messageBundle["CartProductEmpty.success"]);
                done();
            });
        });
    });

    /**
     * Test the POST route : Add to Cart
     */
    describe("POST /cart/add",()=>{
        it("It should add product to cart of newly created user", (done) => {
            const cartData = {
                userID : 'test2@gmail.com',
                productID : 1,
                qty : 1,
            };
            chai.request(server)
                .post("/cart/add")
                .send(cartData)
                .end((error,response)=>{
                    response.statusCode.should.equal(SUCCESS);
                    response.body.should.have.property('message').eq(messageBundle["CartProductInsertion.success"]);
                done();
            });
        });

        it("It should detect duplicate product entry in cart", (done) => {
            const cartData = {
                userID : 'test2@gmail.com',
                productID : 1,
                qty : 1,
            };
            chai.request(server)
                .post("/cart/add")
                .send(cartData)
                .end((error,response)=>{
                    response.statusCode.should.equal(SUCCESS);
                    response.body.should.have.property('message').eq(messageBundle["CartProductDuplicateInsertion.success"]);
                done();
            });
        });
    });

    /**
     * Test the GET route : Display Cart
     */
     describe("GET /cart/display",()=>{
        it("It should display products in cart for newly created user", (done) => {
            const cartData = {
                userID : 'test2@gmail.com',
            };
            chai.request(server)
                .post("/cart/display")
                .send(cartData)
                .end((error,response)=>{
                    response.statusCode.should.equal(SUCCESS);
                    response.body.should.have.property('records');
                    response.body.should.have.property('message').eq(messageBundle["CartProductDisplay.success"]);
                done();
            });
        }); 
    });

    /**
     * Test the POST route : Update products in Cart
     */
     describe("POST /cart/update",()=>{
        it("It should detect that a product does not exist in cart for updation", (done) => {
            const updatedCartData = {
                userID : 'test2@gmail.com',
                productID : 3,
                qty : 2,
            };
            chai.request(server)
                .post("/cart/update")
                .send(updatedCartData)
                .end((error,response)=>{
                    response.statusCode.should.equal(SUCCESS);
                    response.body.should.have.property('message').eq(messageBundle["CartProductNotFound.success"]);
                done();
            });
        });

        it("It should update qty of product in cart", (done) => {
            const updatedCartData = {
                userID : 'test2@gmail.com',
                productID : 1,
                qty : 5,
            };
            chai.request(server)
                .post("/cart/update")
                .send(updatedCartData)
                .end((error,response)=>{
                    response.statusCode.should.equal(SUCCESS);
                    response.body.should.have.property('message').eq(messageBundle["CartProductUpdated.success"]);
                done();
            });
        });  
    });

    /**
     * Test the POST route : Delete products in Cart
     */
     describe("POST /cart/delete",()=>{
        it("It should detect that a product does not exist in cart for deletion", (done) => {
            const productData = {
                userID : 'test2@gmail.com',
                productID : 3,
            };
            chai.request(server)
                .post("/cart/delete")
                .send(productData)
                .end((error,response)=>{
                    response.statusCode.should.equal(SUCCESS);
                    response.body.should.have.property('message').eq(messageBundle["CartProductNotFound.success"]);
                done();
            });
        });

        it("It should delete product in cart", (done) => {
            const productData = {
                userID : 'test2@gmail.com',
                productID : 1,
            };
            chai.request(server)
                .post("/cart/delete")
                .send(productData)
                .end((error,response)=>{
                    response.statusCode.should.equal(SUCCESS);
                    response.body.should.have.property('message').eq(messageBundle["CartProductDeletion.success"]);
                done();
            });
        });  
    });


});
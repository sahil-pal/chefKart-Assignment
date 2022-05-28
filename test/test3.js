const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/app');
const messageBundle = require('../src/locales/en');
const {SUCCESS,SERVER_ERROR} = require('../src/utils/config').STATUS_CODES;

// Assertion style
chai.should();
chai.use(chaiHttp);

// Test suite for User APIs
describe('Order API',()=>{


    /**
     * Test the POST route : Add to Cart
     */
    describe("POST /order/add",()=>{
        it("It should failed to add order due to empty cart", (done) => {
            const orderData = {
                userID : 'test2@gmail.com',
            };
            chai.request(server)
                .post("/order/add")
                .send(orderData)
                .end((error,response)=>{
                    response.statusCode.should.equal(SUCCESS);
                    response.body.should.have.property('message').eq(messageBundle["CartProductNotFound.success"]);
                done();
            });
        });

        it("It should add 2 product to cart of newly created user", (done) => {
            const cartData = [
                {userID : 'test2@gmail.com',productID : 1,qty : 5,},
                {userID : 'test2@gmail.com',productID : 2,qty : 4,}
            ];
            for(var i = 0; i < cartData.length; i++){
                chai.request(server)
                .post("/cart/add")
                .send(cartData[i])
                .end((error,response)=>{
                    response.statusCode.should.equal(SUCCESS);
                    response.body.should.have.property('message').eq(messageBundle["CartProductInsertion.success"]);
                    done();
                });
            }
        });

        it("It should add order and empty product in cart", (done) => {
            const orderData = {
                userID : 'test2@gmail.com',
            };
            chai.request(server)
                .post("/order/add")
                .send(orderData)
                .end((error,response)=>{
                    response.statusCode.should.equal(SUCCESS);
                    response.body.should.have.property('message').eq(messageBundle["OrderInsertion.success"]);
                done();
            });
        });
    });


    /**
     * Test the GET route : Display Orders
     */
     describe("GET /order/display",()=>{
        it("It should display order details", (done) => {
            const orderData = {
                userID : 'test2@gmail.com',
            };
            chai.request(server)
                .post("/order/display")
                .send(orderData)
                .end((error,response)=>{
                    response.statusCode.should.equal(SUCCESS);
                    response.body.should.have.property('records');
                    response.body.should.have.property('message').eq(messageBundle["OrdertDisplay.success"]);
                done();
            });
        }); 
    });

});
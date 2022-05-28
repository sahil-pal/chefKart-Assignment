const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/app');
const messageBundle = require('../src/locales/en');
const {SUCCESS,SERVER_ERROR} = require('../src/utils/config').STATUS_CODES;

// Assertion style
chai.should();
chai.use(chaiHttp);

// Test suite for User APIs
describe('User API',()=>{

    /**
     * Test the POST route : Add User
     */
    describe("POST /user/add",()=>{
        it("It should add a new user", (done) => {
            const userData = {
                userID : 'test2@gmail.com',
                Password : 'test@123',
                address : 'Hno. XX, XYZ street ABC city',
                phoneNumber : '9999999999'
            };
            chai.request(server)
                .post("/user/add")
                .send(userData)
                .end((error,response)=>{
                    response.statusCode.should.equal(SUCCESS);
                    response.body.should.have.property('message').eq(messageBundle["UserInsertion.success"]);
                done();
            });
        });

        it("It should detect a duplicate user", (done) => {
            const userData = {
                userID : 'test2@gmail.com',
                Password : 'test@12345',
                address : 'XYZ street ABC city',
                phoneNumber : '1212121212'
            };
            chai.request(server)
                .post("/user/add")
                .send(userData)
                .end((error,response)=>{
                    response.statusCode.should.equal(SUCCESS);
                    response.body.should.have.property('message').eq(messageBundle["UserInsertionDuplicate.success"]);
                done();
            });
        })
    });


});
# chefKart-Assignment
This repo contains the code that serve as the solution for chefKart assignment

## HOW TO RUN THE PROJECT : 

1. Download the zip 
2. In the project directory run command **' npm init '** to install the dependency packages.
3. Start the XAMPP server 
4. Go to dashboard on browser at localhost:8080
5. Create Database : Either copy paste the commands from **chefKart_db.sql** file or Directly use the import feature
6. If you are a Mac user create a database User with all permissions, for reference : ( https://www.dev2qa.com/how-to-connect-to-mysql-server-after-install-xampp-on-mac-os/ )
7. Do the necessary config of DB in the .env file of the project like host, name, password and port
8. To run the test cases, run command **' npm test '**

## DEPENDENCIES/TECHNOLOGIES USED : 

1. NodeJs - Backend
2. XAMPP server - Mysql Database
3. Mocha chai - testing framework
4. moment - for generating timestamp

## Database & Tables :

DB : chefkart

Tables : 
1. User    - userID, password, address, phoneNumber
2. Product - productID, productName, RAM, storage, color, qtyAvailable
3. Cart    - userID, productID, qtySelected
4. Order   - orderID, userID, productID, qty, deliveryAddress, paymentMode, orderDate
   
## API Endpoints : 

User : 
1. /user/add : To add user 

Cart : 
1. /cart/add     : add product to cart
2. /cart/display : display all cart products for an user
3. /cart/update  : update a product qty in cart
4. /cart/delete  : delete a product from the cart

Order :
1. /order/add     : add products from cart to order list and empty the cart
2. /order/display : show all orders

   

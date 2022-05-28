--
-- Database: `chefkart`
--

DROP DATABASE chefkart;
CREATE DATABASE chefkart;

USE chefkart;

--
-- Table structure for table `Product`
--

CREATE TABLE `Product` (
  `productID` int(10),
  `productName` varchar(50) NOT NULL,
  `RAM` varchar(255) NOT NULL,
  `storage` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `qtyAvailable` int(5) NOT NULL,
   primary key(`ProductID`)
);

--
-- Dumping data for table `Product`
--

INSERT INTO `Product` (`productID`, `productName`, `RAM`, `storage`, `color`, `qtyAvailable`) VALUES
(1, 'Apple Iphone 11', '16 gb','64 gb' , 'White',5),
(2, 'Apple Iphone 12', '8 gb' ,'128 gb', 'Red',10),
(3, 'Apple Iphone 13', '16 gb','512 gb', 'Olive green',3);

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `userID` varchar(25),
  `password` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `phoneNumber` varchar(10) UNIQUE NOT NULL ,
   primary key(`userID`)
);

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`userID`, `password`, `address`, `phoneNumber`) VALUES
('test@gmail.com','test@123','ABC street XYZ city','2222222222');

--
-- Table structure for table `Cart`
--

CREATE TABLE `Cart` (
  `userID` varchar(25) NOT NULL,
  `productID` int(10) NOT NULL,
  `qty` int(5) NOT NULL,
   primary key(`userID`,`productID`),
   foreign key(`productID`) references Product(`productID`)
);

--
-- Table structure for table `Order`
--

CREATE TABLE `Orders` (
  `orderID` varchar(16) NOT NULL,
  `userID` varchar(25) NOT NULL,
  `productID` int(10) NOT NULL,
  `qty` int(5) NOT NULL,
  `deliveryAddress` varchar(50) NOT NULL,
  `paymentMode` varchar(15) NOT NULL,
  `orderDate` varchar(20) NOT NULL,
   foreign key(`productID`) references Product(`productID`)
);


 
 
 
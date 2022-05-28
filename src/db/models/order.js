
var Order = function(userID,orderID,timestamp,cartDetails){
    this.orderID = orderID,
    this.userID = userID,
    this.productID = cartDetails.productID,
    this.qty = cartDetails.qty,
    this.deliveryAddress = cartDetails.address,
    this.paymentMode = 'COD',
    this.orderDate = timestamp
}

module.exports = Order;
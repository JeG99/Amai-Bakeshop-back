const orderModel = require("../models/order")

function order_list(response){
    orderModel.find({}).exec(function(err,res){
        if(err)
            response.send(err)
        else
            response.send({orders: res})
    })
}

function createOrder(userId, productName, productPrice, orderState, response){
    const new_order = new orderModel({user_id: userId, product_name: productName, price: productPrice, state: orderState});
    new_order.save()
    .then((res) => {
        response.send(res);
    })
    .catch((err) => {
        response.send(err);
    });
}

function user_orders(userId, state, response) {
    orderModel.find({user_id: userId, state: state}).exec(function(err,res){
        if(err)
            response.send(err)
        else {
            response.send({orders: res})
        }
    })
}

function close_orders(userId, response) { 
    orderModel.updateMany({user_id: userId, state: 'pending'}, { $set: { state: 'closed' }}).exec(function(err, res){
        if(err)
            response.send(err);
        else {
            response.send({orders: res})
        }
    })
}

function deleteOrder(uid, productName,response){
    orderModel.deleteOne({user_id:uid, product_name:productName, state:'pending'}).exec(function(err,res){
        if(err)
            response.send(err)
        else
            response.send({result: res})
    })
}

module.exports = {
    order_list,
    createOrder,
    user_orders,
    close_orders,
    deleteOrder
}
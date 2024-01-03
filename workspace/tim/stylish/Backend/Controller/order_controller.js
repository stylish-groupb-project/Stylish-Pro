// const orderCheckHandler = require('../Application/Features/Order/Commands/OderCheck/orderCheckHandler');
const orderCheckHandler = require('../Application/Features/Order/Commands/OrderCheck/orderCheckHandler');
const orderManageHandler = require('../Application/Features/Order/Queries/Manage/orderManageHandler');
const manageShipHandler = require('../Application/Features/Order/Commands/ManageShip/manageShipHandler');
module.exports = {
    checkout: async(req,res)=>{
        try {
            const loginUserId = req.decodedToken.id;
            const {prime , order} = req.body;
            const data = {
                prime: prime,
                order: order
            };
            console.log(prime);
            console.log(order);
            const response = await orderCheckHandler.handle(res, loginUserId,data);
            res.status(200).json(response);
        } catch (error) {
            console.log(error)
        }
    },
    manage: async(req,res)=>{
        try {
            console.log(req.decodedToken.id);
            const response = await orderManageHandler.handle(res);
            res.status(200).json(response);
        } catch (error) {
            console.log(error)
        }
    },
    manageShip: async(req,res)=>{
        try {
            const { orderId } = req.params;
            const shippingStatus = req.body.shipping_status;
            const response = await manageShipHandler.handle(res,orderId, shippingStatus);
            res.status(200).json(response);
        } catch (error) {
            console.log(error)
        }
    }

}
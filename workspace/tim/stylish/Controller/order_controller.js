// const orderCheckHandler = require('../Application/Features/Order/Commands/OderCheck/orderCheckHandler');
const orderCheckHandler = require('../Application/Features/Order/Commands/OrderCheck/orderCheckHandler');
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
    }



}
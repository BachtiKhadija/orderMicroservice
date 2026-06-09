const Order =require('../modeles/Order');
const publish = require('../../rabbitmq/publisher');
// Ajouter un ordre
exports.create = async (req, res) => {
     const order = await Order.create(req.body);

        await publish({
        service: "ORDER",
        action: "CREATE_ORDER",
        orderId: order._id,
        productId: order.productId,
        quantity: order.quantity
        });

       res.json(order);
};

// Annuler un ordre
exports.cancel = async (req, res) => {
        const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status: "CANCELLED" },
        { new: true });

        await publish({
        service: "ORDER",
        action: "CANCEL_ORDER",
        orderId: order._id,
        productId: order.productId,
        quantity: order.quantity
        });

        res.json(order);
};
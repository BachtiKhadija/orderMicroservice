const Product = require("../modeles/Product");
const publishMessage = require("../../rabbitmq/publisher");
//ajouter un nouveau produit
exports.createProduct = async (req, res) => {
    const product = await Product.create(req.body);
    await publishMessage({
        service:"PRODUCT",
        action: "CREATE",
        productId: product._id
    });

    res.json(product);
};
//modifier un produit
exports.updateProduct = async (req, res) => {
    const product =
        await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
    await publishMessage({
        service: "PRODUCT",
        action: "UPDATE",
        productId: product._id
    });

    res.json(product);
};
//supprimer un produit
exports.deleteProduct = async (req, res) => {
    const product =
        await Product.findByIdAndDelete(
            req.params.id
        );
    await publishMessage({
        service: "PRODUCT",
        action: "DELETE",
        productId: product._id
    });
    res.json({
        message: "Produit supprimé"
    });
};
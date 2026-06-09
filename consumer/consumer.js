const amqp = require("amqplib");
const mongoose = require("mongoose");
// Connexion MongoDB
mongoose.connect("mongodb://mongo:27017/product_db")
    .then(() => console.log("MongoDB connecté"))
    .catch(err => console.error(err));
//modele produit
const Product = require('../product-service/modeles/Product');

async function startConsumer() {
    try {
        // Connexion RabbitMQ
        const connection = await amqp.connect("amqp://rabbitmq");
        const channel = await connection.createChannel();
        const queue = "events";
        await channel.assertQueue(queue);
        console.log("Consumer démarré...");
        channel.consume(queue, async (msg) => {
            if (!msg) return;

            const event = JSON.parse(
                msg.content.toString()
            );

            console.log("Event reçu :", event);

            switch (event.action) {

                case "REGISTER":
                    console.log(
                        `Nouvel utilisateur inscrit : ${event.userId}`
                    );
                    break;

                case "BAN":
                    console.log(
                        `Utilisateur banni : ${event.userId}`
                    );
                    break;

                case "CREATE_PRODUCT":
                    console.log(
                        `Produit créé : ${event.productId}`
                    );
                    break;

                case "UPDATE_PRODUCT":
                    console.log(
                        `Produit modifié : ${event.productId}`
                    );
                    break;

                case "DELETE_PRODUCT":
                    console.log(
                        `Produit supprimé : ${event.productId}`
                    );
                    break;

                case "CREATE_ORDER":

                    await Product.findByIdAndUpdate(
                        event.productId,
                        {
                            $inc: {
                                stock: -event.quantity
                            }
                        }
                    );

                    console.log(
                        `Stock diminué de ${event.quantity}`
                    );

                    break;

                case "CANCEL_ORDER":

                    await Product.findByIdAndUpdate(
                        event.productId,
                        {
                            $inc: {
                                stock: event.quantity
                            }
                        }
                    );

                    console.log(
                        `Stock restauré de ${event.quantity}`
                    );

                    break;

                default:
                    console.log(
                        "Action non reconnue :",
                        event.action
                    );
            }
            //envoyer un message de retour
            channel.ack(msg);

        });

    } catch (error) {
        console.error(
            "Erreur Consumer :",
            error
        );
    }
}

startConsumer();
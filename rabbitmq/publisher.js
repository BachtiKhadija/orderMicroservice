const amqp=require('amqplib');
async function publishMessage(message){
     const connection= await amqp.connection("amqp://localhost");
    const channel=connection.createChennel();
    const queue="events";
    await channel.assertQueue(queue);
    channel.senToQueue(queue,Buffer.from(JSON.stringify(message)));
    console.log("message bien envoyé !!!");
    setTimeout(function(){connection.close();},1000);

}
module.exports=publishMessage;
const amqp = require('amqplib');
require('dotenv').config();
const {
    RABBITMQ_DEFAULT_USER,
    RABBITMQ_DEFAULT_PASS,
} = process.env;
console.log("rabbitEnv: ",RABBITMQ_DEFAULT_PASS);
const rabbitMQURL = `amqp://${RABBITMQ_DEFAULT_USER}:${RABBITMQ_DEFAULT_PASS}@rabbitmq:5672`; // 修改为您的 RabbitMQ URL

async function connectRabbitMQ() {
    const connection = await amqp.connect(rabbitMQURL);
    const channel = await connection.createChannel();
    await channel.assertQueue('chatQueue');
    return channel;
}

async function sendMessageToQueue(channel, message) {
    await channel.sendToQueue('chatQueue', Buffer.from(message));
}

async function consumeMessageFromQueue(channel) {
    return new Promise((resolve, reject) => {
        channel.consume('chatQueue', (msg) => {
            if (msg) {
                channel.ack(msg);
                resolve(msg.content.toString());
            } else {
                reject(new Error("No message in queue"));
            }
        }, { noAck: false });
    });
}

module.exports = {
    connectRabbitMQ,
    sendMessageToQueue,
    consumeMessageFromQueue,
};

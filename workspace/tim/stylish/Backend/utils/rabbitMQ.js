const amqp = require('amqplib');
require('dotenv').config();
const {
    RABBITMQ_DEFAULT_USER,
    RABBITMQ_DEFAULT_PASSWORD,
} = process.env;
console.log("rabbitEnv: ",RABBITMQ_DEFAULT_PASSWORD);
const rabbitMQURL = `amqp://${RABBITMQ_DEFAULT_USER}:${RABBITMQ_DEFAULT_PASSWORD}@rabbitmq:5672`;

async function connectRabbitMQ(retryCount = 10) {
    try {
        const connection = await amqp.connect(rabbitMQURL);
        const channel = await connection.createChannel();
        await channel.assertQueue('chatQueue');
        console.log("RabbitMQ connected and channel created.");
        return channel;
    } catch (error) {
        console.error("Failed to connect to RabbitMQ:", error);
        if (retryCount > 0) {
            console.log(`Retrying to connect (${retryCount})...`);
            await new Promise(resolve => setTimeout(resolve, 4000)); // 等待5秒后重试
            return connectRabbitMQ(retryCount - 1);
        }
        throw error;
    }
}

async function sendMessageToQueue(channel, message) {
    await channel.sendToQueue('chatQueue', Buffer.from(message));
}

async function consumeMessageFromQueue(channel) {
    console.log("enter consume");
    return new Promise((resolve, reject) => {
        channel.consume('chatQueue', (msg) => {
            if (msg) {
                channel.ack(msg);
                console.log("consuming");
                resolve(msg.content.toString());
            } else {
                console.log("No message in queue");
                resolve(null);
            }
        });
    });
}
async function getMessageFromQueue(channel) {
    return new Promise(async (resolve, reject) => {
        const msg = await channel.get('chatQueue', {});
        if (msg) {
            channel.ack(msg);
            console.log("msg.content.toString()",msg.content.toString());
            resolve(msg.content.toString());
        } else {
            resolve(null); // 队列为空时返回 null
        }
    });
}


module.exports = {
    connectRabbitMQ,
    sendMessageToQueue,
    consumeMessageFromQueue,
    getMessageFromQueue,
};

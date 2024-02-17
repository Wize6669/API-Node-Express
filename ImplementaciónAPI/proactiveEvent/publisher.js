import amqp from "amqplib";

async function sendRabbitMQMessage(queueName, message) {
  try {
    console.log(message.data)
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: false });
    await channel.sendToQueue(queueName, Buffer.from(message));
    console.log(`Message: ${message}`);

    setTimeout(() => {
      connection.close();
    }, 900);

    return "Message sent successfully.";
  } catch (error) {
    throw error;
  }
}

export { sendRabbitMQMessage };

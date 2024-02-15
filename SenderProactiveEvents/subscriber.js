const amqp = require("amqplib/callback_api");
const { sendProactiveEventNotification } = require("./senderProactiveEvent.js");
const skills = require("./skills.json");

amqp.connect(`amqp://localhost`, (err, connection) => {
  if (err) {
    throw err;
  }

  const sendNotification = (message) => {
    const config = {
      notification_service_url:
        "https://api.amazonalexa.com/v1/proactiveEvents/stages/development",
    };
    sendProactiveEventNotification(skills[0], config, message);
  };

  connection.createChannel((err, channel) => {
    if (err) {
      throw err;
    }

    let queueName = "API for Orion";
    channel.assertQueue(queueName, {
      durable: false,
    });
    channel.consume(queueName, (message) => {
      console.log(`Recived: ${message.content.toString()}`);
      sendNotification(message.content.toString());
      channel.ack(message);
    });
  });
});

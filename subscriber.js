import amqp from "amqplib";
import { sendProactiveEventNotification } from "./senderProactiveEvent.js";
import skills from "./skills.json" assert { type: "json" };

amqp.connect(`amqp://localhost`, (err, connection) => {
  console.log("xxxx");
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

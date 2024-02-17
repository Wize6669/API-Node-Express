import amqp from "amqplib";
import { sendProactiveEventNotification } from "./senderProactiveEvent.js";
import skills from "./skills.json" assert { type: "json" };

amqp.connect(`amqp://localhost`, (err, connection) => {
  if (err) {
    throw err;
  }

  const sendNotification = (message, userID) => {
    const config = {
      notification_service_url:
        "https://api.amazonalexa.com/v1/proactiveEvents/stages/development",
    };
    sendProactiveEventNotification(skills[0], config, message, userID).then(r => r).catch(e => console.log(e));
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
      sendNotification("A new emergency order was created" ,message.content.toString());
      channel.ack(message);
    });
  });
});

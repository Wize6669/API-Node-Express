import {sendRabbitMQMessage} from "../proactiveEvent/publisher.js";

export const sendRabbitMQMessageService =  async (queueName, message) => {
  const response = await sendRabbitMQMessage(queueName, message);
  console.log("Service", response);
}
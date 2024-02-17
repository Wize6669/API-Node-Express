import {sendRabbitMQMessageService} from "../services/orders.service.js";
import {getLaboratoryInfoByIDsService} from "../services/dbDynamo.service.js";

export const sendRabbitMQMessage = async (req, res) => {
    try {
        const userIDAux = await getLaboratoryInfoByIDsService(2,2);
        const userID = userIDAux?.data?.userID;
        const response = await sendRabbitMQMessageService("API for Orion", userID);
        res.status(201).send(`Created Order`);
    } catch (e) {
        console.error("Error sending RabbitMQ message:", e);
        res.status(500).send("Internal Server Error");
    }
}
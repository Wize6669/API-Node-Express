import { getStatusEmergencyOrdersService } from "../services/ordersSummary.service.js";

export const getStatusEmergencyOrders = async (req, res) => {
  try {
    const { dateFrom, dateTo, emergency } = req.query;
    const response = await getStatusEmergencyOrdersService(
      dateFrom,
      dateTo,
      1,
      1
    );

    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).send("Error with the server");
  }
};

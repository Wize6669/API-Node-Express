import { signInService } from "../services/login.service.js";
import {getGeneratedPIN} from "./home.controller.js";

export const signIn = async (req, res) => {
  try {
    const { laboratoryID, branchCode, accessCode} = req.body;
    const response = await signInService(laboratoryID, branchCode);
    if (accessCode !== getGeneratedPIN()) return res.status(401).json({ message: "Invalid credentials" });
    if (response !== null) return res.status(200).json(response);

    return res.status(401).json({ message: "Invalid credentials" });
  } catch (e) {
    return res.status(500).send("Error with the server");
  }
};

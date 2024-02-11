import { signInService } from "../services/login.service.js";

export const signIn = async (req, res) => {
  try {
    const { laboratoryID, branchCode } = req.body;
    const response = await signInService(laboratoryID, branchCode);
    if (response !== null) return res.status(200).json(response);

    return res.status(401).json({ message: "Invalid credentials" });
  } catch (e) {
    return res.status(500).send("Error with the server");
  }
};

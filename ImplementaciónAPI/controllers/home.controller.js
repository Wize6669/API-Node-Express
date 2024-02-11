import { generatePINUtil } from "../utils/pin.generate.util.js";

let generatedPIN;

export const generatePIN = (req, res) => {
  generatedPIN = generatePINUtil(10);
  console.log(generatedPIN);
  res
    .status(200)
    .send(`API for Skill Orion <br/> <br/> Access code: ${generatedPIN}`);
};

function getGeneratedPIN() {
  return generatedPIN; // Función para obtener el PIN generado
}

export { getGeneratedPIN };

import fs from "fs";

const readDataE = () => {
  try {
    const data = fs.readFileSync("./db/db-emergency-orders.json");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { readDataE };

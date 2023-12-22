import fs from "fs";

const readData = () => {
  try {
    const data = fs.readFileSync("./db/db-laboratories.json");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { readData };

import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const port = 3000;

const readData = () => {
  try {
    const data = fs.readFileSync("./db.json");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync("./db.json", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

app.get("/", (req, res) => {
  res.send("Welcome to my first API with Node js!");
});

app.get("/api/v2/branchs", (req, res) => {
  const data = readData();
  res.json(data.branchs);
});

app.get("/api/v2/branchs/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  if (id > data.branchs.length || id <= 0) {
    const obj = {
      message: "Error the id is invalid or not exist",
    };
    res.json(obj);
  }
  const branch = data.branchs.find((branch) => branch.id === id);
  res.json(branch);
});

app.post("/api/v2/branchs", (req, res) => {
  const data = readData();
  const body = req.body;
  const newbranch = {
    id: data.branchs.length + 1,
    ...body,
  };
  data.branchs.push(newbranch);
  writeData(data);
  res.json(newbranch);
});

app.put("/api/v2/branchs/:id", (req, res) => {
  const data = readData();
  const body = req.body;
  const id = parseInt(req.params.id);
  if (id >= 1 && id <= data.branchs.length) {
    const branchIndex = data.branchs.findIndex((branch) => branch.id === id);
    data.branchs[branchIndex] = {
      ...data.branchs[branchIndex],
      ...body,
    };
    writeData(data);
    res.json({ message: "Branch updated successfully" });
  }

  const obj = {
    message: "Error the id is invalid or not exist",
  };
  res.json(obj);
});

app.delete("/api/v2/branchs/:id", (req, res) => {
  try {
    const data = readData();
    const id = parseInt(req.params.id);
    if (id >= 1 && id <= data.branchs.length) {
      const branchIndex = data.branchs.findIndex((branch) => branch.id === id);
      data.branchs.splice(branchIndex, 1);
      writeData(data);
      res.json({ message: "Branch deleted successfully" });
    } else {
      const obj = {
        message: "Error the id is invalid or not exist",
      };
      res.json(obj);
    }
  } catch (error) {
    throw new Error("Error deleting a branch " + error);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

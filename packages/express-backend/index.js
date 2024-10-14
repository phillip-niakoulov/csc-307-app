import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

import userServices from "./models/user-services.js";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

  
app.get("/users", async (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

    try {
        const result = await userServices.getUsers(name, job);
        res.send({ users_list: result });
    } catch (error) {
        console.log(error);
        res.status(500).send("An error ocurred in the server.");
    }
    
});

  

const generateId = () => {
    return Math.floor(Math.random() * 100000).toString();
}

app.post("/users", async (req, res) => {
    const user = req.body;
    user["_id"] = generateId();
    const savedUser = await userServices.addUser(user);
    if (savedUser) res.status(201).send(savedUser);
    else res.status(500).end();
});


app.get("/users/:id", async (req, res) => {
    const id = req.params["id"];
    
    const result = await userServices.findUserById(id);
    if (result === undefined || result === null)
        res.status(404).send("Resource not found.");
    else {
        res.send({ users_list: result });
    }
});

app.delete("/users/:id", async (req, res) => {
    const id = req.params["id"];

    try {
        const deletedUser = await userServices.deleteUser(id);
        if (deletedUser) {
            return res.status(204).send()
        } else {
            res.status(404).send("Resource not found.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("An error ocurred in the server.");
    }

});


app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
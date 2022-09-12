require("dotenv").config();
const express = require("express");
const cors = require("cors");

const port = process.env.HOST_PORT;
const app = express();
app.use(express.json());
app.use(cors());

const userRoute = require("./src/routes/user.routes")
app.use(userRoute)

app.listen(port, () => console.log(`Aplicação rodando normalmente na porta: ${port}`));
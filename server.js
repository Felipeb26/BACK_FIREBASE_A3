require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cron = require("./src/utils/timer_delete")

process.setMaxListeners(0)

const port = process.env.HOST_PORT;
const host = process.env.HOST_NAME;

const app = express();
app.use(express.json());
app.use(cors());

const userRoute = require("./src/routes/user.routes")
app.use(userRoute)

app.listen(port,host,() => {
    console.log(`Aplicação rodando normalmente na url:http://${host}:${port}`);
    cron.run();
});
const route = require("express").Router();
const { addUser, getAll, getById, updateUser,deleteUser } = require("../controller/user.control");

route.get("/users", getAll);
route.get("/user/:id", getById);

route.post("/users", addUser);

route.put("/user/:id", updateUser);

route.delete("/user/:id", deleteUser);

module.exports = route;

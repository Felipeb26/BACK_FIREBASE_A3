const route = require("express").Router();
const { addUser, getAll, getById, updateUser,deleteUser , getUserForLogin} = require("../controller/user.control");
const { authUser} = require("../utils/token_jwt");

route.post("/login", getUserForLogin);

route.get("/users",authUser, getAll);

route.get("/user/:id", authUser, getById);

route.post("/users", authUser, addUser);

route.put("/user/:id", authUser, updateUser);

route.delete("/user/:id", authUser, deleteUser);

module.exports = route;
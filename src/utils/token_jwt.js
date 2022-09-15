require("dotenv").config();
const jwt = require("jsonwebtoken");

const secret = process.env.ACESS_TOKEN_SECRET;

const generateToken = (pass) => {
	const acessToken = jwt.sign({ id: pass }, secret, { expiresIn: 60000 });
	return acessToken;
};

const authUser = async (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (token == null) {
		res.status(401).send({ message: "unathorized" });
		return;
	}
	if (authHeader.toLowerCase().indexOf("bearer") == -1) {
		res.status(401).send({ message: "token invalido" });
		return;
	}
	jwt.verify(token, process.env.ACESS_TOKEN_SECRET, (err, user) => {
		if (err) {
			return res.send({ message: "token invalido" });
		}
		req.user = user;
		next();
	});
};

module.exports = {
	generateToken,
	authUser,
};

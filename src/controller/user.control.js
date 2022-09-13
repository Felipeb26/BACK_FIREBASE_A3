const db = require("../config/firebase_admin");
const Usuarios = require("../model/user.model");
const {generateToken} = require("../utils/token_jwt")

const collection = db.collection("usuarios");

const getAll = async (req, res, next) => {
	try {
		const data = await collection.get();
		const userList = [];
		if (data.empty) {
			res.send(400).send({ message: "sem usuarios cadastrados" });
		} else {
			data.forEach((it) => {
				const users = new Usuarios(
					it.id,
					it.data().nome,
					it.data().email,
					it.data().agenda
				);
				userList.push(users);
			});
			res.send(userList);
		}
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};

const getById = async (req, res, next) => {
	try {
		const id = req.params.id;
		const user = await collection.doc(id).get();
		if (!user.exists) {
			res.status(404).send({ message: error.message });
		} else {
			res.send(user.data());
		}
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};

const getUserForLogin = async (req, res, next) => {
	try {
		const userList = [];
		const { nome, email } = req.body;
		await collection
			.where("nome", "==", `${nome}`)
			.get()
			.then((snap) => {
				snap.forEach((doc) => {
					const user = new Usuarios(
						doc.id,
						doc.data().nome,
						doc.data().email,
						doc.data().agenda
					);
					userList.push(user);
				});
			})
			.catch((err) => res.send({ message: err.message }));
		const user = userList[0];

		const mail = new String(user.email);
		const reMail = new String(email);

		if (
			reMail.localeCompare(mail) > 0 ||
			reMail.localeCompare(email) < 0
		) {
			console.log(mail+" "+ reMail)
			console.log(email.localeCompare(user.email));
			res.status(404).send({ message: "usuario não encontrado" });
			return;
		}
		res.send({ token: `Bearer ${generateToken(user.email)}`});
	} catch (error) {
		console.log(error);
		res.status(400).send({ message: error.message });
	}
};

const addUser = async (req, res, next) => {
	try {
		const data = req.body;
		await collection.doc().set(data);
		res.send({ message: "salvo com sucesso" });
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};

const updateUser = async (req, res, next) => {
	try {
		const id = req.params.id;
		const data = req.body;
		await collection.doc(id).update(data);
		const user = await collection.doc(id).get();
		res.send(user.data());
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};

const deleteUser = async (req, res, next) => {
	try {
		const id = req.params.id;
		await collection.doc(id).delete();
		res.send("Usuario deletado com sucesso!!");
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};

module.exports = {
	getAll,
	getById,
	addUser,
	updateUser,
	deleteUser,
	getUserForLogin,
};

var admin = require("firebase-admin");

var serviceAccount = require("./projeto-a3-felipes-firebase-adminsdk-imy6r-9d0f61fabf.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),

});

const db = admin.firestore()
module.exports = db;
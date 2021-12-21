const admin = require("firebase-admin");

const serviceAccount = require("./portfolio-ae0cb-firebase-adminsdk-ewp60-5e099f3875.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin
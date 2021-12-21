
const logger = require("../logger/logger");
const firebase = require("./firebase")
const firestore = firebase.firestore();
//const id1=GEZPX1UYvUX36rTWCc5D
//const id2=pIIihF17UUUZCKAS9E0V
module.exports.getData = async (req,res)=>
{
    logger.debug(`in getdata()`)
    const id1 = req.body.key
    console.log(id1);
    const data = await firestore.collection("User").doc(id1).get()
    console.log(data?.QueryDocumentSnapshot);
    return res.status(200).json(
        {
            status : 200,
            data : [data]
        }
    )
}
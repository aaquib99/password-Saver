require("dotenv").config()
/**/
const express = require("express")
const cors = require("cors")
const bodyParser = require('body-parser');
const app = express()
const config = require("../password_saver/Config/config")
const logger = require("./logger/logger");
const cluster = require("cluster")
let numberOfCpu = require('os').cpus().length
const PORT = config.port
/**/
if(numberOfCpu>6)
{
    numberOfCpu = 6
}
if (cluster.isMaster) {
    // create a worker for each CPU
    for (let i = 0; i < numberOfCpu; i++) {
        cluster.fork();
    }
    cluster.on('online', (worker) => {
        // logger.info(`worker online, worker id: ${worker.id}`);
    });
    //if worker dies, create another one
    cluster.on('exit', (worker, code, signal) => {
        logger.error(`worker died, worker id: ${worker.id} | signal: ${signal} | code: ${code}`);
        cluster.fork();
    });
} 
else
{
    const router = express.Router()
    app.use(router)
    const routerFilePath = require("../password_saver/Router/routes")
    app.use(cors()); // Use cors
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    /**/
    router.use('/',routerFilePath)
    /**/
    app.listen(PORT,()=>{logger.info(`worker started: ${cluster.worker.id} | server listening on port: ${PORT}`);})

} 
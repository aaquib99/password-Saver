 require("dotenv").config()
// /**/

const cors = require("cors")
const bodyParser = require('body-parser');
const config = require("./Config/config")
const logger = require("./logger/logger");
const cluster = require("cluster");
const { json } = require("body-parser");
let numberOfCpu = require('os').cpus().length
const { graphqlHTTP } = require('express-graphql');
const path = require('path');
const fs = require('fs')


//console.log("OUTSIDE ",cluster)
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
    // const graphqlExpress = require("graphql-express")
    const express = require("express")
    const app = express()
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    const router = express.Router();
    const routes = require("./Router/routes")
    // router.use('/graphql',routes)
    const { postgraphile } = require("postgraphile");
    // app.use(
    //     '/graphiql',
        
    //     graphqlHTTP({
    //         schema:'public',

    //         graphiql: true,
    //       })
    // );
    
    // app.get('https://www.onports.herokuapp.com/.well-known/pki-validation/49F65445AB29A1A63792B81AE0B2C1F8.txt',function(req,res){
    //     // console.log(path.join(__dirname,'49F65445AB29A1A63792B81AE0B2C1F8.txt'));
    //     let file = fs.readFileSync(path.join(__dirname,'49F65445AB29A1A63792B81AE0B2C1F8.txt'),{encoding:'utf8',flag:'r'})
        // ,(error,data)=>
        // {
        //     if(error)
        //     {
        //         console.log(error);
        //     }
        //     console.log("File Data : ",data);
        //     return data;
        // });
    //     console.log("File Data 2 : ",file);
    //     res.set({"Content-Disposition":"attachment; filename=\"req.params.name\""});
    //     res.send(file);
    // });
       

    app.use(
        '/root',
        routes
    )
    // app.use('/graphql', graphqlHTTP({
    //     graphiql: true,
    //   }));


    // const user = "postgres";
    // const pass = "Aaquib@78690";
    // const port = "5432";
    // const dbName = "Onports";
    // const host = "localhost";

    // const dbUrl = `postgres://${user}:${pass}@${host}:${port}/${dbName}`; 
    // console.log("Postgres origin URL for connection:", dbUrl);
    
    // app.use(
    //     postgraphile(dbUrl, "public", {
    //       ignoreRBAC: true, // Role Based Access Control (RBAC)
    //       extendedErrors: ["errcode", "detail", "hint"],
    //       graphiql: true
    //     })
    //   );
    //this commented portion is also a way to connect postgres with graphql
    // createPostGraphQLSchema(
    //   "postgres://postgres:Aaquib@78690@localhost:5432/Onports"
    // ).then(()=>{
      
    // }).catch((e)=>{
    //   console.log("Error",e);
    // })
    
    
    // app.use(
    //     postgraphile(
    //       "postgres://axwikafflalctv:e684ff5a36af6df350aeff9bea383a28b0b7d193cf24b567a6cd48c2666ad26e@ec2-54-235-159-30.compute-1.amazonaws.com:5432/d12p7eins0esg8?ssl=true",
    //       "public",
    //       {
    //         watchPg: true,
    //         graphiql: true,
    //         enhanceGraphiql: true,
    //         appendPlugins: [require("./Model/ProjecctModel"),require("./Model/CategoryModel")],
    //         retryOnInitFail :true
    //       }
    //     )
    //   );
    

    
     app.listen(PORT,()=> logger.info(`worker started:: ${cluster.worker.id} | postgraphile API running on http://localhost:5000/graphiql`));
} 
//POSTGRAPHILE
//first we have to add express,postgraphile
//then use app.use with postgraphile as given used above and add DB connectionString ans its schema which is  public
// add  these to get req and give response in JSON form app.use(bodyParser.urlencoded({ extended: true })); app.use(bodyParser.json());
//and give basic routes 
//now create schema in module and require them in app.js appendPlugin in prographile setup .All created API's will be required in array of appendPlugin 
//then we will check on http://localhost:2000/graphiql that the predefined query of our DB  is created or not if yes that means we succesfully  connected our DB with graphql
//then we will check that whose api which we created at model and added them in app.js in appendPlugin are also available there if yes than we are goinf right
//now in controller we will create a api for each API we created in Model in this controller api we will create the QUERY from data which comes from req than than with the help of
//fetch API we will call them on url (http://localhost:5000/graphql) make sure than fetch api path should be /graphql not /graphiql
///graphiql paths help us to check our DB connectiveity and to test our Model api if model API is running fine then we will call it in controllr 

//******************************************************************************************************************************************///
//HASURA
/************/
 
//connect DB to HASURA
//login in hasura->create project from hasura UI->Go on project dashboard->go on data and connect it to heroku (to connect DB ,DB must be deployed on heroku) ->then add connection String of Heroku DB 

/************/
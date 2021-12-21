
const logger = require("../logger/logger")
const { makeExtendSchemaPlugin, gql } = require("graphile-utils");
const dbUtil = require("../Utils/dbUtils")
const uuid = require("../Utils/UniqueID");
const { loggers } = require("winston");

const addProject = makeExtendSchemaPlugin(build => {
  
    return {
      typeDefs: gql`
     
      type result{
          project_id:ID
          data:String
      }
      extend type Mutation{
          addProject(project_name:String!,project_lead:String,client_id:String,started_at:String,ended_at:String,status:String,team_id:String,technologies:[String],discription:String,links:[String],review:String,future_scope:String,expected_delivery_duration:String,actual_delivery_duration:String,category:String,services:[String],financial_id:String,project_images:[String]):result!
          updateAProject(project_id:String!,project_name:String,project_lead:String,client_id:String,started_at:String,ended_at:String,status:String,team_id:String,technologies:[String],discription:String,links:[String],review:String,future_scope:String,expected_delivery_duration:String,actual_delivery_duration:String,category:String,services:[String],financial_id:String,project_images:[String]):result!
      }
      `,
      resolvers: {

       Mutation :{
           addProject:async (root,args,context,info)=>{
               try{
               logger.debug(`in addProject Model`)
                //logger.info(JSON.stringify(args))
               //logger.debug(`in project mddel`)
               let project_id = uuid.generateConflictHandlingId()
               let columns = Object.keys(args)
               columns.push("project_id")
               let value = Object.values(args)
               value.push(project_id)
               let sqlQuery = dbUtil.insertIntoTable("Project",columns)
               try
               {
                   let client = context.pgClient
                   //let result = await dbUtil.sqlExecSingleRow(client,sqlQuery,value)
                   let result = await client.query(sqlQuery,value)
                   //await dbUtil.commit(client)
                   await client.query('COMMIT')
                   console.log(result)
                   console.log(result)
                   //logger.debug
                   return {
                    project_id:project_id,
                    data:JSON.stringify(result)
                   }

               }
               catch(error)
               {
                   logger.error(`In addProject ${error}`)
                   await client.query('ROLLBACK')
                   return error.message

               }
        
               
            }
               catch(error)
               {
                logger.error(` in main Catch ${error.message}`);
                throw new Error(error.message);
               }
           },

           updateAProject:async(root,args,context,info)=>{
               logger.debug(`in UpdateProject Model`)
               let data = args
               let key = "project_id"
               let valueOfProjectId = data.project_id
               delete data[key]
               let value = Object.values(data)
               value.push(valueOfProjectId)
               let column = Object.keys(data)
               let tableName = "Project"
               let sqlQuery = dbUtil.updateTable(tableName,column,key) 
               //logger.info(sqlQuery)
               //logger.info(value)
               //logger.info(column,value)
               try{
                   let client = context.pgClient
                   let result = await client.query(sqlQuery,value)
                   await client.query('COMMIT')
                   logger.info(result)
                   return {
                    project_id:args.project_id,
                    data:JSON.stringify(result)

                   }

                   
            }
            catch(error)
            {
                logger.error(`In UpdateProject ${error}`)
                   await client.query('ROLLBACK')
                   return error.message
            }


           }
       }
      },
    };
  });
  
  module.exports = addProject;
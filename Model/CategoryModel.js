
const logger = require("../logger/logger")
const { makeExtendSchemaPlugin, gql } = require("graphile-utils");
const dbUtil = require("../Utils/dbUtils")
const uuid = require("../Utils/UniqueID")

const addCategory = makeExtendSchemaPlugin(build => {

  return  {
    typeDefs: gql`
    type InsertionDetail{
      RowCount:Int,
      category_id:String
     }
    extend type Mutation {
    addCategory(category_name: String! ):InsertionDetail!
    
    
  }
    `,
    resolvers: {
      Mutation :{
         addCategory :async (root,args,context,info)=>{
          try{

            //logger.debug(args.category_name)
            const name = args.category_name
            //logger.debug(name)
            const id = uuid.generateConflictHandlingId()
            const tableName ="Category"
            let sqlQuery =  dbUtil.insertIntoTable(tableName,["category_name","category_id"])
            //logger.info(sqlQuery)
            let data = [name,id];
            //logger.info(data)
            //slogger.info(`schema`,insertionDetail.RowCount)
            const client = context.pgClient
            //logger.debug(JSON.stringify(client))
            try {
              
                logger.debug(`in try`)
                let result = await client.query(sqlQuery, data)

                let RowCount = JSON.stringify(result.rowCount)
                await client.query('COMMIT')
                return {
                  RowCount:RowCount,
                  category_id:id
                 }
                
            }
            catch (error) {
                logger.error(` in Catch ${error.message}`);
                await client.query('ROLLBACK')
                return error
            }
          }
          catch(error)
          {
            logger.error(` in mainCatch ${error.message}`);
            throw new Error(error.message);
          }
          
        }
      }
    },
  };
});

module.exports = addCategory



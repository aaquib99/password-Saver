const fetch = require("node-fetch")
const logger  = require("../logger/logger")
const url = 'https://ec2-54-235-159-30.compute-1.amazonaws.com:5432/graphql'
const projectData = require("../helper/type")
const { loggers } = require("winston")
const { error } = require("../logger/logger")
const queryUtil = require("../Utils/queryUtils")
module.exports.addProject = async (req,res)=>{
    try
    {
        logger.debug(`in addProject() Project`)
        let data = req.body
        let columns = Object.keys(data)
        let conditions = queryUtil.queryGenerator(columns)
        //logger.info(JSON.stringify(conditions))
        let dataType = conditions.dataType
        let condition = conditions.condition
        //logger.debug(JSON.stringify(vari));
        // logger.info(assignCondition)
        // logger.info(insertionData)
        let graphqlQuery = `
        mutation (${dataType}){
            addProject(${condition}) {
              data
              project_id
            }
          }
          `
          logger.debug(graphqlQuery)
         
              const result = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    query: graphqlQuery,
                    variables: data
                }),
                })
                .then((res) =>res.json()).then((result) => {
            
                    result.data.addProject.data = JSON.parse(result.data.addProject.data)
                    return res.status(200).json({
                    statusCode: 200,
                    status: `successfull`,
                    message: "Work Done",
                    data:result,
                    
                })
            }).catch((error)=>logger.error(error))
       
          }
    catch(error){
        logger.debug(`addProject Controller error : ${error}`)
        return res.status(500).json({
            statusCode: 500,
            status: `error`,
            message: error.message,
            data:[]
        })
    }

}
module.exports.deleteProjectByid = async(req,res)=>{
    try
    {
        let project_id = req.body.project_id
        let graphqlQuery = `mutation ($project_id:String!){
            deleteProjectByProjectId(input: {projectId: $project_id}) {
              deletedProjectId
            }
          }`
          let result = await fetch(url,{
              method:'POST',
              headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body:JSON.stringify({

                query:graphqlQuery,
                variables:{project_id}
            }),
          }).then((res)=>(res.json())).then((data)=>{
            return res.status(200).json({
                statusCode: 200,
                status: `success`,
                message: "succesfull",
                data:data
            })
          }).catch((error)=>{console.log(error)})

    }
    catch(error)
    {
        return res.status(500).json({
            statusCode: 500,
            status: `error`,
            message: error.message,
            data:[]
        })

    }

}
module.exports.updateProject = async (req,res)=>{
    try
    {
        logger.debug(`in addProject() Project`)
        let data = req.body
        //logger.debug(JSON.stringify(data))
        let column  = Object.keys(data)
        //logger.debug(column)
        let conditions = queryUtil.queryGenerator(column)
        //logger.info(JSON.stringify(conditions))
        let dataType = conditions.dataType
        let condition = conditions.condition
        //logger.debug(dataType)
        //logger.info(condition)
    
        let graphqlQuery = `mutation (${dataType}){
            updateAProject(${condition})
            {
              data
              project_id
            }
        }
    `
    logger.info(graphqlQuery)
        

            let result = await fetch(url,{
    
                method:`POST`,  
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body:JSON.stringify({
    
                    query:graphqlQuery,
                    variables:data     
                }),
            }).then((res) =>res.json()).then((result) => {
            
                result.data.updateAProject.data = JSON.parse(result.data.updateAProject.data)
                return res.status(200).json({
                statusCode: 200,
                status: `successfull`,
                message: "Work Done",
                data:result,
                
            })
        }).catch((error)=>logger.error(error))
        
       

    }
    catch(error)
    {
        logger.debug(`updateProjec Controller error : ${error}`)
        return res.status(500).json({
            statusCode: 500,
            status: `error`,
            message: error.message,
            data:[]
        })

    }

    

}

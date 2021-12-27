const fetch = require("node-fetch")
const logger  = require("../logger/logger")
const url = 'https://onports.hasura.app/v1/graphql'
const { loggers } = require("winston")
const uuid = require("../Utils/UniqueID")
const { error } = require("../logger/logger")
const queryUtil = require("../Utils/queryUtils")
const successStatus = "Successfully Done "
const errorStatus  ="Error Found"
module.exports.addProject = async (req,res)=>{
    try
    {
        logger.debug(`in addProject() Project`)
        let data = req.body
        let project_id = uuid.generateConflictHandlingId()
        data.project_id = project_id
        let str = JSON.stringify(data)
        let columns = Object.keys(data)
        let conditions = queryUtil.queryGenerator(data)
        let timeStamp = Date.now()
        let graphqlQuery = `
        mutation {
            insert_Project(objects:{${conditions},created_at:"${timeStamp}"}) { 
              returning {
                actual_delivery_duration
                category
                client_id
                created_at
                discription
                ended_at
                expected_delivery_duration
                financial_id
                future_scope
                links
                project_id
                project_images
                project_lead
                project_name
                review
                services
                started_at
                status
                team_id
                technologies
                updated_at
              }
              affected_rows
            }
          }
          `
          logger.debug(graphqlQuery)
         
              const result = await fetch(url,{
                method: 'POST',
                headers: {
                    'x-hasura-access-key': `33wSNttB156Yz3HvWR8IUScjOUyO3I63JZ3YdREXSQnqOW5ys070mk5uwePWyuaN`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                     query: graphqlQuery
                }),
                })
                .then((res) =>(res.json())).then((result) => {
                    return res.status(200).json({
                    statusCode: 200,
                    status: successStatus,
                    message: "DONE",
                    data:result
                    
                })
            }).catch((error)=>{
                return {
                    statusCode: 400,
                    status: errorStatus,
                    message: error.message,
                    data:[]
                }
       
          })
        }
    catch(error){
        logger.debug(`addProject Controller error : ${error}`)
        return res.status(500).json({
            statusCode: 500,
            status: errorStatus,
            message: error.message,
            data:[]
        })
    }

}
module.exports.deleteProjectById = async(req,res)=>{
    try
    {
        logger.debug(`in deleteProject() Project`)
        let project_id = req.body.project_id
        let graphqlQuery = `mutation {
            delete_Project(where: {project_id: {_eq: "${project_id}"}}) {
              returning {
                updated_at
                technologies
                team_id
                status
                started_at
                services
                review
                project_name
                project_lead
                project_images
                project_id
                links
                future_scope
                financial_id
                expected_delivery_duration
                ended_at
                discription
                created_at
                client_id
                category
                actual_delivery_duration
              }
              affected_rows
            }
          }
          `
          let result = await fetch(url,{
              method:'POST',
              headers:{
                'x-hasura-access-key': `33wSNttB156Yz3HvWR8IUScjOUyO3I63JZ3YdREXSQnqOW5ys070mk5uwePWyuaN`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body:JSON.stringify({

                query:graphqlQuery,
                //variables:{project_id}
            }),
          }).then((res)=>(res.json())).then((data)=>{
            return res.status(200).json({
                statusCode: 200,
                status: successStatus,
                message: "DONE",
                data:data
            })
          }).catch((error)=>{
            return {
                statusCode: 400,
                status: errorStatus,
                message: error.message,
                data:[]
            }
          })

    }
    catch(error)
    {
        return res.status(500).json({
            statusCode: 500,
            status: errorStatus,
            message: error.message,
            data:[]
        })

    }

}
module.exports.updateProject = async (req,res)=>{
    try
    {
        logger.debug(`in updateProject() Project`)
        let data = req.body
        let project_id = req.body.project_id
        let condition = queryUtil.queryGenerator(data)
        let timeStamp = Date.now()
        let graphqlQuery = `mutation {
            update_Project(_set: {${condition}, updated_at: "${timeStamp}"}, where: {project_id: {_eq: "${project_id}"}}) {
              returning {
                actual_delivery_duration
                category
                client_id
                created_at
                discription
                ended_at
                expected_delivery_duration
                financial_id
                future_scope
                links
                project_id
                project_images
                project_lead
                project_name
                review
                services
                status
                started_at
                team_id
                technologies
                updated_at
              }
              affected_rows
            }
          }
          
    `
            let result = await fetch(url,{
    
                method:`POST`,  
                headers: {
                    'x-hasura-access-key': `33wSNttB156Yz3HvWR8IUScjOUyO3I63JZ3YdREXSQnqOW5ys070mk5uwePWyuaN`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body:JSON.stringify({
    
                    query:graphqlQuery,

                }),
            }).then((res) =>res.json()).then((result) => {
            
                return res.status(200).json({
                statusCode: 200,
                status: successStatus,
                message: "Work Done",
                data:result,
                
            })
        }).catch((error)=>{
            return {
                statusCode: 400,
                status: errorStatus,
                message: error.message,
                data:[]
            }
   
        })
    }
    catch(error)
    {
        logger.debug(`updateProject Controller error : ${error}`)
        return res.status(500).json({
            statusCode: 500,
            status: errorStatus,
            message: error.message,
            data:[]
        })

    }
}
module.exports.getAllProject = async (req,res)=>{
    try
    {
        logger.debug(`In function getAllProject() `)
        let limit  = req.body.limit
        let page = req.body.pageNumber
        let offset = (page-1)*limit
        logger.info(limit)
        logger.debug(page)
        graphqlQuery = `{
            Project(limit:${limit} ,offset:${offset} order_by: {project_id: asc}) {
              project_id
              actual_delivery_duration
              category
              client_id
              created_at
              discription
              ended_at
              expected_delivery_duration
              financial_id
              future_scope
              links
              project_images
              project_lead
              project_name
              review
              updated_at
              technologies
              team_id
              status
              started_at
              services
            }
          }
          `
          logger.info(graphqlQuery)
          let result  = await fetch(url,{
            method:`POST`,  
            headers: {
                'x-hasura-access-key': `33wSNttB156Yz3HvWR8IUScjOUyO3I63JZ3YdREXSQnqOW5ys070mk5uwePWyuaN`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({

                    query:graphqlQuery
                }),
          }).then((res)=>res.json()).then((result)=>{
            return res.status(200).json({
                statusCode: 200,
                status: successStatus,
                message: "Work Done",
                data:result,
                
            })
          }).catch((error)=>{
            return {
                statusCode: 400,
                status: errorStatus,
                message: error.message,
                data:[]
            }
          })

    }
    catch(error)
    {
        logger.debug(`getAllProject Controller error : ${error}`)
        return res.status(500).json({
            statusCode: 500,
            status: errorStatus,
            message: error.message,
            data:[]
        })
   
    }
}
module.exports.getSomeDataOfAllProject = async(req,res)=>{
    try
    {
        logger.debug(`In function getSomeDataOfAllProject () `)
        let data = req.body
        //data = JSON.stringify(data)
        let limit  = req.body.limit
        let page = req.body.pageNumber
        logger.info(data)
        let offset = (page-1)*limit
        delete data ['limit']
        delete data ['pageNumber']
        logger.info(data)
        let key = Object.keys(data)
        let output = queryUtil.outputGenerator(key)
        logger.info(limit)
        logger.debug(page)

        graphqlQuery = `{
            Project(limit:${limit} ,offset:${offset} order_by: {project_id: asc}) {
             ${output}
            }
          }
          `
          logger.info(graphqlQuery)
          let result  = await fetch(url,{
            method:`POST`,  
            headers: {
                'x-hasura-access-key': `33wSNttB156Yz3HvWR8IUScjOUyO3I63JZ3YdREXSQnqOW5ys070mk5uwePWyuaN`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({

                    query:graphqlQuery
                }),
          }).then((res)=>res.json()).then((result)=>{
            return res.status(200).json({
                statusCode: 200,
                status: successStatus,
                message: "Work Done",
                data:result,
                
            })
          }).catch((error)=>{
            return {
                statusCode: 400,
                status: errorStatus,
                message: error.message,
                data:[]
            }
          })

    }
    catch(error)
    {
        logger.debug(`getAllProject Controller error : ${error}`)
        return res.status(500).json({
            statusCode: 500,
            status: errorStatus,
            message: error.message,
            data:[]
        })
   
    }
  
}
module.exports.numberOfProject = async(req,res)=>{
    try
    {
        graphqlQuery = `
        query {
            Project_aggregate {
              aggregate {
                count
              }
            }
          }
          `
          logger.info(graphqlQuery)
          let result  = await fetch(url,{
            method:`POST`,  
            headers: {
                'x-hasura-access-key': `33wSNttB156Yz3HvWR8IUScjOUyO3I63JZ3YdREXSQnqOW5ys070mk5uwePWyuaN`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({

                    query:graphqlQuery
                }),
          }).then((res)=>res.json()).then((result)=>{
            return res.status(200).json({
                statusCode: 200,
                status: successStatus,
                message: "Work Done",
                data:result
                
            })
          }).catch((error)=>{
            return {
                statusCode: 400,
                status: errorStatus,
                message: error.message,
                data:[]
            }
          })

    }
    catch(error)
    {
        logger.debug(`getAllProject Controller error : ${error}`)
        return res.status(500).json({
            statusCode: 500,
            status: errorStatus,
            message: error.message,
            data:[]
        })
   
    }
   
}
module.exports.getProjectById = (req,res)=>{
try
{
    let id = req.body.project_id
    let graphqlQuery  = `
    {
        Project(where: {project_id: {_eq: ""}}) {
          actual_delivery_duration
          category
          client_id
          created_at
          discription
          ended_at
          expected_delivery_duration
          financial_id
          future_scope
          links
          project_id
          project_images
          project_lead
          project_name
          review
          services
          started_at
          status
          team_id
          technologies
          updated_at
        }
      }
      
    `
    let result = fetch(url,{
        method:`POST`,
        headers:{
            'x-hasura-access-key': `33wSNttB156Yz3HvWR8IUScjOUyO3I63JZ3YdREXSQnqOW5ys070mk5uwePWyuaN`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body:{
            query:graphqlQuery
        }
    }).then((res)=>res.json()).then((result)=>{
        return res.status(200).json({
            statusCode: 200,
            status: successStatus,
            message: "Work Done",
            data:result
    })
    }).catch((error)=>{
        return {
            statusCode: 400,
            status: errorStatus,
            message: error.message,
            data:[]
        }
    })
}

catch(error)
{
    logger.debug(`getProjectById Controller error : ${error}`)
        return res.status(500).json({
            statusCode: 500,
            status: errorStatus,
            message: error.message,
            data:[]
        }) 
}
}

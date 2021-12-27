const projectData = require("../helper/type")
const logger = require("../logger/logger")
module.exports.queryGenerator = (json)=>{
    
     logger.info(`in queryGenerator`)
     let assignCondition = ""
     let key = Object.keys(json)
     logger.info(key)
     let value = Object.values(json)
     for(let i = 0;i<key.length;i++)
     {
         assignCondition = assignCondition + key[i]+ ':' + '"'+ value[i] +'"' + ','
        }
        
        return assignCondition 
        
        // let insertionData = ""
        // for(let i=0;i<columns.length;i++)
        //         {
                    
        //             let key = columns[i]
        //             assignCondition = assignCondition + " $" + key + " : " + projectData[key] +" , "
        //             insertionData = insertionData + columns[i] + " : " + "$" + columns[i] + " , "
        //         }
        //         logger.info(assignCondition)
        //         logger.info(insertionData)
        //             return {
                        
        //                 dataType :assignCondition,
        //                 condition:insertionData
        //             }
}
module.exports.outputGenerator = (values)=>{
    let output = ""
    logger.debug(values)
    for(let i=0; i<values.length;i++)
    {
        output = output + " " + values[i] 
        
    }
console.log(output)
return output
}
const projectData = require("../helper/type")
const logger = require("../logger/logger")
module.exports.queryGenerator = (columns,data)=>{

    let assignCondition = ""
    let insertionData = ""
    for(let i=0;i<columns.length;i++)
            {
                
                logger.info(columns.length)
                let key = columns[i]
                assignCondition = assignCondition + " $" + key + " : " + projectData[key] +" , "
                insertionData = insertionData + columns[i] + " : " + "$" + columns[i] + " , "
            }
            logger.info(assignCondition)
            logger.info(insertionData)
                return {
                    
                    dataType :assignCondition,
                    condition:insertionData
                }
            
}
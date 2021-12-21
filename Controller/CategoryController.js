//import * as fetch from 'node-fetch';
const fetch = require("node-fetch")
const logger  = require("../logger/logger")
const url = 'http://localhost:5000/graphql'
module.exports.addCategory = async (req,res)=>{
    try
    {
        logger.debug(`In addCategory()`)
        let categoryName =  req.body.category_name
        logger.info(categoryName)
        const result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            query: `mutation addCategory($categoryName:String!,) { addCategory(category_name: $categoryName) { RowCount } }`,
            variables: {
                categoryName
              }
        }),
        })
        .then((res) =>logger.debug(JSON.stringify(res.json())))
        .then((result) => console.log(result));

    }
    catch(error)
    {
        logger.debug(`addCategory Controller error : ${error}`)
        return res.status(500).json({
            statusCode: 500,
            status: `error`,
            message: error.message,
            data:[]
        })
    }
}
const { Pool } = require("pg")
const config = require("../Config/config")
const logger = require("../logger/logger")

const pgconfig = {
    user: "postgres",
    host: "localhost",
    port: 5432,
    database: "Onports",
    password: "Aaquib@78690"
}

const pool = new Pool(pgconfig)
pool.on('error', function (err, client) {
    logger.error(`idle client error, ${err.message} | ${err.stack}`);
});

module.exports.getTransaction = async (context) => {
    logger.debug(`In getTransaction()`)
    const client = await context.pgClient
    try {

        //const client = await context.pgClient
       // await client.query('BEGIN')
        return client
    }
    catch (error) {
        logger.error(`Error in getTrancation`)
        throw new Error(error.message)
    }
}
module.exports.sqlExecSingleRow = async (client, sql, data) => {
    logger.debug(`sqlExecSingleRow() sql: ${sql} | data: ${data}`);
    try {
        let result = await client.query(sql, data);
        logger.debug(`sqlExecSingleRow(): ${result.command} | ${result.rowCount}`);
        return result
    } catch (error) {
        logger.error(`sqlExecSingleRow() error: ${error.message} | sql: ${sql} | data: ${data}`);
        throw new Error(error.message);
    }
}

/*
 * Execute a sql statement with multiple rows of parameter data.
 * @param sql: the query for store data
 * @param data: the data to be stored
 * @return result
 */
module.exports.commit = async (client) => {
    if (client !== 'undefined') {

        logger.debug(`In commit()`)
        try {
            //let client = context.pgClient
            await client.query('COMMIT')
        }
        catch (error) {
            logger.error(`Error in commit()`)
            throw new Error(error.message)
        }
        finally {
            client.release()
        }
    }
    else {
        logger.error(`client in undefined in commit()`)
    }
}
module.exports.rollback = async (client) => {
    logger.debug(`In rollback()`)
    try {
       // let client = context.pgClient
        client.query('ROLLBACK')
    }
    catch (error) {
        logger.error(`Error in rollback()`)
    }
    finally {
        client.release()
    }

}
const insertIntoTable = (tableName, columns) => {
    logger.debug(`In insertionTable`)
    let sqlQuery = `INSERT INTO "${tableName}" (`;

    for (let i = 0; i < columns.length; i++) {
        sqlQuery += columns[i];
        if (i != columns.length - 1) {
            sqlQuery += ", ";
        } else {
            sqlQuery += ") VALUES ( ";
        }
    }
    for (let i = 0; i < columns.length; i++) {
        sqlQuery += "$";
        sqlQuery += `${i + 1}`;
        if (i != columns.length - 1) {
            sqlQuery += ", ";
        } else {
            sqlQuery += ") ";
        }
    }
    return sqlQuery;
}

const updateTable = (tableName, columns, conditionKey) => {
    // var query = ['UPDATE products'];
    // query.push('SET');

    // // Create another array storing each set command
    // // and assigning a number value for parameterized query
    // var set = [];
    // Object.keys(cols).forEach(function (key, i) {
    // set.push(key + ' = ($' + (i + 1) + ')'); 
    // });
    // query.push(set.join(', '));

    // // Add the WHERE statement to look up by id
    // query.push('WHERE pr_id = ' + id );

    // // Return a complete query string
    // return query.join(' ');


    // let sqlQuery = `UPDATE "${tableName}" SET `;
    // logger.info(`In updation ()`)
    let query = [`UPDATE "${tableName}"`];
    query.push('SET');
    let set = [];
    for (let i = 0; i < columns.length; i++) {
        set.push(columns[i] + '=($' + (i + 1) + ')');
        // sqlQuery += columns[i];
        // sqlQuery += "=";
        // sqlQuery += `"${values[i]}"`;
        // if(i!=columns.length-1){
        //     sqlQuery += ", ";
        // } else {
        //     sqlQuery += ` WHERE id=1`;
        // }
    }
    query.push(set.join(', '));
    let columnsCount = 1 + columns.length;
    query.push('WHERE ' + conditionKey + '=' + '$' + columnsCount);
    return query.join(' ');
}

const selectFromTable = (tableName, selectColumns) => {
    let sqlQuery = "SELECT ";
    for (let i = 0; i < selectColumns.length; i++) {
        sqlQuery += selectColumns[i];
        if (i != selectColumns.length - 1) {
            sqlQuery += ", ";
        } else {
            sqlQuery += " FROM ";
            sqlQuery += `"${tableName}" `;
        }
    }
    return sqlQuery;
}

module.exports = {
    insertIntoTable,
    selectFromTable,
    updateTable
};
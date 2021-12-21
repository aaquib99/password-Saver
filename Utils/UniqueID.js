const uuid = require("uuid");
module.exports.generateConflictHandlingId = ()=>
{
	let key= uuid.v4();
	return key;
}
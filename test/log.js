module.exports = function(funcName, error) {
	console.warn("Test failed for : " + funcName);
	console.error(error);
	console.log("......................................................................");
}
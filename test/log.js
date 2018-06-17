exports.error = function(message, error) {
	console.log("");
	console.log('\x1b[31m%s\x1b[0m', '	\u2718 ' + message);
	console.log('	' + error.message);
	console.log("");
};

exports.success = function(message) {
	console.log('\x1b[32m%s\x1b[0m', '	\u2714 ' + message);
};
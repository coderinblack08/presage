const fs = require('fs');

function verifyFile(file) {
	try {
		const stats = fs.statSync(file);
		return stats.isFile();
	} catch {
		return false;
	}
}

module.exports = verifyFile;

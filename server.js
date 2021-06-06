const express = require('express');
const server = express();

server.get('/', (req, res) => {
	res.send('Your bot is alive!');
});

function keepAlive() {
	server.listen(3000, () => {
		console.log('Server is Ready!');
	});
}

module.exports = keepAlive;

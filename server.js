const express = require('express');
const server = express();

server.all('/', (req, res) => {
    res.send('OK');
})

function keepAlive() {
    server.listen(3000, () => {console.log(`Successfully launched server (3000).`)});
}

module.exports = keepAlive;
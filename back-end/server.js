const HTTP = require('http');
const APP = require('./app');

const NORMALIZE_PORT = (val) => {
    const PORT = parseInt(val, 10);

    if (isNaN(PORT)) return val;
    if (PORT >= 0) return PORT;
    return false;
}

const PORT = NORMALIZE_PORT(process.env.PORT || '3000');
APP.set('port', PORT);

const errorHandler = (error) => {
    if (error.syscall !== 'listen') throw error;

    const ADRESS = server.address();
    const BIND = typeof ADRESS === 'string' ? 'pipe ' + ADRESS : 'port: ' + PORT;

    switch (error.code) {
        case 'EACCESS':
            console.log(BIND + ' requires elevated privileges.');
            process.exit(1);
        case 'EADDRINUSE':
            console.log(BIND + ' is already used.');
            process.exit(1);
        default:
            throw error;
    }
};

const SERVER = HTTP.createServer(APP);
SERVER.on('error', errorHandler);
SERVER.on('listening', () => {
    const ADRESS = SERVER.address()
    const BIND = typeof ADRESS === 'string' ? 'pipe ' + ADRESS : 'port: ' + PORT;
    console.log('Listening on ' + BIND)
});

SERVER.listen(PORT);
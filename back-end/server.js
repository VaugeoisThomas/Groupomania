const Http = require('http');
const App = require('./app');

const Normalize_port = (val) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) return val;
    if (port >= 0) return port;
    return false;
}

const port = Normalize_port(process.env.PORT || '3000');
App.set('port', port);

const errorHandler = (error) => {
    if (error.syscall !== 'listen') throw error;

    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;

    switch (error.code) {
        case 'EACCESS':
            console.log(bind + ' requires elevated privileges.');
            process.exit(1);
        case 'EADDRINUSE':
            console.log(bind + ' is already used.');
            process.exit(1);
        default:
            throw error;
    }
};

const Server = Http.createServer(App);
Server.on('error', errorHandler);
Server.on('listening', () => {
    const address = Server.address()
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    console.log('Listening on ' + bind)
});

Server.listen(port);
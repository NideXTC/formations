var http = require('http');
var server = http.createServer(function (request, response) {
  response.writeHead(400, {"Content-Type": "text/plain"});
  response.end("Hello World\n");
});
server.listen(3000);
console.log("Server running at http://127.0.0.1:3000");

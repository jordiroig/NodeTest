var http = require("http");
var url = require("url");

function iniciar(route, handle) {
  function onRequest(request, response) {
    	var postData = "";
	var pathname = url.parse(request.url).pathname;
    	console.log("Petición para " + pathname + " recibida.");
	
	request.setEncoding("utf8");
	request.addListener("data", function(postDataChunk) {
		postData += postDataChunk;
		console.log("Recibidos datos POST '" + postDataChunk  + "'.");
	});
	request.addListener("end", function() {
		route(handle, pathname, response, postData);
	});
  }

  http.createServer(onRequest).listen(8888);
  console.log("Servidor Iniciado.");
}

exports.iniciar = iniciar;

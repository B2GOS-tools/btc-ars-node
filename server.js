var Hapi = require("hapi");
var opts = {
  views: {
    engines: {
      "slm": require("slm")
    },
    basePath: __dirname+"/public",
    compileOptions: {
      basePath: __dirname+"/public"
    }
  }
};
var server = new Hapi.Server(5000,opts);

server.route({
  path: "/",
  method: "GET",
  handler: function(req, res) {
    res.view("index");
  }
});
server.route({
  path: "/{path*}",
  method: "GET",
  handler: {
    directory: {
      path: "./public",
      index: true,
      listing: false
    }
  }
});

server.start(function() {
  console.log("Server running at:",server.info.uri);
});

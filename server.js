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
// heroku dynamically assigns your app a port, so you can't set the port to a fixed number
// ref. https://devcenter.heroku.com/articles/getting-started-with-nodejs-o#write-your-app
var server = new Hapi.Server(process.env.PORT || 5000, opts);

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

var rest = require("restler");

server.route({
  path: "/get/{uri*}",  // ref. http://hapijs.com/api#path-parameters
  method: "GET",
  handler: function(req, res) {
    rest.get(req.params.uri).on("complete",function(data) {
      res(data);
    });
  }
});

server.start(function() {
  console.log("Server running at:",server.info.uri);
});

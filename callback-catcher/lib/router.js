w = console.log;

Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', function() {
	console.log("Render /");
	this.render('hits');
});

function insert(verb, request){
	console.log(verb + " " + request.url);
	Hits.insert({
		"time": new Date(),
		"action": verb,
		"url": request.url,
		"headers": request.headers,
		"body": request.body,
	});
}

function respond(response){	
	response.setHeader('access-control-allow-origin', '*');
	response.statusCode = 200;
	response.end();
}

if (Meteor.isServer) {

	Router.route('/hits/(.*)', {
			where: "server"
		})
		.get(function() {
			insert("get", this.request);
			respond(this.response);
		})
		.post(function() {
			insert("post", this.request);
			respond(this.response);
		})
		.put(function() {
			insert("put", this.request);
			respond(this.response);
		})
		.delete(function() {
			insert("del", this.request);
			respond(this.response);
		});
}
// The template named 'layout' is the root template for the client
Router.configure({
  layoutTemplate: 'layout'
});

// Render the hits template for ./
Router.route('/', function() {
	this.render('hits');
});

// Store a record of the request in the Hits collection and print to console
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

// Respond with CORS * and status 200 OK
function respond(response){	
	response.setHeader('access-control-allow-origin', '*');
	response.statusCode = 200;
	response.end();
}

if (Meteor.isServer) {
	// Respond to any route past /hits/ by storing in Hits collection and returning 200 OK
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
			insert("delete", this.request);
			respond(this.response);
		});
}
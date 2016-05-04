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
	//Route to get stored hits by id 
	//Respond with the stored hit if found. Othewise respond with 404 not found
	Router.route('/gethit/:_id', {
			where: "server"
		})
		.get(function() {
			var id = this.params._id;

			var hit = Hits.findOne({
				"_id": id
			});

			this.response.setHeader('access-control-allow-origin', '*');

			if (hit) {
				this.response.statusCode = 200;
				this.response.end(JSON.stringify(hit));
			} else {
				this.response.statusCode = 404;
				this.response.end(JSON.stringify({
					status: "404",
					message: "Hit not found."
				}));
			}
		});

	Router.route('/search/:_query', {where: 'server'})
		.get(function(){

			// Expected query: cartid=42

			this.response.setHeader('access-control-allow-origin', '*');
			// Assume server error
			this.response.statusCode = 500;
			
			try
			{
				// Check for an '=' separator or error
				var query = this.params._query.toString();
				var separator = query.indexOf('=');

				if(!separator || separator == -1){
					this.response.end(JSON.stringify({
						status: "500",
						message: "Invalid query or missing separator", 
						query: query,
						separator: separator
					}));
					return;
				}

				var params = query.split('=');
				
				// Check for exactly 2 parameters (key, value) or error
				if(params.length !== 2){
					this.response.end(JSON.stringify({
						status: "500",
						message: "Invalid query or params", 
						query: query,
						params: params
					}));
					return;
				}

				// Run the query against the DB for result or error
				var q = {};
				// http://stackoverflow.com/questions/17039018/how-to-use-a-variable-as-a-field-name-in-mongodb-native-findone
				q[params[0]] = params[1];
				var hit = Hits.findOne(q);

				if(!hit){
					this.response.statusCode = 404;

					this.response.end(JSON.stringify({
						status: "404",
						message: "Unable to locate hit", 
						query: query,
						key: params[0],
						value: params[1]
					}));
					return;
				}

				// Return the result
				this.response.statusCode = 200;
				this.response.end(JSON.stringify(hit));
				return;
			}
			catch(err){
				this.response.statusCode = 500;

				this.response.end(JSON.stringify({
					status: "500",
					message: "Internal server error",
					error: err, 
					query: query
				}));
				return;
			}
		});

}
w = console.log;


Router.route('/', function() {
	console.log("Render /");
	this.render('Home');
});

if (Meteor.isServer) {

	Router.route('/hits/(.*)', {
			where: "server"
		})
		.get(function() {
			w("get");

			Hits.insert({
				"action": 'GET',
				"url": this.request.url,
				"headers": this.request.headers,
				"body": this.request.body,
			});

			this.response.setHeader('access-control-allow-origin', '*');
			this.response.statusCode = 200;
			this.response.end();
		})
		.post(function() {
			w("post");


			Hits.insert({
				"action": 'POST',
				"url": this.request.url,
				"headers": this.request.headers,
				"body": this.request.body,
			});
			this.response.setHeader('access-control-allow-origin', '*');
			this.response.statusCode = 200;
			this.response.end();
			// If a POST request is made, create the user's profile.
		})
		.put(function() {
			w("put");

			Hits.insert({
				"action": 'PUT',
				"url": this.request.url,
				"headers": this.request.headers,
				"body": this.request.body,
			});
			this.response.setHeader('access-control-allow-origin', '*');
			this.response.statusCode = 200;
			this.response.end();
			// If a PUT request is made, either update the user's profile or
			// create it if it doesn't already exist.
		})
		.delete(function() {
			w("del");

			Hits.insert({
				"action": 'DELETE',
				"url": this.request.url,
				"headers": this.request.headers,
				"body": this.request.body,
			});
			this.response.setHeader('access-control-allow-origin', '*');
			this.response.statusCode = 200;
			this.response.end();
			// If a DELETE request is made, delete the user's profile.
		});
}
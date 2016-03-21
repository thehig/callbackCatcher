Router.route('/', function(){
	console.log("Render /");
	this.render('Home');
});

Router.route('/(.*)', {
  action: function(request) {

	if(!request) Router.go('/');

  	var url = request.url;
  	console.log("Redirecting " + url + " to /");
    Router.go('/');
  }
});
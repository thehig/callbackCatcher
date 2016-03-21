Template.hits.helpers({
	hits: function(){
		return  Hits.find({}, {sort: {time: -1}});
	}
});

Template.entry.helpers({
	// this: Single HTTP Entry from DB
	// 	action, headers, body, url
	headers: function(){ return JSON.stringify(this.headers);},
	body: function(){ return JSON.stringify(this.body);},
	action: function(){ return JSON.stringify(this.action.toUpperCase());},
});
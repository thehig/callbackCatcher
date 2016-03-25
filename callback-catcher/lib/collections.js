Hits = new Mongo.Collection('hits');

// Allow anyone to remove items from collection
// https://www.discovermeteor.com/blog/allow-deny-a-security-primer/
Hits.allow({
	remove: function(){
		return true;
	}
});

// Pubilsh (server) and subscribe (clients) hits collection
if(Meteor.isServer){
	Meteor.publish('hits', function(){
		return Hits.find();
	});
}

if(Meteor.isClient){
	Meteor.subscribe('hits');
}
Template.hits.helpers({
	hits: function() {
		return Hits.find({}, {
			sort: {
				time: -1
			},
			limit: 10
		});
	}
});

Template.entry.helpers({
	// this: Single HTTP Entry from DB
	// 	action, headers, body, url
	headers: function() {
		return this.headers;
	},
	body: function() {
		// return JSON.stringify(this.body);
		return this.body;
	},
	action: function() {
		return JSON.stringify(this.action.toUpperCase());
	},
	time: function() {
		return moment(this.time).fromNow();
	},
	entryClass: function() {
		return "verb-" + this.action;
	}
});


Template.entry.onRendered(function() {
	//console.log(this);
	// console.log(JSON.stringify(this.data));
	var btnName = ".btn-copy-body-" + this.data._id;
	// console.log(btnName);
	var clipboard = new Clipboard(btnName);
	clipboard.on('success', function(e) {
		console.info('Action:', e.action);
		// console.info('Text:', e.text);
		// console.info('Trigger:', e.trigger);

		e.clearSelection();
	});

	clipboard.on('error', function(e) {
		console.error('Action:', e.action);
		console.error('Trigger:', e.trigger);
	});
});
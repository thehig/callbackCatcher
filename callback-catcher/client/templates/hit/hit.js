Template.hits.helpers({
	hits: function() {
		return Hits.find({
			action: {
				$in: Session.get("visibilityFilter")
			}
		}, {
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
		switch (this.action.toLowerCase()) {
			case "get":
				return "panel-primary";
				break;
			case "put":
				return "panel-info";
				break;
			case "post":
				return "panel-warning";
				break;
			case "delete":
				return "panel-danger";
				break;
			default:
				return "";
				break;
		}
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


Template.filterhits.events({
	"click input": function(e, tpl) {
		// console.log("input clicked");
		// console.log(e);
		// console.log(e.currentTarget);
		trackCheckboxes(tpl);
	}
});

Template.filterhits.onRendered(function() {
	// console.log("this:");
	// console.log(this.findAll());
	trackCheckboxes(this);
})

function trackCheckboxes(tpl) {
	var checkboxes = tpl.findAll("input[type=checkbox]:checked");
	var actionsToDisolay = [];
	var array = _.map(checkboxes, function(item) {
		return item.name;
	});
	console.log("Array:"+array);
	Session.set('visibilityFilter', array);

}
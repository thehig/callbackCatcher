// Hits Template
// =======================

Template.hits.helpers({
	// Returns the last 10 items from the dataset, sorted with newest first
	// 	Filters using the visibilityFilter and searchingQuery session variables
	hits: function() {
		return Hits.find({
			action: {
				$in: Session.get("visibilityFilter") || ["get","post","put","delete"]
			},
		    url: { $regex: Session.get("searchingQuery") || ''} 
	
		}, {
			sort: {
				time: -1
			},
			limit: 10
		});
	}
});

// Entry Template
// =======================

// Sanatize this (HTTP entry) for the template
Template.entry.helpers({
	// this: a single HTTP Entry from Hits collection
	// 	{ action, headers, body, url }

	headers: function() {
		return this.headers;
	},
	body: function() {
		return this.body;
	},
	// The HTTP Verb in uppercase
	action: function() {
		return JSON.stringify(this.action.toUpperCase());
	},
	// Nice time elapsed (eg a few seconds ago)
	time: function() {
		return moment(this.time).fromNow();
	},
	// Convert the HTTP verb into a bootstrap color-tag
	entryClass: function() {
		switch (this.action.toLowerCase()) {
			case "get":
				return "panel-success";
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

// Set up Copy to Clipboard. Print success and error messages to console
Template.entry.onRendered(function() {
	var btnName = ".btn-copy-body-" + this.data._id;
	var clipboard = new Clipboard(btnName);

	clipboard.on('success', function(e) {
		console.info('Clipboard Success Action:', e.action);
		e.clearSelection();
	});

	clipboard.on('error', function(e) {
		console.error('Clipboard Error Action:', e.action);
		console.error('Clipboard Error Trigger:', e.trigger);
	});
});

// FilterHits Template
// =======================

// Set visbilityFilter session variable to the array of names of the checked checkboxes
function trackCheckboxes(tpl) {
	var checkboxes = tpl.findAll("input[type=checkbox]:checked");
	Session.set('visibilityFilter', _.map(checkboxes, function(item) {
		return item.name;
	}));
}

Template.filterhits.events({
	"click input": function(e, tpl) {
		trackCheckboxes(tpl);
	}
});

Template.filterhits.onRendered(function() {
	trackCheckboxes(this);
});

// Searching Template
// =======================

// Wipe the searchingQuery session variable when the template renders
Template.searching.onRendered(function() {
	Session.set('searchingQuery', "");
});

// Set the searchingQuery session variable when text is entered to .searchinput
Template.searching.events({
	'keyup .searchinput': function(e, tpl) {
		Session.set('searchingQuery', e.target.value);
	}
});
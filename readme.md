# Callback Catcher

Need to examine a server-side callback but don't want to set up a server? Send your callback to './hits/identifier' and view the JSON object at /.

### How do I use it?

* You can navigate to '/' and '/hits/*'. These are controlled by the router
* Navigating to '/' will list the last 10 callbacks with the most recent first
* Clicking on the checkboxes will filter the list by HTTP verb
* Typing in the search box will regex against the dataset of URIs

###### Pages & Templates
* Layout.html - Creates top level bootstrap container, jumbotron and yields to the router for templates
* Hit.html - Lists dataset entries using bootstrap accordian and 'entry' template. Items are color coded based on HTTP verb. Displayes filters using the 'filterhits' template and the search field using the 'searching' template

##### Notes:

* DELETE doesn't seem to work yet
* Search URLs are regexes, and can be complex
* Colors of the panels should mirror Postman 
  (GET - Green, PUT - Blue, POST - Orange, DELETE - Red)

twitter-feed-reader
===================

Jquery plugin to read a twitter feed (cached or non-callback) and display on page.

---

Usage:
===
$('#TwitterWidget').TwitterFeed({
	userName: 'AccountName',
	feedLocation: 'PathTo.json'
});
  
---

Defaults:
===
* __feedLocation__ : "user_timeline.json" _//Path to json file_
* __limit__ : 5 _//Max number of items to display_
* __userName__ : "twitter" _//Name of twitter account_
* __classPrefix__ : "tfr" _//Class to add to elements for namespacing_
* __feedError__ : "There was an error reading the Twitter Feed" _//Error message when no AJAX fails_
* __userHeader__ : true _//Display header with user name and description_
* __userImage__ : true _//Display the user thumbnail image in header (required userHeader)_
* __userFooter__ : true _//Display the user footer_
* __twitterLink__ : true _//Display Twitter link and icon_
* __footerText__ : "Join the conversation" _//Text to display in footer (links to profile, requires userFooter)_
* __linksInNewWindow__ : true _//Open Links in new window (target="_blank")_

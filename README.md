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
* __feedLocation__ : "user_timeline.json" //Path to json file
* __limit__ : 5 //Max number of items to display
* __userName__ : "twitter" //Name of twitter account
* __classPrefix__ : "tfr" //Class to add to elements for namespacing
* __feedError__ : "There was an error reading the Twitter Feed" //Error message when no AJAX fails
* __userHeader__ : true //Display header with user name and description
* __userImage__ : true //Display the user thumbnail image in header (required userHeader)
* __userFooter__ : true //Display the user footer
* __twitterLink__ : true //Display Twitter link and icon
* __footerText__ : "Join the conversation" //Text to display in footer (links to profile, requires userFooter)
* __linksInNewWindow__ : true //Open Links in new window (target="_blank")

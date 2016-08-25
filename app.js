// The Simple Feed Viewer application JavaScript should live here.
//


//gets the info for the current feed, inserts it in a content block, and adds it to the feed
function addContent() {
    var feedList = document.getElementById("feedlist");
    feedList.innerHTML = '';

    for (i = 0; i < loadNum; i++) { 
        var currentFeedItem = currentFeed.mesg[i];
        var currentTitle = currentFeedItem.description;
        var currentDomain = currentFeedItem.domain;
        var currentUrl = currentFeedItem.url;

        var feedItemBlock = '<a class="item-link" href="'+currentUrl+'" target="_blank"><h3 class="item-title">'+currentTitle+'</h3><p class="item-url">Source: '+currentDomain+'</p></a>';
        
        var item = document.createElement('li');
        item.innerHTML = feedItemBlock;
        feedList.appendChild(item);

        
    }
}

//is called by the JSONP parser
function useData(data) {
    currentFeed = (data);
    loadNum = 5
    addContent();
}

//grabs the right json for the current feed
function getData() {

    var filter = this.getAttribute("data-filter");
    console.log(filter);
    var script = document.createElement("script");
    script.src = 'http://data.digg.com/api/v1/feed/trending/tweets?callback=useData';
    document.getElementsByTagName('head')[0].appendChild(script);
}


//listens for click on manu items
var classname = document.getElementsByClassName("feedtitle");

for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', getData, false);
}




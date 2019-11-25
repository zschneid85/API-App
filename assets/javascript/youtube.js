
//YouTube API parameters

var apiKey = "AIzaSyAXSpudOD9ysHkdsFfGmIyd9AYh1tDsGNs";
var part = "snippet";
var t = "jsonc"
var q = "";
var maxResults = 6;
var type = "video";
var queryYTURL = "";


	//Grabbing the values from the inputs and setting them to the global variables
	$("#submit2").on("click", function(event){

      event.preventDefault();

      //show divs to display product info and videos
      $(".prodInfo").show();
      $(".prodVideos").show();

      //grab the label from the option selection drop down list
      //and use to search youtube and display specific product details
      q = $("#specId option:selected").text();
      
      queryYTURL = "https://www.googleapis.com/youtube/v3/search?part=" + part + "&key=" + apiKey + "&maxResults=" + maxResults + 
      "&type=" + type + "&q=" + q + " review unboxing&t=" + t;
          
      runYTQuery(queryYTURL); //queryURL built, call function to make AJAX call
    });
    

// This runYTQuery function expects 1 parameter: the final URL to download data from)
function runYTQuery(queryYTURL) {

// The AJAX function uses the queryYTURL and GETS the JSON data associated with it.
// The data then gets stored in the variable called: "YTData"

    $.ajax({
      url: queryYTURL,
      method: "GET"
    }).done(function(YTData) {

      $(".wells").empty(); //clear div before appending videos

        //loop to set video id from 4 objects returned from API, dump to div
        for (i = 0; i < maxResults; i++){

          var iframeString = "<iframe id=ytvid" + i + " width=50% height=\"345\" src=\"https://www.youtube.com/embed/"
          + YTData.items[i].id.videoId + "\"><iframe>";  //build iframe element

        $(".wells").append(iframeString);  //add iframe elemen to div

        clearInputs();  //clear input fields after results are displayed
   
    }


  })

  
}

$("#clearBtn").on("click", function(event){

  event.preventDefault();
  clearAll();

});

function clearInputs()
{
  $("#productName").val("");  //clears input box
  $("#catId").val("default"); //clears option box to default value
  $('#specId')  //clears 2nd option box with API data
    .find('option')
    .remove()
    .end();
  $(".apiDatalist").hide();
}
function clearAll() //clears inputs and divs
{
  $("#productName").val("");  //clears input box
  $("#catId").val("default"); //clears option box to default value
  $('#specId')  //clears 2nd option box with API data
    .find('option')
    .remove()
    .end();
  $(".wells").empty(); 
  $("#product-info").empty();
  $("#product-pic").empty();
  $(".apiDatalist").hide();
  $(".prodInfo").hide();
  $(".prodVideos").hide()
}

$(document).ready(function() {
  //hide divs not being used initially on page load
  $(".apiDatalist").hide();
  $(".prodInfo").hide();
  $(".prodVideos").hide();
})
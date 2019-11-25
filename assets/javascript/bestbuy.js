//Best Buy API parameters, hard coded  product name and category for testing
var BBapiKey = "lHzfxhG8ouWxpRucN0nkcCCa";
var queryBBURL = "";
var catagoryId = "";
var specificId = "";

	//Grabbing the values from the inputs and setting them to the global variables
	$("#submit").on("click", function(event){

    event.preventDefault();

    q = $("#productName").val().trim(); //set search value

    //check is search term was submitted
    if (q === "")
    {
        // Get the modal
        var modal = document.getElementById('myModal');

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
        fadeDuration: 100;
        modal.style.display = "block";


        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
        modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
    } 
    else  //search term exists, proceed with API call
    {
		
      q = q.split(" ").join("&search="); //remove inner whitepaces, add URL requirements

     
      catagoryId = $("#catId").val();

      queryBBURL = "https://api.bestbuy.com/v1/products((search=" + q + ")&(categoryPath.id=" + catagoryId + "))?apiKey=" +
      BBapiKey + "&sort=name.dsc&show=all&pageSize=50&format=json";

      // $("#product-info").empty();  //clear div before appending product details
      // $("#product-pic").empty();

      runBBQuery(queryBBURL);  //make AJAX call
    }
});


// This runBBQuery function expects 1 parameter: the final URL to download data from)
function runBBQuery(queryBBURL) {

  // The AJAX function uses the queryBBURL and GETS the JSON data associated with it.
  // The data then gets stored in the variable called: "BBData"
 
  $.ajax({
    url: queryBBURL,
    method: "GET"
  }).done(function(BBData) {

  console.log(BBData);

  if (BBData.total > 0)
  {
    //populate new option list with values returned from API call
    $.each(BBData.products, function( index, name ){
      $('#specId').append($('<option>', { 
        value: index,
        text : BBData.products[index].name
      }));
    });

    //show div with new drop down list
    $(".apiDatalist").show();
  
    $("#submit2").on("click", function(event){
      
      event.preventDefault();

      specificId = $("#specId").val(); //get index from new option list
      

      $("#product-info").empty();  //clear divs before appending product details
      $("#product-pic").empty(); 

      //output product details to UI (if they are available)
      if (BBData.products[specificId].name != null && BBData.products[specificId].name != "undefined")
        $("#product-info").append('<p> <b>Name:</b> ' + BBData.products[specificId].name + '</p>');

      if (BBData.products[specificId].description != null && BBData.products[specificId].description != "undefined") 
        $("#product-info").append('<p> <b>Description:</b> ' + BBData.products[specificId].description + '</p>');

      if (BBData.products[specificId].shortDescription != null && BBData.products[specificId].shortDescription != "undefined") 
        $("#product-info").append('<p> <b>Short Description:</b> ' + BBData.products[specificId].shortDescription + '</p>');

      if (BBData.products[specificId].manufacturer != null && BBData.products[specificId].manufacturer != "undefined") 
        $("#product-info").append('<p> <b>Manufacturer:</b> ' + BBData.products[specificId].manufacturer + '</p>');

      if (BBData.products[specificId].modelNumber != null && BBData.products[specificId].modelNumber != "undefined") 
        $("#product-info").append('<p> <b>Model Number:</b> ' + BBData.products[specificId].modelNumber + '</p>');

      if (BBData.products[specificId].regularPrice != null && BBData.products[specificId].regularPrice != "undefined") 
        $("#product-info").append('<p> <b>Regular Price:</b> $' + BBData.products[specificId].regularPrice + '</p>');

      if (BBData.products[specificId].salePrice != null && BBData.products[specificId].salePrice != "undefined") 
        $("#product-info").append('<p> <b>Sale Price:</b> $' + BBData.products[specificId].salePrice + '</p>');

      if (BBData.products[specificId].customerReviewAverage != null && BBData.products[specificId].customerReviewAverage != "undefined") 
        $("#product-info").append('<p> <b>Customer Review Average (0-5 stars):</b> ' + BBData.products[specificId].customerReviewAverage  + '</p>');

      if (BBData.products[specificId].upc != null && BBData.products[specificId].upc != "undefined") 
        $("#product-info").append('<p> <b>UPC:</b> ' + BBData.products[specificId].upc + '</p>');
      
      if (BBData.products[specificId].url != null && BBData.products[specificId].url != "undefined") 
        $("#product-info").append('<p> <b>URL:</b> <a href="' + BBData.products[specificId].url + '" target="_blank">Product Link</a></p>');

      if (BBData.products[specificId].image != null && BBData.products[specificId].image != "undefined") 
        $("#product-pic").append('<img id="ppic" src=' + BBData.products[specificId].image + '>');
    
    });
  }
  else
  {
    {
      // Get the modal
      var modal = document.getElementById('noResultsModal');

      // Get the <span> element that closes the modal
      var span = document.getElementsByClassName("close")[0];

      modal.style.display = "block";

      // When the user clicks on <span> (x), close the modal
      span.onclick = function() {
      modal.style.display = "none";
      }

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
      if (event.target != modal) {
        modal.style.display = "none";
      }
    }
  } 
  clearAll(); //clears inputs and divs
  }
   
})




}
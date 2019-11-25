


$(document).ready(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAhqwNxYb9cXVL7ZI9Z9-PSXyWMKkscZms",
    authDomain: "project-1-apis.firebaseapp.com",
    databaseURL: "https://project-1-apis.firebaseio.com",
    projectId: "project-1-apis",
    storageBucket: "project-1-apis.appspot.com",
    messagingSenderId: "174037713136"
  };
  firebase.initializeApp(config);

  
      //Set db instance
      var productDatabase = firebase.database();
  
  
  
      //Grabbing the values from the inputs and setting them to the global variables
      $("#submit2").on("click", function(event){
  
          event.preventDefault();
  
        var productName = q = $("#specId option:selected").text();
   
  
          //create productdata object
          var productData = { 
              item: productName,
              dateAdded: firebase.database.ServerValue.TIMESTAMP
          };
        
              productDatabase.ref().push(productData);
  
      });
  
          //The firebase call to go through the data when a child is added to our data
          productDatabase.ref().on("child_added", function(childsnapshot){
  
              //Grabs key from childsnapshot and sets it to variable
              var key = childsnapshot.key;
  
              //Store everything in variables from the "child" data
              var childproductname = childsnapshot.val().item;
  
              var childdateAdded = childsnapshot.val().dateAdded;
  
              //Uploading the results to the HTML page
              $("#producttable > tbody").prepend("<tr><td>" + childproductname + "</td><td>");
              
          });
  
  });
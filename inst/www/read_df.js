//init this script when the page has loaded
$(document).ready(function(){
  
  function uploadcsv(filename){
	 alert("inside uploadcsv....");
    //disable the button during upload
    $("#submitbutton").attr("disabled", "disabled");        

    //perform the request
    var req = ocpu.rpc("read_csv", {
      filename : filename
	}, function(output){
	$("#output").text(output);
    //}, function(session){
      //on success call printsummary()
      printsummary(session);
    });
    
    //if R returns an error, alert the error message
    req.fail(function(){
      alert("Server error: " + req.responseText);
    });
    
    //after request complete, re-enable the button 
    req.always(function(){
      $("#submitbutton").removeAttr("disabled")
    });        
  }    
  
  
  function printsummary(mydata){
	  alert("inside printsummary....");
    //perform the request
    var req = ocpu.call("printsummary", {
      df_full : mydata
    }, function(session){
      session.getConsole(function(output){
        $("#output code").text(output);
      });
    }).fail(function(){
      alert("Server error: " + req.responseText);
    });        
  }
  
  $("#submitbutton").on("click", function(){
    
	alert("inside script....");
    //arguments
    //read the value for 'filename'
	var filename = $("#uploadFile").val();
    
    if(!filename){
      alert("No file selected.");
      return;
    }
    
    uploadcsv(filename);        
  });
});

$(function() {
    apicall();
});

function apicall(){
  $('#button').click(function(){
    $.get("https://api.foursquare.com/v2/venues/40a55d80f964a52020f31ee3",
      function(data){$(".result").html(data);});
  });
}
  

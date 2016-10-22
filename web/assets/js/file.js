$(function() {
    apicall();
});

function apicall(){
  $('#button').click(function(){
    var id = $().data();
    var secret = $().data();
    $.get("https://api.foursquare.com/v2/venues/40a55d80f964a52020f31ee3", {client_id: id, client_secret: secret},
      function(data){$(".result").html(data);});
  });
}
  

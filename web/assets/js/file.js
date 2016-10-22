$(function() {
    apicall();
});

function apicall(){
  $('#button').click(function(){
    $.get("https://api.foursquare.com/v2/venues/40a55d80f964a52020f31ee3", {client_id: getenv('FOURSQUARE_CLIENT_ID'), client_secret: getenv('FOURSQUARE_SECRET')},
      function(data){$(".result").html(data);});
  });
}
  

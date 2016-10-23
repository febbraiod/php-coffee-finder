$(function() {
    apicall();
});

function apicall(){
  $('#button').click(function(){
    // var id = $().data();
    // var secret = $().data();
    $.get("https://api.foursquare.com/v2/venues/40a55d80f964a52020f31ee3", 
      {client_id: "MUUGJ2ZLK23TYMNXL1LAYRKP0LC4AX2JG0ZWCQTDJVLFS1VK", 
      client_secret: "EMKL5KL2TIQJLK1GTSZFYXOXPD0CVZSSK4CILB3WZ1QYCPZO"},
      function(data){$(".result").html(data);});
  });
}
  

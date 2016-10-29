$(function() {
    apicall();
    image_carousel();
});

function apicall(){
  $('#button').click(function(){
    var city = $('#get_city').val();
    var params = {
      client_id: "MUUGJ2ZLK23TYMNXL1LAYRKP0LC4AX2JG0ZWCQTDJVLFS1VK", 
      client_secret: "EMKL5KL2TIQJLK1GTSZFYXOXPD0CVZSSK4CILB3WZ1QYCPZO",
      v: '20161016',
      near: city,
      radius: 5000,
      query: 'coffee',
      limit: 5,
      intent: 'browse'
    };

    $.get("https://api.foursquare.com/v2/venues/search", params,
      function(data){
        var venues = data.response.venues;
        $('.coffee_city').text(city);
        for(var i = 1; i<= 5 ; i++){
          var venue = venues[i-1];
          $('#venuename' + i).text(venue.name);
          var addyForGoogle = venue.location.formattedAddress[0].replace(/ *\([^)]*\) */g, "").trim();
          $('#venue' + i).html(venue.location.formattedAddress[0] + '<br>' + venue.location.formattedAddress[1]);
          $('#venue' + i).attr('href', "https://www.google.com/maps/place/" + addyForGoogle + ' ' + venue.location.formattedAddress[1]);
        }
      }).fail(function() {alert("Error: Did you enter a valid City, ST?");});
  });
}
  
function image_carousel(){
  var c = setInterval(changePic, 2700);

  $('.thumb_container').hover(function(){
    clearInterval(c);
    $('#viewport img').attr('src', $(this).data('full'));
  }, function(){
    c = setInterval(changePic, 2700);
  });

}

function pictureChanger(){
  var i = 1;
  return function(){
    i < 6 ? i++ : i = 1

    $('#viewport img').attr('src', $('#thumb' + i).data('full'));
  };
}

var changePic = pictureChanger();
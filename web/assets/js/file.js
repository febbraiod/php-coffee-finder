$(function() {
    apicall();
    image_carousel();
    goLogo();
});

// get coffee api call and dom rewrite
function apicall(){
  $('#button').click(function(){
    var city = $('#get_city').val();
    var params = {
      client_id: "MUUGJ2ZLK23TYMNXL1LAYRKP0LC4AX2JG0ZWCQTDJVLFS1VK", 
      client_secret: "EMKL5KL2TIQJLK1GTSZFYXOXPD0CVZSSK4CILB3WZ1QYCPZO",
      v: '20161016',
      near: city,
      radius: 4000,
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
          var citystate = venue.location.formattedAddress[1];
          $('#venue' + i).html(venue.location.formattedAddress[0] + '<br>' + citystate);
          $('#venue' + i).attr('href', "https://www.google.com/maps/place/" + addyForGoogle + ' ' + citystate);
        }
      }).fail(function() {alert("Error: Did you enter a valid City, ST?");});
  });
}
 
// image carousel 
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

// logo animation

function goLogo(){
  setTimeout(function(){$('circle').attr("class", "logo_circle filled_circle");}, 500);
  setTimeout(function(){$('.d').attr("class", "d letter_fill");}, 1000);
  setTimeout(function(){$('.o').attr("class", "o letter_fill");}, 1500);
  setTimeout(function(){$('.n').attr("class", "n letter_fill");}, 2000);
}
$(function() {
    apicall();
    image_carousel();
    hoverPic();
});

function apicall(){
  $('#button').click(function(){
    var city = $('#get_city').val();

    $.get("https://api.foursquare.com/v2/venues/search", 
      {client_id: "MUUGJ2ZLK23TYMNXL1LAYRKP0LC4AX2JG0ZWCQTDJVLFS1VK", 
      client_secret: "EMKL5KL2TIQJLK1GTSZFYXOXPD0CVZSSK4CILB3WZ1QYCPZO",
      v: '20161016',
      near: city,
      radius: 5000,
      query: 'coffee',
      limit: 5,
      intent: 'browse'},
      function(data){
        debugger;
      $(".result").html(data);})
      .fail(function() {
          alert("Error: Did you enter a valid City, ST?");
      });
  });
}
  
function image_carousel(){
  setInterval(changePic, 2700);
}

function pictureChanger(){
  var i = 1;
  return function(){
    if(i < 6){
      i++;
    }else{
      i = 1;
    }
    $('#viewport img').attr('src', $('#thumb' + i).data('full'));
  };
}

var changePic = pictureChanger();

function hoverPic(){
  $('.thumb_container').hover(function(){
    $('#viewport img').attr('src', $(this).data('full'));
    clearInterval(changePic);
  }, function(){});
}
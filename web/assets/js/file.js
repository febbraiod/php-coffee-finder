$(function() {
    apicall();
    image_carosel();
});

function apicall(){
  $('#button').click(function(){
    // var id = $().data();
    // var secret = $().data();
    $.get("https://api.foursquare.com/v2/venues/search", 
      {client_id: "MUUGJ2ZLK23TYMNXL1LAYRKP0LC4AX2JG0ZWCQTDJVLFS1VK", 
      client_secret: "EMKL5KL2TIQJLK1GTSZFYXOXPD0CVZSSK4CILB3WZ1QYCPZO",
      v: '20161016',
      near: 'Norwalk, CT',
      radius: 5000,
      query: 'coffee',
      limit: 5,
      intent: 'browse'},
      function(data){
        debugger;
        $(".result").html(data);});
  });
}
  
function image_carosel(){
  setInterval(changePic, 500);
}

function pictureChanger(){
  var i = 0;
  return function(){
    i < 6 ? i++ : i = 1;
    $('#viewport:first-child').attr('src', $('#thumb' + i).data('full'));
  };
}

var changePic = pictureChanger();
$(function(){

  // dropdown close
  $('body').on('click',function(e){
    var target=e?e.target:window.event.srcElement;
    if(!$(target).parents().is('.navbar-nav')){
      $('.dropdown.open').removeClass('open');
    }
  })

  $('.dropdown-toggle','.navbar').click(function(){
    $(this).parents('.dropdown').toggleClass('open');
  })

  // mmenu init
  $(".m-menu").mmenu({
    "extensions": [
        "pagedim-black"
    ],
    navbar:{
      title: "慧眼人才"
    }
  });
  var API = $(".m-menu").data( "mmenu" );
  $(".navbar-toggle").click(function() {
    API.open();
  });
  
})
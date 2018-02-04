$(function(){

  // dropdown close
  $('body').on('click',function(e){
    var target=e?e.target:window.event.srcElement;
    if(!$(target).parents().is('.navbar-nav')){
      $('.dropdown.open').removeClass('open');
    }
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
  
  // toolbar

  // go top
  $('.toolbar .gotop').click(function () {
    $('html,body').animate({
      scrollTop: '0px'
    }, 1000);
  })

  $('.toolbar .toolbar-btn').click(function () {
    $('.toolbar').fadeOut('1000').animate({
      opacity: 0
    }, 1000, function () {
      $(this).remove();
    });
  })

  // scroll listen
  $(window).on('scroll', function () {
    if (($('html').scrollTop() || $('body').scrollTop()) < $('.banner,.page-banner').height()) {
      $('.toolbar').fadeOut('800');
    } else {
      $('.toolbar').fadeIn('800');
    }
  })
})
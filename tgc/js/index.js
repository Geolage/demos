$(function(){
  // var _data=$.getJSON('../data/data.json');
  var header_swiper = new Swiper ('.swiper-container', {
    autoplay: 5000,
    direction: 'horizontal',
    effect : 'fade',
    fade: {
      crossFade: true,
    },
    loop: true,
    paginationClickable: true,
    pagination: '.swiper-pagination',
    onInit: function(swiper){
      swiperAnimateCache(swiper); 
      swiperAnimate(swiper);
    },  
    onSlideChangeStart: function(swiper){
      var color=$(swiper.slides[swiper.activeIndex]).find('.carousel-item').data('color');
      $('.banboard').css('background',color);
      $('.action-signup').css('color',color);
      $('.btn-enter').hover(function(){
        $(this).css('color',color);
      })
    },
    onSlideChangeEnd: function(swiper){ 
      swiperAnimate(swiper); 
    }
  })
  $('.swiper-container').hover(function(){
    header_swiper.stopAutoplay();
  },function(){
    header_swiper.startAutoplay();
  })

  var service_swiper = new Swiper ('.services .showbox', {
    direction: 'vertical',
    effect : 'fade',
    fade: {
      crossFade: true,
    }
  })
  $('.service-list>ul>li').mouseover(function(){
    service_swiper.slideTo($(this).addClass('active').siblings().removeClass('active').end().index(),500,false);
  })
})
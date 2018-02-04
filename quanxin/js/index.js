$(function () {
  var _timer;

  // animation init
  new WOW().init();
  // vision init
  new Rellax('.rellax');

  var mySwiper = new Swiper ('.banner', {
    autoplay : 5000,
    direction: 'horizontal',
    effect : 'slide',
    parallax: true,
    onInit: function(swiper){ 
      swiperAnimateCache(swiper); 
      swiperAnimate(swiper);
    }, 
    onSlideChangeEnd: function(swiper){ 
      swiperAnimate(swiper);
    }
  })       
})
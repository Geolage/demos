$(function () {
  var i_now = 1;
  $('.btn').click(function () {
    $(this).blur()
  })
  $('.btn', '.page-pagination').eq(i_now).addClass('active')
    .end().click(function () {
      var $this = $(this);
      if ($this.hasClass('disabled')) return;
      i_now = $('.btn', '.page-pagination').index($this);
      $('.page-pagination').find('.btn').removeClass('active');
      $('.btn', '.page-pagination').eq(i_now).addClass('active')
      var sbl = $this.siblings(),
        id = $this.index();
      $this.parent().hasClass('pagination-more') ? (id == sbl.length ? ($('.next', '.page-pagination').addClass('disabled')) : ($('.next', '.page-pagination').removeClass('disabled'))) : (id == 1 ? (sbl.first().addClass('disabled')) : (sbl.first().removeClass('disabled')));
      if ($this.hasClass('more')) {
        $('.pagination-more').slideToggle();
        // $('.pagination-more').slideToggle().children('.btn').each(function(i,e){  // unfinished !!
        //   (function(_i,_e){
        //     setTimeout(function(){
        //       $(_e).fadeToggle().toggleClass('animated bounceInLeft');
        //     }, $(_e).siblings('.btn').length*300-_i*300)
        //   })(i,e)
        // });
        $('.pagination-more').toggleClass('active');
      } else {
        if ($this.parent().hasClass('pagination-more')) return;
        if ($('.pagination-more').hasClass('active')) {
          $('.pagination-more').slideUp().removeClass('active');
        }
      }
    })
  $('.btn', '.page-menu').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
  })
})
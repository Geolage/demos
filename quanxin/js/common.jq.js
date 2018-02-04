$(function () {

  // navbar on mobile hover
  $('.navbar-mobile .menu-list>li').click(function () {
    var $this = $(this);
    $this.hasClass('active') ? $this.removeClass('active') : $this.addClass('active').siblings().removeClass('active');
  }).has('.sublist').hover(function () {
    var $subli = $('.sublist', this).children();
    $(this).css('height', ($subli.length + 1) * $subli.eq(0).css('height').slice(0, -2));
  }, function () {
    $(this).removeAttr('style');
  }).click(function (e) {
    if ($(e.target).parents('.sublist').length) {
      return;
    }
    var $subli = $('.sublist', this).children();
    if ($(this).hasClass('active')) {
      $(this).css('height', ($subli.length + 1) * $subli.eq(0).css('height').slice(0, -2)).siblings().removeAttr('style');
    } else {
      $(this).css('height', $subli.eq(0).css('height'));
    }
  });

  // menu-list hover
  $('.navbar-menu .menu-list>li').has('.sublist').hover(function () {
    $(this).find('.sublist').fadeIn();
  }, function () {
    $(this).find('.sublist').hide();
  });

})
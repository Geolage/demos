$(function(){
  // var _data=$.getJSON('../data/data.json');
  var _data={
    header:[
      {
        title:'微站',
        p1:'完全可视化拖拽',
        p2:'三分钟打造自己的小程序',
        color:'#2589ff',
        banner:'http://statichome.weimob.com/img/nweb/img/zhan/ban_zhan.png'
      },
      {
        title:'微盟小店小程序',
        p1:'商城、营销、会员等一站式服务',
        p2:'轻松打造独立专属的在线商城',
        color:'#fa6869',
        banner:'http://statichome.weimob.com/img/nweb/img/shop/ban_shop.png'
      },
      {
        title:'客来店',
        p1:'互联网智慧门店行业解决方案',
        p2:'会员管理+营销推广+门店管理三大核心功能助店营收',
        color:'#1ad4e5',
        banner:'http://statichome.weimob.com/img/nweb/img/ban_kld.png'
      }
    ]
  };
  var timer;
  var setTimer=function(el){
    var $el=$(el),$index=$(el).index(),$siblings=$el.siblings().length;
    timer=setTimeout(function(){
      headerChange($('li','.indicator').eq(0),_data);
      setTimer($index===$el.siblings().length?);
    },3000);
  }
  $('.indicator').find('li').mouseover(function(){
    var _this=this;
    headerChange(_this,_data);
  })
  function headerChange(el,data){
    var $this=$(el),$index=$this.index();
    var _data=data.header[$index];
    $('body>.header').css('background-color',_data.color).find('.carousel').fadeOut();
    setTimeout(function(){
      bannerChange(_this,_data);
      $('.carousel').fadeIn();
    },300);
    function bannerChange(){
      $(this).addClass('active').siblings().removeClass('active');
      $this.parents('.indicator').siblings().eq(0).html(getHeaderTmpl(_data,$index)).end().eq(1).attr({src:_data.banner,class:'banner banner-'+($index+1)});
    }
    function getHeaderTmpl(data,index){
      return '<div class="description"><h2 class="title">'+data.title+'</h2>'+'<p>'+data.p1+'</p>'+'<p class="mb">'+data.p2+'</p>'+'<a class="btn-enter" href="javascript:0">'+'免费注册'+'</a></div>'
    }
  }

  // function headerChange(el,data){
  //   var $this=$(el),$index=$this.index();
  //   var _data=data.header[$index];
  //   $('body>.header').css('background-color',_data.color).find('.carousel').css('opacity',0);
  //   setTimeout(function(){
  //     headerChange(_this,_data);
  //     $('.carousel').css('opacity',1);
  //   },300);
  //   $(this).addClass('active').siblings().removeClass('active');
  //   $this.parents('.indicator').siblings().eq(0).html(getHeaderTmpl(_data,$index)).end().eq(1).attr({src:_data.banner,class:'banner banner-'+($index+1)});
  //   function getHeaderTmpl(data,index){
  //     return '<div class="description"><h2 class="title">'+data.title+'</h2>'+'<p>'+data.p1+'</p>'+'<p class="mb">'+data.p2+'</p>'+'<a class="btn-enter" href="javascript:0">'+'免费注册'+'</a></div>'
  //   }
  // }
  
  $('li','.products-list').hover(function(){
    $(this).find('.card-hover').fadeIn();
  },function(){
    $(this).find('.card-hover').fadeOut();
  });
})
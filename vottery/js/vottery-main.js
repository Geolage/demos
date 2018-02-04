(function ($) {

    $('.flex-list li a').click(function (e) {
        var $this = $(this);
        $this.toggleClass('active').parent().siblings().find('a').removeClass('active');
        $this.parents('div[class$="-list"]').siblings().children('ul').children('li').children('a').removeClass('active');
        e ? e.preventDefault() : window.event.returnValue = false;
    });

    $('.vote-actions a').hover(function () {
        var $this = $(this),
            margin = 'margin-';
        margin += $this.hasClass('btn-new') ? 'right' : 'left';
        $this.parent().css({
            "z-index": 3,
            [margin]: "-38%"
        }).siblings().css("z-index",2);
    }, function () {
        $(this).parent().removeAttr('style').css("z-index",3);
    })

    var styles={
		label:{
            styles: ["-success", "-warning","-danger"],
            picker: []
        },
		panel:{
            styles: ["-info", "-success", "-warning"],
            picker: []
        },
        heading:''
    }
    
	template.defaults.imports.getStyle = function (elem) {  // 随机style
		    if(elem=='btn'){
                return styles.heading;
            } 
            else{
                styles[elem].picker= styles[elem].picker.length ? styles[elem].picker:styles[elem].styles.slice();
                var i = Math.round(Math.random()*(styles[elem].picker.length-1));
                var style=styles[elem].picker.splice(i,1).toString();
                if(elem=='panel') styles.heading=style;
                return style; 
            }
    }

    var urls = {
            tmpl1: '../templates/mainboard-art.tmpl',
            data1: '../data/vottery.data.main.json',
            data2: '../data/vottery.data.user.json'
        },
        map = { // 可探索一个元素对应多数据的方法
            '.carousel-inner': "main.recommendation.slider",
            '.today-news': "main.recommendation.news",
            '#vote-cards': "user.userInfo"
        };

    var gb = new GetBlended();
    gb.getBlendedRecord(urls.tmpl1,[urls.data1,urls.data2],map).done(function (data) {
        for(var elem of Object.keys(map)){
            var html=template.render(data.tmpl[elem],data.data[elem]);
            $(elem).html(html);
        }
    });

})(jQuery);

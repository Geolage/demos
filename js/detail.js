
(function($){
    // 获取Ip
    $.getJSON('http://freegeoip.net/json/',function(data){
        //$.cookie('cur_ip')==data.ip?alert('Abolished!'):console.log(data.ip);  // 缺警告框
        $.cookie('cur_ip',data.ip,{expires:1,path:'/'});
        // $('.loading').hide();   // 隐藏加载图层
    });

    	var styles={
            label:{
                styles: ["-success", "-warning","-danger"],
                picker: []
            },
            heading:''
        }
        
        template.defaults.imports.getStyle = function (elem) {  // 随机style
                    styles[elem].picker= styles[elem].picker.length ? styles[elem].picker:styles[elem].styles.slice();
                    var i = Math.round(Math.random()*(styles[elem].picker.length-1));
                    var style=styles[elem].picker.splice(i,1).toString();
                    if(elem=='panel') styles.heading=style;
                    return style; 
        }

        template.defaults.imports.getArticle = function (data) {
            return data.split('%|%');
        }

        var urls={
            tmpl1:"../templates/detail-art.tmpl",
            data1:"../data/vottery.data.detail.json"
        },
        map={
            ".detail-header":"detail.userInfo",
            ".user-statement":["detail.userInfo.content.description",
                               "detail.userInfo.content.article"]
        };

        var gb=new GetBlended();
        gb.getBlendedRecord(urls.tmpl1,urls.data1,map).done(function(data){
            for(var elem of Object.keys(map)){
                var html=template.render(data.tmpl[elem],data.data[elem]);
                $(elem).html(html);
            }
            
        })

})(jQuery);
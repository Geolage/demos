function GetBlended() {
    this.getBlendedRecord = getBlendedRecord;
    this.getBlendedTmpl = getBlendedTmpl;
    this.getBlendedData = getBlendedData;
    this.getTmpl = getTmpl;
    this.getData = getData;

    function getBlendedRecord(tmpl_urls, data_urls, elem_map) {
        var dfd = $.Deferred();
        var p1 = getBlendedTmpl,
            p2 = getBlendedData;
        var record = new Object();
        try {
            var args = Array.prototype.slice.call(arguments),
                flag = true;
            $.each(['tmpl_urls', 'data_urls', 'elem_map'], function (i, e) {
                if (!args[i]) {
                    console.log('错误：缺少' + e + '参数！');
                    flag = false;
                }
            })
            if (!flag) throw '';
        } catch (err) {
            return;
        }
        $.when(p1(tmpl_urls, elem_map), p2(data_urls, elem_map)).done(function (data1, data2) {
            record["tmpl"] = data1;
            record["data"] = data2;
            dfd.resolve(record);
        }).fail(function (err) {
            console.log(err + '  混合记录失败！');
        })
        return dfd.promise();
    }

    function throwError(obj) {
        try {
            if (!obj) throw new Error('throwError()的参数不能为空！');
            else {
                if (Object.prototype.toString.call(obj).slice(8, -1) !== 'Object') {
                    throw new Error('throwError()的参数格式有误！');
                } else {
                    var count = 0;
                    $.each(obj, function (k, v) {
                        count++;
                        if (!k.trim()) {
                            throw new Error('未指明throwError()的数据类型(type)！');
                            return;
                        }
                    });
                    if (count != 1) throw new Error('throwError()的数据类型(type)有且只能指定一个！')
                }
            }
        } catch (err) {
            console.log(err + ' 参数格式应为："{ type : src }"。');
        }
        var type = Object.getOwnPropertyNames(obj)[0],
            urls = obj[type];
        if (type == 'urls') {
            try {
                if (urls) {
                    if (Object.prototype.toString.call(urls).slice(8, -1) == 'Array') {
                        if (!urls.length) throw new Error('url不能为空！');
                        else {
                            var err_count = 0,
                                regex1 = /(^[\.]{0,2}\/)([^\*?|]+(\\|\/?))+(\.json|\.txt|\.tmpl)?/g,
                                regex2 = /^((https|http|ftp|rtsp|mms):\/\/)[^\s]+/g;
                            $.each(urls, function (idx, url) {
                                try {
                                    if (!url.trim().length) {
                                        throw new Error('注意：第' + (idx + 1) + '个url为空！');
                                    }
                                    else{
                                        if (!(url.match(regex1).length || url.match(regex2).length)) {
                                            throw new Error('注意：此url格式有误！来源：' +'"'+url+'"');
                                        }
                                    }
                                } catch (err) {
                                    console.log(err);
                                    err_count++;
                                }
                            });
                            if (err_count == urls.length) {
                                throw new Error('url格式检验不通过！请检查所提供的url或throwError()的url参数是否书写正确');
                            }
                        }
                    } else {
                        throw new Error('throwError()的url参数格式错误！');
                    }
                } else {
                    throw new Error('未指明throwError()的url参数！');
                }
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        }
        // if(type=='map'){     // 待完善
        // }
    }

    function getTmpl(urls) { // 一个页面最好只用一个模板文件
        try{
            if(arguments.length<1) throw new Error('错误：缺少参数！');
        }catch(err){
            console.log(err);
            return;
        }
        if(arguments.length>1){
            var urls=arguments[0];
        }
        if (Object.prototype.toString.call(urls).slice(8, -1) == 'String') urls = urls.split();
        if (!throwError({
                'urls': urls
            })) return;
        var def = $.Deferred();
        var regex = new RegExp(/\["[#\.]?[\w\s\.#-_]*"\]/g);
        var tmpl_tmp = new Object();
        var echo_count = 0,
            failed_allow = urls.length * 3;     //允许重新加载次数
        for (var url of urls) {
            (function get(link) {
                $.get(link).done(function (data) {
                    try {
                        if (!(link.match(/(\.tmpl|\.art|\.txt)$/).length)) {     // 检查模板格式
                            throw new Error('非模板文件！请检查url是否正确！');
                        } else {
                            if ((!data.match(regex).length) || (typeof data != 'string')) {
                                throw new Error('Ooops! 有模版可能存在书写格式错误！');
                            }
                        }
                        var elems = data.match(regex).filter(function (v) {
                                return v.trim().length > 0;
                            }).map(function (v) {
                                return v.slice(2, -2);
                            }),
                            tmpl_raw = data.split(regex).filter(function (v) {
                                return v.length > 0
                            });
                        $.each(elems, function (i, e) {
                            tmpl_tmp[e] = tmpl_raw[i];
                        });
                        echo_count++;
                    } catch (err) {
                        console.log(err + '\n\t' + '   来源：' + ' "' + link + '"')
                    } finally {
                        failed_allow -= 3;
                    }
                }).fail(function (err) {
                    if (failed_allow > 0) {
                        setTimeout(function () {
                            get(link);
                            console.log('Error! Reloading ...');
                            failed_allow--;
                        }, (7 - failed_allow) * 100);
                    }
                });
            })(url)
        }
        setTimeout(function delay() {
            if (echo_count == urls.length || failed_allow == 0) {
                if (echo_count > 0) {
                    def.resolve(tmpl_tmp);
                    tmpl_tmp = null;
                } else {
                    console.log('加载出错！请检查url是否有效！');
                    return;
                }
            } else setTimeout(delay, 150);
        }, 20);
        return def.promise();
    }

    function getData(urls) {
        try{
            if(arguments.length<1) throw new Error('错误：缺少参数！');
        }catch(err){
            console.log(err);
            return;
        }
        if(arguments.length>1){
            var urls=arguments[1];
        }
        if (Object.prototype.toString.call(urls).slice(8, -1) == 'String') urls = urls.split();
        if (!throwError({
                'urls': urls
            })) return;
        var def = $.Deferred();
        var regex = /(vottery\.)?data\.[\w\d.]+\.(json|txt|html|htm|xml)\b/g; // 确保数据格式正确
        var data_tmp = new Object();
        var echo_count = 0,
            failed_allow = urls.length * 3; // 允许重新加载次数
        for (var url of urls) {
            (function get(link) {
                try {
                    var match = link.match(regex);
                    if (!match) throw new Error('找不到数据源！文件命名可能有误！');
                    var key = match[0].split('.').slice(-2, -1).toString();
                    $.get(link).done(function (data) {
                        data_tmp[key] = data;
                        echo_count++;
                    }).fail(function (err) {
                        if (failed_allow > 0) {
                            get(link);
                            console.log('Error! Reloading ...');
                            failed_allow--;
                        }
                    });
                } catch (err) {
                    console.log(err + '\n' + '错误来源： ' + link + '\n' + "url格式请参照：" + '"...data.[DataName].json|txt|html|htm|xml|..."，' + '或修改正则表达式(regex)');
                } finally {
                    failed_allow -= 3;
                }
            })(url)
        }
        setTimeout(function delay() {
            if (echo_count == urls.length || failed_allow == 0) {
                if (echo_count > 0) {
                    def.resolve(data_tmp);
                    data_tmp = null;
                } else {
                    console.log('加载出错！请检查url是否有效！');
                    return;
                }
            } else setTimeout(delay, 150);
        }, 20);
        return def.promise();
    }

    function getBlendedTmpl(tmpl_urls,elem_map) {
        try{
            if(arguments.length<2) throw new Error('错误：缺少参数！');
        }catch(err){
            console.log(err);
            return;
        }
        if(arguments.length>2){
            var tmpl_urls=arguments[0],elem_map=arguments[2];
        }
        var dfd = $.Deferred();
        var tmpl_bln = new Object();
        getTmpl(tmpl_urls).done(function (data) {
            var elems = Object.getOwnPropertyNames(elem_map).slice();
            for (var elem of elems) {
                tmpl_bln[elem] = data[elem];
            }
            dfd.resolve(tmpl_bln);
            tmpl_bln = null;
        }).fail(function () {
            console.log('加载模版失败！');
        })
        return dfd.promise();
    }

    function getBlendedData(data_urls, elem_map) {
        try{
            if(arguments.length<2) throw new Error('错误：缺少参数！');
        }catch(err){
            console.log(err);
            return;
        }
        if(arguments.length>2){
            var data_urls=arguments[1],elem_map=arguments[2];
        }
        var dfd = $.Deferred();
        var data_bln = new Object();
        getData(data_urls).done(function (data) {
            try {
                var count, err_count = 0;
                $.each(elem_map, function (elem, key) {
                    count++;
                    try {
                        var type=Object.prototype.toString.call(key).slice(8,-1);
                        if(type!='Array'&&type!='String'){
                            throw new Error('elem_map中的"path"格式有误！');
                        }
                        if(type=='String'){
                            key=[key];
                        }
                        for(var p of key){
                            var data_tmp={};
                            var key_arr = p.replace(/\[['"]?/g,'.').replace(/['"]?\]/g,'').split('.');
                            var data_arr = key_arr.slice();
                            data_arr.unshift(data);
                            var bln_arr = key_arr.slice();
                            bln_arr.splice(0, 0, data_tmp, elem);
                            var data_new = data_arr.reduce(function (m, n) {
                                if(/^\d+$/.test(n)) n=parseInt(n);
                                if (!(m.hasOwnProperty(n)||m[n])){
                                    throw new Error('注意："' + elem + '"的数据为空！');
                                }
                                return m[n];
                            });
                            (function formatter(data) {
                                bln_arr.reduce(function (a, b) {
                                    if (bln_arr.indexOf(b) == bln_arr.length - 1) {
                                        return a[b] = data;
                                    }
                                    if(/^\d+$/.test(b)){
                                        return a[b] = [];
                                    }
                                    return a[b] = {};
                                })
                            })(data_new)
                            $.extend(true,data_bln,data_tmp);
                        }
                        } catch (err) {
                            console.log(err + ' → 请检查elem_map中的"path"是否正确或者漏写！');
                            err_count++;
                    }
                })
                if (err_count == count) throw new Error('混合数据失败！');
            } catch (err) {
                console.log(err + ' 请在书写格式无误的情况下，确保elem_map中"path"和"elem"是正确对应的！');
            }
            dfd.resolve(data_bln);
            data_bln = null;
        }).fail(function () {
            console.log('加载数据失败！');
        })
        return dfd.promise();
    }
}
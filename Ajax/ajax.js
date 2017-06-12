(function ($) {
    $.ajaxProc = function(actType){
        console.log(actType);
        $.loadData(actType);
    };
    $.loadData = function(actType){
        console.log(actType);
        var loadObj = $(window.top.document.getElementsByClassName("loading-container"));
        console.log(loadObj);

        switch(parseInt(actType)){
            case $.DEF.AJAX_ACT_TYPE.LOAD:
                if(!loadObj.hasClass("active")){
                    loadObj.addClass("active");
                }
                break;
            case $.DEF.AJAX_ACT_TYPE.REMOVE:
                if(loadObj.hasClass("active")){
                    loadObj.removeClass("active");
                }
                break;
            default:
                if(loadObj.hasClass("active")){
                    loadObj.removeClass("active");
                }
                break;
        }
    };
    $.DEF= {
        AJAX_ACT_TYPE: {
            DEFAULT: 0,
            LOAD: 1,
            REMOVE: 255
        },
        SEND_TYPE: {
            GIVE: 0,
            GET: 1
        }
    };
    $.fnDefine={};
    $.ajaxParam={
        dataType: "json",
        type: 'POST',
        url:"",
        async:true,
        timeout:30000,
        data:"",
        cache:true  ,// true，dataType 为 script 和 jsonp 时默认为 false。设置为 false 将不缓存此页面。

        actBeforeType:$.DEF.AJAX_ACT_TYPE.LOAD,
        actBeforeFun:$.ajaxProc,

        actEndType:$.DEF.AJAX_ACT_TYPE.REMOVE,
        isModal:0, //1模态 0 非模
        isDataFront:0 ,//1 在获取数据前移除，0在获取数据后移除
        actEndFun:$.ajaxProc
    };
    $.onReceivedError = function (para) {
        for(var key in para){
            if(para.hasOwnProperty(key)) {
                if (!$.fnDefine[key] || !$.fnDefine[key].data)
                    continue;
                $.fnDefine[key].data = para[key] ? para[key] : null;
                if (!$.fnDefine[key].error)
                    continue;
                $.fnDefine[key].error($.fnDefine[key].data);
            }
        }
    };

    $.onReceivedSucess =  function (para) {
        for(var key in para){
            if(para.hasOwnProperty(key)) {
                if (!$.fnDefine[key] || !$.fnDefine[key].data)
                    continue;
                $.fnDefine[key].data = para[key] ? para[key] : null;

                if (!$.fnDefine[key].sucess)
                    continue;
                $.fnDefine[key].sucess($.fnDefine[key].data);
            }
        }
    };
    /*异步 没有 页面load 效果的 Ajax*/
    $.ajaxWrap = function (fnSucess, fnError) {
       // console.log($.ajaxParam);
        $.ajax({
            dataType: isDefined($.ajaxParam.dataType)?$.ajaxParam.dataType:"json",
            type: isDefined($.ajaxParam.type)?$.ajaxParam.type:"POST",
            url: isDefined($.ajaxParam.url)?$.ajaxParam.url:"",
            async: isDefined($.ajaxParam.async)?$.ajaxParam.async:true,
            timeout: isDefined($.ajaxParam.timeout)?$.ajaxParam.timeout:20000,
            data:{json:isDefined($.ajaxParam.data)?$.ajaxParam.data:""},
            cache:isDefined($.ajaxParam.cache)?$.ajaxParam.cache:true,
            beforeSend:function(XMLHttpRequest){
         /*      console.log(this.data);
                if($.ajaxParam.actBeforeFun){
                    $.ajaxParam.actBeforeFun($.ajaxParam.actBeforeType);
                }*/
                //可修改 XMLHttpRequest 对象的函数，如添加自定义 HTTP 头
            },
            success:function(data){
                fnSucess(data);
       /*         setTimeout(function () {
                    if($.ajaxParam.actEndFun){
                        $.ajaxParam.actEndFun($.ajaxParam.actEndType);
                    }
                },2000);*/
            },
            dataFilter : function(data, type){
                if(data == "timeOut" || data == "[object XMLDocument]"){
                    console.log("ajax请求，发现session过期，重新刷新页面，跳转到登录页面");
                    top.location.href = "../../login.html";//   window.location.reload();
                }else{
                    return data; //必须return
                }
            },
            error:function(xhr,errMsg,catchObj){
                console.log("Ajax errMsg:"+errMsg);
                console.log("Ajax catchObj:"+catchObj);
/*
                if($.ajaxParam.isModal && $.ajaxParam.isDataFront && $.ajaxParam.actEndFun){
                    $.ajaxParam.actEndFun($.ajaxParam.actEndType);
                }*/
                fnError(errMsg);
               /* if($.ajaxParam.isModal && !$.ajaxParam.isDataFront && $.ajaxParam.actEndFun){
                    $.ajaxParam.actEndFun($.ajaxParam.actEndType);
                }*/
            }
        });
    };

    $.invokeRequest = function () {
        $.ajaxParam.url = arguments.length>0?arguments[0]:null;
        $.ajaxParam.data = arguments.length>1?arguments[1]:null;
        $.ajaxParam.async = arguments.length>2?arguments[2]:null;
        $.ajaxWrap($.onReceivedSucess,$.onReceivedError);
    };

})(jQuery);

function FormData() {
    this.method = (arguments.length>0 && arguments[0])?arguments[0]:0;
    this.data = (arguments.length>1 && arguments[1])?arguments[1]:{};
}
FormData.add = function(dataObj,key) {
    var func = new FormData(arguments[2],arguments[3]);
    dataObj[key] = func;
};

function FnDefine() {
    this.sucess = (arguments.length>0 && arguments[0])?arguments[0]:{};
    this.error = (arguments.length>1 && arguments[1])?arguments[1]:{};
}
FnDefine.add = function() {
    var func = new FnDefine(arguments[1],arguments[2]);
    $.fnDefine = func;
};

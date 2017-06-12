/**
 * Created by yangjiao on 2017/6/8.
 */


$(function () {
   /* $('span').hide();*/
    //username
    //鼠标移开
    $('#username').on('mouseleave',function () {
        var userStr = $(this).val();
        var userPattern = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
        if(userStr !== ''){
            //如果输入字符与规定正则不匹配时
            if(!userPattern.exec(userStr)){
                $('span').eq(1).addClass('removeSpan');
                $('span').eq(1).show();
                $('span').eq(2).show();
            }else{//输入字符与规定正则匹配时
                $('span').eq(0).addClass('okSpan');
                $('span').eq(0).show();
            }
        }
    });
    //鼠标移入
    $('#username').on('mouseenter',function () {
        var userStr = $(this).val();
        var userPattern = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
        if(userStr !== ''){
            if(!userPattern.exec(userStr)){
                $('span').eq(1).hide();
                $('span').eq(2).hide();
                $(this).val('');
            }
        }
    });
    //password
    //鼠标移开
    $('#psw').on('mouseleave',function () {
        var pswStr = $(this).val();
        var pswPattern = /^(\w){6,20}$/;
        if(pswStr !== ''){
            if(!pswPattern.exec(pswStr)){
                $('span').eq(4).addClass('removeSpan');
                $('span').eq(4).show();
                $('span').eq(5).show();
            }else{
                $('span').eq(3).addClass('okSpan');
                $('span').eq(3).show();
            }
        }
    });
    //鼠标移入
    $('#psw').on('mouseenter',function () {
        var pswStr = $(this).val();
        var pswPattern = /^(\w){6,20}$/;
        if(pswStr !== ''){
            if(!pswPattern.exec(pswStr)){
                $('span').eq(4).hide();
                $('span').eq(5).hide();
                $(this).val('');
            }
        }
    });


    //初始化请求数据
    $.ajax({
        url:'../json/login.json',
        method:'GET',
        dataType:'json',
        success:function (data) {
            //处理数据
            showLogin(data);
        }
    });
    //处理请求到的数据
    function showLogin(data) {
        if(parseInt(data.login_remember) === 1){
            $('#remember').prop('checked',true);
        }
    }


    //提交数据
    var loginData = {};
    $('#loginBtn').on('click',function (event) {
        //阻止默认
        event.preventDefault();
        //获取页面数据
        loginData.username = $('#username').val();
        loginData.psw = $('#psw').val();
        if($('#remember').prop('checked')){
            loginData.remember = 1;
        }else {
            loginData.remember = 0;
        }
        console.log(loginData);
        //向后台发送
        $.ajax({
            url:'#',
            method:'GET',
            dataType:'json',
            data:loginData,
            success:function (data) {
                //处理数据
            }
        })
    });
    //重置数据
    $('#resetBtn').on('click',function () {
        $('span').hide();
    });


});
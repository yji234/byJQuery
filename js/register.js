/**
 * Created by yangjiao on 2017/6/12.
 */
$(function () {
    /*  $('span').hide();*/

    //邮箱
    //鼠标移除
    $('#email').on('mouseleave',function () {
        var emailStr = $(this).val();
        var emailPattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        if(emailStr !== ''){
            if(!emailPattern.exec(emailStr)){
                $('span').eq(1).addClass('removeSpan');
                $('span').eq(1).show();
                $('span').eq(2).show();
            }else{
                $('span').eq(0).addClass('okSpan');
                $('span').eq(0).show();
            }
        }
    });
    //鼠标移入
    $('#email').on('mouseenter',function () {
        var emailStr = $(this).val();
        var emailPattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        if(!emailPattern.exec(emailStr)){
            $('span').eq(1).hide();
            $('span').eq(2).hide();
            $(this).val('');
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

    //repassworld
    //鼠标移出
    $('#repsw').on('mouseleave',function () {
        var pswStr = $('#psw').val();
        var repswStr = $(this).val();
        if(repswStr != ''　&& repswStr !== pswStr){
            $('span').eq(7).addClass('removeSpan');
            $('span').eq(7).show();
        }else if(repswStr != ''　&& repswStr == pswStr){
            $('span').eq(6).addClass('okSpan');
            $('span').eq(6).show();
        }
    });
    //鼠标移入
    $('#repsw').on('mouseenter',function () {
        var pswStr = $('#psw').val();
        var repswStr = $(this).val();
        if(repswStr != '' &&　repswStr !== pswStr){
            $('span').eq(7).hide();
            $(this).val('');
        }
    });

    //验证码：数标移入随机生成4位整数
    $('#verification').on('mouseenter',function () {
        var ranNum = Math.random()*10000;
        var verNum = Math.ceil(ranNum);
        if(verNum<1000){
            verNum = verNum+'0';
        }
        $('#verification').val(verNum);
    });

    //注册
    $('#registerBtn').on('click',function (event) {
        //阻止默认事件
        event.preventDefault();
        //获取页面数据发送到后台
        var registerData = {};
        if($('#email').val() == '' || $('#psw').val() == '' || $('#repsw').val() == '' || $('#verification').val() == ''){
            alert('请填写完整再提交')
        }else{
            registerData.email = $('#email').val();
            registerData.psw = $('#psw').val();
            registerData.repsw = $('#repsw').val();
            registerData.verification = $('#verification').val();
            console.log(registerData)
            $.ajax({
                url:'',
                method:'GET',
                data:registerData,
                dataType:'json',
                success:function (data) {
                    alert(data);
                }
            });
        }
    });

    //重置
    $('#resetBtn').on('click',function () {
        $('span').hide();
    });
})
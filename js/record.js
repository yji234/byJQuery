/**
 * Created by yangjiao on 2017/6/19.
 */


$(function () {
    //支出
    var recordData = {};
    //分类
    var classDiv = $('.classifyChild').find('div');
    for(var i = 0;i<classDiv.length;i++){
        $(classDiv[i]).on('click',function () {
            recordData.classify = $(this).html();
        });
    }
    //点击按钮记账（支出）
    $('#recordBtn').on('click',function () {
        recordData.remark = $('#remark').val();
        recordData.date = $('#date').val();
        recordData.money = $('#money').val();
        console.log(recordData)
        //向后台发送数据
        $.ajax({
            url:'',
            method:'GET',
            dataType:'json',
            data:recordData,
            success:function (data) {
                //alert(data);
            }
        })
        //置空
        $('#remark').val('');
        $('#date').val('');
        $('#money').val('');
    });
    //点击按钮记账（收入）
    $('#recordBtn1').on('click',function () {
        recordData.remark = $('#remark1').val();
        recordData.date = $('#date1').val();
        recordData.money = $('#money1').val();
        console.log(recordData);
        //向后台发送
        $.ajax({
            url:'#',
            method:'GET',
            dataType:'json',
            data:recordData
        })
        //置空
        $('#remark1').val('');
        $('#date1').val('');
        $('#money1').val('');
    })
});

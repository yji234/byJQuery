/**
 * Created by yangjiao on 2017/6/19.
 */


$(function () {
    var recordData = {};
    //分类
    var classDiv = $('.classifyChild').find('div');
    for(var i = 0;i<classDiv.length;i++){
        $(classDiv[i]).on('click',function () {
            recordData.classify = $(this).html();
        });
    }
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
});

/**
 * Created by yangjiao on 2017/6/21.
 */


// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add views
var view1 = myApp.addView('#view-1',{
    dynamicNavbar: true
});
var view2 = myApp.addView('#view-2',{
    dynamicNavbar: true
});
var view3 = myApp.addView('#view-3',{
    dynamicNavbar: true
});
var view4 = myApp.addView('#view-4',{
    dynamicNavbar: true
});




$(function () {

    /*记账*/

    /*加载进来记账页面*/
    /*$('#recordBtn').on('click',function () {
        $('#recordLoad').load('record.html')
    })*/


    /*统计*/

    /*页面一加载进来就从后台获取数据并展示在页面*/
    $.ajax({
        url:'../json/recordShow.json',
        method:'GET',
        dataType:'json',
        success:function (data) {
            //展示页面
            showRecordData(data);
        }
    })

});

//展示统计数据
function showRecordData(data) {
    var recordData = data.recordData;
    var userData = data.userData;
    //console.log(recordData)
    //console.log(userData)

    //userData
    $('.chip-label.username').html(userData.userName);
    $('.monthIncome').html(userData.monthIncome);
    $('.monthSaveMoney').html(userData.monthSaveMoney);
    $('.monthExpend').html(userData.monthExpend);
    $('.monthSurplus').html(userData.monthSurplus);

    //recordData
   for(var key in recordData){
       //console.log(recordData[key])
       dynamicAdd(recordData[key])
   }
}

//动态添加
function dynamicAdd(data) {
    var titleDiv = $('<div class="content-block-title skan"><span class="time"></span><span style="margin-left: 65%;font-size: xx-small;"><span class="label" style="color: #444"></span>:<strong class="titleMoney"></strong></span></sp></div>');
    var contentDiv = $('<div class="list-block skan"><ul> <li class="swipeout"><div class="swipeout-content item-content"> <div class="item-media"><i class="f7-icons" style="color: lightsalmon">home_fill</i></div> <div class="item-inner"> <div class="item-title classify"></div> <div class="item-after"><span style="color: black; font-weight: bolder" class="contentMoney"></span></div> </div> </div> <div class="swipeout-actions-right"> <a href="#" class="swipeout-delete" data-confirm="确定删除么？" data-confirm-title="Delete?">Delete</a> </div> </li> </ul> </div>')
    $(titleDiv).find('.time').html(data.time);
    $(titleDiv).find('.label').html(data.label);
    $(titleDiv).find('.titleMoney').html(data.money)
    $(contentDiv).find('.classify').html(data.classify);
    $(contentDiv).find('.contentMoney').html(data.money);
    $('.page-content.skan').append(titleDiv);
    $('.page-content.skan').append(contentDiv);
}

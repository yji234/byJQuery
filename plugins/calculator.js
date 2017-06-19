
var sNum1='';
var sOpr='';

var bNeedClear=false;	//是否需要清除输入框中已有的内容

//计算
function calc(iNum1, iNum2, sOpr) {
    var iResult=0;
    switch(sOpr)
    {
        case '×':
            iResult=iNum1*iNum2;
            break;
        case '+':
            iResult=iNum1+iNum2;
            break;
        case '-':
            iResult=iNum1-iNum2;
            break;
        case '÷':
            iResult=iNum1/iNum2;
            break;
        default:
            iResult=iNum2;
    }

    return iResult;
}

//对应的符号的作用
function doInput() {
    var oInput=document.getElementById('money');
    var sHtml=this.innerHTML.replace(' ','');

    switch(sHtml)
    {
        case '=':
            oInput.value=calc(parseInt(sNum1), parseInt(oInput.value), sOpr);

            sNum1='';
            sOpr='';
            bNeedClear=true;
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
            bNeedClear=true;

            if(sNum1.length!=0)
            {
                oInput.value=calc(parseInt(sNum1), parseInt(oInput.value), sOpr);
            }

            sOpr=sHtml;

            sNum1=oInput.value;
            break;
        case 'C':
            oInput.value='0';
            sNum1='';
            sOpr='';
            break;
        default:	//数字
            if(bNeedClear)
            {
                oInput.value=parseInt(sHtml, 10);
                bNeedClear=false;
            }
            else
            {
                oInput.value=parseInt(oInput.value+sHtml, 10);
            }
            break;
    }
}

window.onload=function () {
    var aLi=$('.calculator').find('li');
    var i=0;

    for(i=0;i<aLi.length;i++)
    {
        aLi[i].onmousedown=doInput;
        aLi[i].onmouseover=function ()
        {
            this.className='active';
        };

        aLi[i].onmouseout=function ()
        {
            this.className='';
        };
    }

};
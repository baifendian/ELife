
var timeOut = function(){  //超时函数
    $("#lotteryBtn").rotate({
                            angle:0,
                            duration: 10000,
                            animateTo: 2160, //这里是设置请求超时后返回的角度，所以应该还是回到最原始的位置，2160是因为我要让它转6圈，就是360*6得来的
                            callback:function(){
                            alert('网络超时')
                            flag = true;
                            }
                            });
};
var rotateFunc = function(awards,angle,text){  //awards:奖项，angle:奖项对应的角度
    $('#lottery-star').stopRotate();
    $("#lottery-star").rotate({
                            angle:0,
                            duration: 5000,
                            animateTo: angle+1440, //angle是图片上各奖项对应的角度，1440是我要让指针旋转4圈。所以最后的结束的角度就是这样子^^
                            callback:function(){
                            
                            if(awards == '0')
                            {
                                falseiv()
                            }else{
                                showdiv(awards)
                            }
                            flag = true;
                            }
                            });
};


var flag = true;
var clickFunc = function(data){
    if(flag){
        flag = false;
        
        if(data==1){
            rotateFunc(1,360,'一等奖')
        }
        if(data==2){
            rotateFunc(2,60,'二等奖')
        }
        if(data==3){
            var angle = [120,240];
            angle = angle[Math.floor(Math.random()*angle.length)]
            rotateFunc(3,angle,'三等奖')
        }
        if(data==0){
            var angle = [180,300];
            angle = angle[Math.floor(Math.random()*angle.length)]
            rotateFunc(0,angle,'未中奖')
        }
    }
}

function showdiv(awards) {
    if(awards == '1')
    {
        document.getElementById("bg").style.display ="block";
        document.getElementById("showFist").style.display ="block";
    }else if(awards == '2')
    {
        document.getElementById("bg").style.display ="block";
        document.getElementById("showSecond").style.display ="block";
    }else if(awards == '3')
    {
        document.getElementById("bg").style.display ="block";
        document.getElementById("showThird").style.display ="block";
    }
    
}
function falseiv() {
    document.getElementById("bg").style.display ="block";
    document.getElementById("losePrize").style.display ="block";
}
function hidediv() {
    document.getElementById("bg").style.display ='none';
    document.getElementById("show").style.display ='none';
}

function hidediv1() {
    document.getElementById("bg").style.display ='none';
    document.getElementById("showFist").style.display ='none';
}
function hidediv2() {
    document.getElementById("bg").style.display ='none';
    document.getElementById("showSecond").style.display ='none';
}
function hidediv3() {
    document.getElementById("bg").style.display ='none';
    document.getElementById("showThird").style.display ='none';
}
function hidedloseiv() {
    document.getElementById("bg").style.display ='none';
    document.getElementById("losePrize").style.display ='none';
}



// 签到


//分享
function onShare(eventData){
    Cordova.exec( null, null ,  "ELifePlugin" ,  "share" , [eventData]);
}


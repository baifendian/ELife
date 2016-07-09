
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
    $('#lotteryBtn').stopRotate();
    $("#lotteryBtn").rotate({
                            angle:0,
                            duration: 5000,
                            animateTo: angle+1440, //angle是图片上各奖项对应的角度，1440是我要让指针旋转4圈。所以最后的结束的角度就是这样子^^
                            callback:function(){
                            
                            if(awards == '0')
                            {
                                falseiv()
                            }else{
                                showdiv()
                            }
                            flag = true;
                            }
                            });
};


var flag = true;
var clickFunc = function(data){
    if(flag){
        flag = false;
//    var time = [0,1];
//    time = time[Math.floor(Math.random()*time.length)];
//    if(time==0){
//        // timeOut(); //网络超时
//        var angle = [67,112,202,292,337];
//        angle = angle[Math.floor(Math.random()*angle.length)]
//        rotateFunc(0,angle,'很遗憾，这次您未抽中奖')
//    }
//    if(time==1){
       // var data = [1,2,3,0]; //返回的数组
        //data = data[Math.floor(Math.random()*data.length)];
        if(data==1){
            rotateFunc(1,157,'一等奖')
        }
        if(data==2){
            rotateFunc(2,247,'二等奖')
        }
        if(data==3){
            rotateFunc(3,22,'三等奖')
        }
        if(data==0){
            var angle = [67,112,202,292,337];
            angle = angle[Math.floor(Math.random()*angle.length)]
            rotateFunc(0,angle,'未中奖')
        }
//    }
    }
}

function showdiv() {
    document.getElementById("bg").style.display ="block";
    document.getElementById("show").style.display ="block";
}
function falseiv() {
    document.getElementById("bg").style.display ="block";
    document.getElementById("losePrize").style.display ="block";
}
function hidediv() {
    document.getElementById("bg").style.display ='none';
    document.getElementById("show").style.display ='none';
}
function hidedloseiv() {
    document.getElementById("bg").style.display ='none';
    document.getElementById("losePrize").style.display ='none';
}


// 签到
function checkInFunc(){
    
    Cordova.exec(successFunction, failFunction, "MyPluginName", "myMethod", ["回调方法"]);
}
function onShare(eventData){
	Cordova.exec( null, null ,  "ELifePlugin" ,  "share" , [eventData]);
}
function successFunction(){
    showSign()
}
function failFunction(){
    
}

function showSign(){
    document.getElementById("textSign").style.display ="block";
}


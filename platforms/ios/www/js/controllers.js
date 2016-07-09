angular.module('starter.controllers', [])

.constant('ApiEndpoint', {
  url: 'http://192.168.188.176:8000'
})

.controller('HomeCtrl', function($scope, $state, $ionicSlideBoxDelegate,$http,$ionicLoading, ApiEndpoint,LotteryInfo,ExchangeInfo) {
 
  // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('app.dash');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };
            
  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
  
  $scope.pageClick = function(index) {
    $scope.model.activeIndex = index;
  };
  
  $scope.cj_click = function(lotteryInfo) {
	LotteryInfo.setLotteryInfo(lotteryInfo); 
  };
  
   $scope.dh_click = function(exchangeInfo) {
	ExchangeInfo.setExchangeInfo(exchangeInfo); 
  };

   // Setup the loader
	  $ionicLoading.show({
	    content: 'Loading',
	    animation: 'fade-in',
	    showBackdrop: true,
	    maxWidth: 200,
	    showDelay: 0
	  });
  

	var url = ApiEndpoint.url + "/user_manage/get_first_page/";
        $http.get(url).success(function (data) {
		$ionicLoading.hide();
          //业务处理
		 var cj = data.lucky_draw_goods;
		 var dh = data.exchange_goods;
		 
		$scope.routette_image = data.routette_image;
		$scope.tital_image = data.tital_image;
		
		$scope.cj_items1 = cj[0];
		$scope.cj_items2 = cj[1];
		
		$scope.dh_items1 = dh[0];
		$scope.dh_items2 = dh[1];
		$scope.dh_items3 = dh[2];
		$scope.dh_items4 = dh[3];
		$scope.dh_items5 = dh[4];
		$scope.dh_items6 = dh[5];
		
    }).error(function (error) {
		$ionicLoading.hide();
        //业务处理
        alert("failed-----"+error);
    })
})

.controller('TurntableCtrl', function($scope, $state, $stateParams, $ionicModal, ApiEndpoint,$ionicLoading, $timeout,$ionicViewSwitcher,$http, $ionicHistory,Userinfo) {

            $scope.Turntable_click = function(){
            //转盘
            $scope.callTurntable();
            }
            
			// 登陆
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalLogin = modal;
    $scope.loginData = {};
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modalLogin.hide();
    $scope.loginData = {};
  };


  $scope.showMsg = function(txt) {
    $ionicLoading.show({
      template: txt
    });
    $timeout(function() {
      // $scope.popover.hide();
      $ionicLoading.hide();
    }, 1400);
  };          
            
  $scope.doLogin = function() {
    if (!$scope.loginData.username) {
      $scope.showMsg('用户名不能为空');
      return false;
    };
    if (!$scope.loginData.password) {
      $scope.showMsg('密码不能为空');
      return false;
    };
    $ionicLoading.show({
      template: "正在登录..."
    });

    var dataObj = {username: $scope.loginData.username,
      password: md5($scope.loginData.password)};

    Object.toparams = function ObjecttoParams(obj) 
    {
      var p = [];
      for (var key in obj) 
      {
        p.push(key + '=' + encodeURIComponent(obj[key]));
      }
      return p.join('&');
    };

    var req = 
    {
        method: 'POST',
        url: ApiEndpoint.url + '/user_manage/login/',
        data: Object.toparams(dataObj),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }

    $http(req).
    success(function(data, status, headers, config) 
    {
        //success
        $ionicLoading.hide();
        console.log(data.msg);     
        if(data.code == '0'){
          $scope.modalLogin.hide();  
          Userinfo.set(data.user);
          $scope.userInfo = data.user;
          $scope.flag = 1;
        }else {
          $scope.showMsg(data.msg);
        }       

    }).
    error(function(data, status, headers, config) 
    {
        //error
        console.log("failed-----"+error);
        $scope.closeLogin();
    });

  };
			
            $scope.callTurntable = function(){
            // Setup the loader
            $ionicLoading.show({
                               content: 'Loading',
                               animation: 'fade-in',
                               showBackdrop: true,
                               maxWidth: 200,
                               showDelay: 0
                               });
            
            var userInfo = Userinfo.get();
            if(userInfo.name != undefined){
            var dataObj = {username: userInfo.name};
            
            Object.toparams = function ObjecttoParams(obj){
            var p = [];
            for (var key in obj) {
            p.push(key + '=' + encodeURIComponent(obj[key]));
            }
            return p.join('&');
            };
            
            var req =
            {
            method: 'POST',
            url: ApiEndpoint.url + '/user_manage/routette/',
            data: Object.toparams(dataObj),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
            
            $http(req).success(function (data) {
                               $ionicLoading.hide();
                               
                               console.log(data)
                               clickFunc(0);
                               
                               }).error(function (error) {
                                        $ionicLoading.hide();
                                        alert("failed-----"+error);
                                        })
            }else{
            $ionicLoading.hide();
            $scope.modalLogin.show();
            }
            }
})
.controller('SignInCtrl', function($scope, $state, $ionicViewSwitcher, $ionicHistory,$http,$ionicLoading, ApiEndpoint, Userinfo) {

            $scope.click = checkin();
            
           var checkin = function checkInFunc(){
            
            Cordova.exec(successFunction, failFunction, "MyPluginName", "myMethod", ["回调方法"]);
            }
            
           var successss = function successFunction(){
            showuu()
            SignIn_click()
            
            }
            var faillll =  function failFunction(){
            
            }
            
            var showuu =  function showSign(){
            document.getElementById("textSign").style.display ="block";
            }
            

            var SignIn_click = function(){
                //抽奖
                $scope.callSignIn();
            }
            
            $scope.callSignIn = function(){
            
            var userInfo = Userinfo.get();
            
            var dataObj = {username: userInfo.name};
            
            Object.toparams = function ObjecttoParams(obj)
            {
            var p = [];
            for (var key in obj)
            {
            p.push(key + '=' + encodeURIComponent(obj[key]));
            }
            return p.join('&');
            };
            
            var req =
            {
            method: 'POST',
            url: ApiEndpoint.url + '/user_manage/sign_in/',
            data: Object.toparams(dataObj),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
            
            $http(req).
            success(function(data, status, headers, config) 
                    {
                    //success
                    console.log(data.msg);
                    alert('qiandao')
                    
                    }).
            error(function(data, status, headers, config) 
                  {
                  //error
                  console.log("failed-----"+error);
                  $scope.closeLogin();
                  });
            
            };
            
            
            
})
   
.controller('ExchangeRecordCtrl', function($scope, $state, $ionicViewSwitcher, $ionicHistory,$http,$ionicLoading, ApiEndpoint, Userinfo) {

    

    $scope.itmes = [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 } ];
            
})

.controller('ExchangeCtrl', function($scope, ApiEndpoint,$http,$ionicLoading, ApiEndpoint,ExchangeInfo) {

  
	$scope.dh_click = function(exchangeInfo) {
		ExchangeInfo.setExchangeInfo(exchangeInfo); 
	};
		$scope.groups = [];
	 
	  $ionicLoading.show({
	    content: 'Loading',
	    animation: 'fade-in',
	    showBackdrop: true,
	    maxWidth: 200,
	    showDelay: 0
	  });
	 
		var url = ApiEndpoint.url + "/user_manage/get_credit_exchange_goods";
        $http.get(url).success(function (data) {
		$ionicLoading.hide();
        
		$scope.items_old = data.credit_exchange_goods;
		
		$scope.item1 = $scope.items_old[0];
		$scope.item2 = $scope.items_old[1];
		
		var size = 0;
		if(($scope.items_old.length-2)%3 == 0){
			size = ($scope.items_old.length-2)/3;
		}else{
			size = ($scope.items_old.length-2)/3 +1;
		}
	 
		for (var i=0; i< size; i++) {
			$scope.groups[i] = {
				row: i,
				items1: [],
				items2: [],
				items3: []
			};
		var index1 = i*3 + 2;
		var index2 = i*3 + 3;
		var index3 = i*3 + 4;

		$scope.groups[i].items1.push($scope.items_old[index1]);
		$scope.groups[i].items2.push($scope.items_old[index2]);
		$scope.groups[i].items3.push($scope.items_old[index3]);
		}
		
    }).error(function (error) {
		$ionicLoading.hide();
        alert("failed-----"+error);
    })
})

.controller('LotteryCtrl', function($scope, $stateParams,$http,$ionicLoading, ApiEndpoint,LotteryInfo) {
  
  $scope.cj_click = function(lotteryInfo) {
	LotteryInfo.setLotteryInfo(lotteryInfo); 
  };

	 $scope.groups = [];
	 
	   $ionicLoading.show({
	    content: 'Loading',
	    animation: 'fade-in',
	    showBackdrop: true,
	    maxWidth: 200,
	    showDelay: 0
	  });
	 
	var url = ApiEndpoint.url + "/user_manage/get_credit_exchange_goods";
    $http.get(url).success(function (data) {
	$ionicLoading.hide();
        
	$scope.items_old = data.credit_exchange_goods;
		
	var size = 0;
	 if($scope.items_old.length%2 == 0){
		 size = $scope.items_old.length/2;
	 }else{
		 size = $scope.items_old.length/2 +1;
	 }
	 
  for (var i=0; i< size; i++) {
    $scope.groups[i] = {
      row: i,
      items1: [],
	  items2: [],
    };
	var index1 = i*2 + 0;
	var index2 = i*2 + 1;

    $scope.groups[i].items1.push($scope.items_old[index1]);
	$scope.groups[i].items2.push($scope.items_old[index2]);
  }
		
    }).error(function (error) {
		$ionicLoading.hide();
        alert("failed-----"+error);
    })
})

.controller('LotteryDetailCtrl', function($scope, $stateParams, $state, $ionicModal, $ionicHistory, $ionicViewSwitcher,$http,$ionicLoading, $timeout, ApiEndpoint,LotteryInfo, Userinfo) {
    $scope.backGo = function() {
        $ionicViewSwitcher.nextDirection('back'); // 'forward', 'back', etc.
        $ionicHistory.goBack();
    };
	$scope.lotteryInfo = LotteryInfo.getLotteryInfo();
	
	$scope.lottery_click = function(){
		//抽奖
		$scope.callLottery();
	}
	
	// 登陆
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalLogin = modal;
    $scope.loginData = {};
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modalLogin.hide();
    $scope.loginData = {};
  };


  $scope.showMsg = function(txt) {
    $ionicLoading.show({
      template: txt
    });
    $timeout(function() {
      // $scope.popover.hide();
      $ionicLoading.hide();
    }, 1400);
  };          
            
  $scope.doLogin = function() {
    if (!$scope.loginData.username) {
      $scope.showMsg('用户名不能为空');
      return false;
    };
    if (!$scope.loginData.password) {
      $scope.showMsg('密码不能为空');
      return false;
    };
    $ionicLoading.show({
      template: "正在登录..."
    });

    var dataObj = {username: $scope.loginData.username,
      password: md5($scope.loginData.password)};

    Object.toparams = function ObjecttoParams(obj) 
    {
      var p = [];
      for (var key in obj) 
      {
        p.push(key + '=' + encodeURIComponent(obj[key]));
      }
      return p.join('&');
    };

    var req = 
    {
        method: 'POST',
        url: ApiEndpoint.url + '/user_manage/login/',
        data: Object.toparams(dataObj),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }

    $http(req).
    success(function(data, status, headers, config) 
    {
        //success
        $ionicLoading.hide();
        console.log(data.msg);     
        if(data.code == '0'){
          $scope.modalLogin.hide();  
          Userinfo.set(data.user);
          $scope.userInfo = data.user;
          $scope.flag = 1;
        }else {
          $scope.showMsg(data.msg);
        }       

    }).
    error(function(data, status, headers, config) 
    {
        //error
        console.log("failed-----"+error);
        $scope.closeLogin();
    });

  };
  
  $scope.showMsg = function(txt) {
    $ionicLoading.show({
      template: txt
    });
    $timeout(function() {
      // $scope.popover.hide();
      $ionicLoading.hide();
    }, 1400);
  };     
	
	$scope.callLottery = function(){
		// Setup the loader
		$ionicLoading.show({
			content: 'Loading',
			animation: 'fade-in',
			showBackdrop: true,
			maxWidth: 200,
			showDelay: 0
		});
		
		var userInfo = Userinfo.get();
		if(userInfo.name != undefined){
			if(userInfo.credits < $scope.exchangeInfo.credit_exchange){
				$scope.showMsg("信币不足");
			}else{
				var dataObj = {username: userInfo.name,
				goodsid: $scope.lotteryInfo.goodsid};

			Object.toparams = function ObjecttoParams(obj){
				var p = [];
				for (var key in obj) {
					p.push(key + '=' + encodeURIComponent(obj[key]));
				}
				return p.join('&');
			};

			var req = 
			{
				method: 'POST',
				url: ApiEndpoint.url + '/user_manage/lucky_draw/',
				data: Object.toparams(dataObj),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}

			$http(req).success(function (data) {
				$ionicLoading.hide();
				
				$scope.showMsg("恭喜您中奖了");
			}).error(function (error) {
				$ionicLoading.hide();
				alert("failed-----"+error);
			})
			}
		}else{
			$ionicLoading.hide();
			$scope.modalLogin.show();
		}
	}
  	
})

.controller('ExchangeDetailCtrl', function($scope, $stateParams, $state, $ionicModal, $ionicHistory, $ionicViewSwitcher,$http,$ionicLoading, $timeout, ApiEndpoint,ExchangeInfo, Userinfo) {
    $scope.backGo = function() { 
        $ionicViewSwitcher.nextDirection('back'); // 'forward', 'back', etc.
        $ionicHistory.goBack();
    };
	$scope.exchangeInfo = ExchangeInfo.getExchangeInfo();	
	
	$scope.exchange_click = function(){
		//兑换
		$scope.callExchange();
	}
	
	$scope.e_add = function(){
		//e友加油
		onShare('');
	}
	
	// 登陆
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalLogin = modal;
    $scope.loginData = {};
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modalLogin.hide();
    $scope.loginData = {};
  };


  $scope.showMsg = function(txt) {
    $ionicLoading.show({
      template: txt
    });
    $timeout(function() {
      // $scope.popover.hide();
      $ionicLoading.hide();
    }, 1400);
  };          
            
  $scope.doLogin = function() {
    if (!$scope.loginData.username) {
      $scope.showMsg('用户名不能为空');
      return false;
    };
    if (!$scope.loginData.password) {
      $scope.showMsg('密码不能为空');
      return false;
    };
    $ionicLoading.show({
      template: "正在登录..."
    });

    var dataObj = {username: $scope.loginData.username,
      password: md5($scope.loginData.password)};

    Object.toparams = function ObjecttoParams(obj) 
    {
      var p = [];
      for (var key in obj) 
      {
        p.push(key + '=' + encodeURIComponent(obj[key]));
      }
      return p.join('&');
    };

    var req = 
    {
        method: 'POST',
        url: ApiEndpoint.url + '/user_manage/login/',
        data: Object.toparams(dataObj),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }

    $http(req).
    success(function(data, status, headers, config) 
    {
        //success
        $ionicLoading.hide();
        console.log(data.msg);     
        if(data.code == '0'){
          $scope.modalLogin.hide();  
          Userinfo.set(data.user);
          $scope.userInfo = data.user;
          $scope.flag = 1;
        }else {
          $scope.showMsg(data.msg);
        }       

    }).
    error(function(data, status, headers, config) 
    {
        //error
        console.log("failed-----"+error);
        $scope.closeLogin();
    });

  };
	
	  
  $scope.showMsg = function(txt) {
    $ionicLoading.show({
      template: txt
    });
    $timeout(function() {
      // $scope.popover.hide();
      $ionicLoading.hide();
    }, 1400);
  }; 
	
	$scope.callExchange = function(){
		// Setup the loader
		$ionicLoading.show({
			content: 'Loading',
			animation: 'fade-in',
			showBackdrop: true,
			maxWidth: 200,
			showDelay: 0
		});
  
		var userInfo = Userinfo.get();
		if(userInfo.name != undefined){
			if(userInfo.credits < $scope.exchangeInfo.credit_exchange){
				$scope.showMsg("信币不足");
			}else{
				var dataObj = {username: userInfo.name,
				goodsid: $scope.exchangeInfo.goodsid};

			Object.toparams = function ObjecttoParams(obj){
				var p = [];
				for (var key in obj) {
					p.push(key + '=' + encodeURIComponent(obj[key]));
				}
				return p.join('&');
			};

			var req = 
			{
				method: 'POST',
				url: ApiEndpoint.url + '/user_manage/credit_exchange/',
				data: Object.toparams(dataObj),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}

			$http(req).success(function (data) {
				$ionicLoading.hide();
			$scope.showMsg("恭喜您兑换成功");
			}).error(function (error) {
				$ionicLoading.hide();
				alert("failed-----"+error);
			})
			}
		}else{
			$ionicLoading.hide();
			 $scope.modalLogin.show();
			
		}
	}
})

.controller('AccountCtrl', function($ionicViewSwitcher, $state, $scope, $ionicModal, $http, ApiEndpoint, $ionicLoading, $ionicPopover, $timeout, Userinfo) {
	var userInfo = Userinfo.get();
	if(userInfo.name != undefined){
		$scope.flag = 1;
		$scope.userInfo = userInfo;
	}
  // 登陆
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalLogin = modal;
    $scope.loginData = {};
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modalLogin.hide();
    $scope.loginData = {};
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modalLogin.show();
  };

  $scope.showMsg = function(txt) {
    $ionicLoading.show({
      template: txt
    });
    $timeout(function() {
      // $scope.popover.hide();
      $ionicLoading.hide();
    }, 1400);
  };          

  $scope.doRefresh = function() {
    if ($scope.flag == 1) {
      var req = 
      {
          method: 'POST',
          url: ApiEndpoint.url + '/user_manage/get_user_information/',
          data: "username="+$scope.userInfo.name ,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }

      $http(req).
      success(function(data, status, headers, config) 
      {
          //success
          $scope.$broadcast("scroll.refreshComplete");
          console.log(data.msg);     
          if(data.code == '0'){
            Userinfo.set(data.user);
            $scope.userInfo = data.user;
          }else {
            $scope.showMsg(data.msg);
          }       

      }).
      error(function(data, status, headers, config) 
      {
          //error
          $scope.$broadcast("scroll.refreshComplete");
          console.log("failed-----"+error);
      });
    }else{
      $scope.$broadcast("scroll.refreshComplete");
    }
  };
            
  $scope.doLogin = function() {
    if (!$scope.loginData.username) {
      $scope.showMsg('用户名不能为空');
      return false;
    };
    if (!$scope.loginData.password) {
      $scope.showMsg('密码不能为空');
      return false;
    };
    $ionicLoading.show({
      template: "正在登录..."
    });

    var dataObj = {username: $scope.loginData.username,
      password: md5($scope.loginData.password)};

    Object.toparams = function ObjecttoParams(obj) 
    {
      var p = [];
      for (var key in obj) 
      {
        p.push(key + '=' + encodeURIComponent(obj[key]));
      }
      return p.join('&');
    };

    var req = 
    {
        method: 'POST',
        url: ApiEndpoint.url + '/user_manage/login/',
        data: Object.toparams(dataObj),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }

    $http(req).
    success(function(data, status, headers, config) 
    {
        //success
        $ionicLoading.hide();
        console.log(data.msg);     
        if(data.code == '0'){
          $scope.modalLogin.hide();  
          Userinfo.set(data.user);
          $scope.userInfo = data.user;
          $scope.flag = 1;
        }else {
          $scope.showMsg(data.msg);
        }       

    }).
    error(function(data, status, headers, config) 
    {
        //error
        console.log("failed-----"+error);
        $scope.closeLogin();
    });

  };

  $scope.logout = function(){
    $scope.loginData = {};
    $scope.flag = 0;
    var usr = {};
    $scope.userInfo = usr;
    Userinfo.set(usr);

  }

  $scope.goTo = function(listid) {
    if ($scope.flag != 1) {
      $scope.login();
      // alert('come in goto');
    } else {
      $ionicViewSwitcher.nextDirection('forward');
      switch (listid) {
        case 1:
          $state.go('sign-in');
          break;
        case 2:
          $state.go('exchange-record');
          break;
        default:
          break;
      }
    }
  };  
            
});



// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
  // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
  // for form inputs)
  if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    cordova.plugins.Keyboard.disableScroll(true);

  }
  if (window.StatusBar) {
    // org.apache.cordova.statusbar required
    StatusBar.styleDefault();
  }
});
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

  $ionicConfigProvider.platform.ios.tabs.style('standard'); 
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('bottom');

  $ionicConfigProvider.platform.ios.navBar.alignTitle('center'); 
  $ionicConfigProvider.platform.android.navBar.alignTitle('center');

  $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
  $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');        

  $ionicConfigProvider.platform.ios.views.transition('ios'); 
  $ionicConfigProvider.platform.android.views.transition('android');

// Ionic uses AngularUI Router which uses the concept of states
// Learn more here: https://github.com/angular-ui/ui-router
// Set up the various states which the app can be in.
// Each state's controller can be found in controllers.js
$stateProvider

// setup an abstract state for the tabs directive
.state('tab', {
  url: '/tab',
  abstract: true,
  templateUrl: 'templates/tabs.html'
})

// Each tab has its own nav history stack:

.state('tab.home', {
  url: '/home',
  views: {
    'tab-home': {
      templateUrl: 'templates/tab-home.html',
      controller: 'HomeCtrl'
    }
  }
})
.state('tab.exchange', {
 url: '/exchange',
 views: {
   'tab-exchange': {
     templateUrl: 'templates/tab-exchange.html',
     controller: 'ExchangeCtrl'
   }
 }
})
.state('tab.lottery', {
 url: '/lottery',
 views: {
   'tab-lottery': {
     templateUrl: 'templates/tab-lottery.html',
     controller: 'LotteryCtrl'
   }
 }
})
.state('tab.account', {
	cache:'false',
 url: '/account',
 views: {
   'tab-account': {
     templateUrl: 'templates/tab-account.html',
     controller: 'AccountCtrl'
   }
 }
})

.state('lottery-turntable', {
 url: '/turntable',
 templateUrl: 'templates/lottery-turntable.html',
 controller: 'TurntableCtrl'      
})
.state('exchange-detail', {
cache:'false',
 url: '/exchange-detail',
 templateUrl: 'templates/exchange-detail.html',
 controller: 'ExchangeDetailCtrl' 
})  
.state('lottery-detail', {
	cache:'false',
 url: '/lottery-detail',
 templateUrl: 'templates/lottery-detail.html',
 controller: 'LotteryDetailCtrl'       
})
.state('sign-in', {
               cache:'false',
               url: '/sign-in',
               templateUrl: 'templates/sign-in.html',
               controller: 'SignInCtrl'
})
.state('about', {
       cache:'false',
 url: '/about',
 templateUrl: 'templates/about.html',
})
.state('exchange-record', {
	 cache:'false',
 url: '/exchange-record',
 templateUrl: 'templates/exchange-record.html',
 controller: 'ExchangeRecordCtrl'
})
.state('guess-you-like', {
	cache:'false',
 url: '/guess-you-like',
 templateUrl: 'templates/guess-you-like.html',
 controller: 'GuessYouLikeCtrl'
})



// if none of the above states are matched, use this as the fallback
$urlRouterProvider.otherwise('/tab/home');

});

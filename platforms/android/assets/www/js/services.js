angular.module('starter.services', [])

.factory('Userinfo', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var userinfo = {};

  return {
    set: function(usrinfo) {
      userinfo = usrinfo;
    },
    get: function() {
      return userinfo;
    }
  };
})

.factory('LotteryInfo', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var lotteryInfo = {};
  
  return {
    all: function() {
      return lotteryInfo;
    },
	
	setLotteryInfo: function(m_lotteryInfo){
		lotteryInfo = {};
		lotteryInfo = m_lotteryInfo;
	},
	
	getLotteryInfo: function(){
	  return lotteryInfo;
	}
  };
})

.factory('ExchangeInfo', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var exchangeInfo = {};
  
  return {
    all: function() {
      return exchangeInfo;
    },
	
	setExchangeInfo: function(m_exchangeInfo){
		exchangeInfo = {};
		exchangeInfo = m_exchangeInfo;
	},
	
	getExchangeInfo: function(){
	  return exchangeInfo;
	}
  };
});

// Based on AngularJS 1.5
/*
 * 在when处添加路由，如make路由
 */
var FanLiPCApp = angular.module('FanLiPCApp', ['ngRoute']);

FanLiPCApp.config(['$routeProvider',function($routeProvider) {
	$routeProvider.
	when('/admin/login', {
		templateUrl: 'admin/login.html'
	}).
	when('/admin/MakeView', {
			templateUrl: 'admin/make/MakeView.html'
		}).
	otherwise({
		redirectTo: '/admin/login'
	});
	
}]);

// save a handle to the $rootScope obj
var rootScope;

FanLiPCApp.run(['$rootScope', function ($rootScope) {
	rootScope = $rootScope;
}]);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function goto_view(v) {
  	var baseUrl = window.location.href;
	baseUrl = (baseUrl.indexOf('#') > 0 ? baseUrl.substr(0, baseUrl.indexOf('#')) : baseUrl);
	window.location.href = baseUrl + "#/" + v;
}
 
var apiconn = new APIConnection();
var upload_path="http://www.ysbiaoju.com/cgi-bin/upload.pl";
var download_path="http://www.ysbiaoju.com/cgi-bin/download.pl?fid=";

apiconn.client_info.clienttype = "web";

apiconn.state_changed_handler = function() {
	console.log("state: "+apiconn.from_state+" => "+apiconn.conn_state);
    apiconn.connect();
};

apiconn.response_received_handler = function(jo) {
	rootScope.$apply(function() {
		rootScope.$broadcast("RESPONSE_RECEIVED_HANDLER", jo);
	});

};

apiconn.wsUri = "ws://114.215.241.76:51717/dafengshou";
apiconn.connect();
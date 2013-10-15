/************************************
 *
 * Auth Service - AngularJS
 *
 * @author Gonzalo Alvarez
 *
************************************/

app.service('AuthService', ['$localStorage', '$q', '$http' , function($localStorage, $q, $http){
	var authService = this;
	authService.authToken = null;
	authService.storage = $localStorage;
	if(authService.storage.authService == null)
		authService.storage.authService = {};
	authService.storage = authService.storage.authService;
	
	authService.login = function(username, password) {
		authService.authToken = 'Basic ' + CryptoJS.enc.Utf8.parse(username + ':' + CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64)).toString(CryptoJS.enc.Base64);
		return authService.isAuthenticated();
	};
	
	authService.isAuthenticated = function() {
		var deferred = $q.defer();
		
		$http({method: 'GET', 
			url: BASE_URL + '/auth', 
			headers: {Authorization: authService.authToken}}).
			success(function(data, status, headers, config){
				authService.storage.authToken = authService.authToken;
				deferred.resolve();
			}).
			error(function(data, status, headers, config){
				authService.authToken = null;
				deferred(status);
			});
		
		return deferred.promise;
	};
	
	authService.getAuthToken = function() {
		if(authService.storage.authToken != null) {
			authService.authToken = authService.storage.authToken;
		}
		return authService.authToken;
	};
	
	authService.logout = function() {
		authService.authToken = null;
		delete authService.storage.authToken;
	}
}]);

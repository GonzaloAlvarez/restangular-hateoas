/************************************
 *
 * Main Angular configuration file
 *
 * @author Gonzalo Alvarez
 *
************************************/

var BASE_URL = 'http://localhost:8090/spring-rest-bootstrap/api';

var app = angular.module('app', ['restangular']).config(function(RestangularProvider, $httpProvider) {
	RestangularProvider.setBaseUrl(BASE_URL);

	RestangularProvider.setResponseExtractor(function(data, operation, route, url, response, deferred) {
		var retData = data;
		if(operation == 'getList') {
			if('content' in data)
				retData = data.content;
			if('page' in data)
				retData.page = data.page;
		}
		return retData;
	});

	RestangularProvider.setOnElemRestangularized(function(elem, isCollection, what, Restangular){
		if(!isCollection) {
			if('links' in elem) {
				elem.href = elem.links[0].href;
				delete elem.links;
			}
		}
		console.log(elem);
		return elem;
	}); 
});

/************************************
 *
 * Main Angular configuration file
 *
 * @author Gonzalo Alvarez
 *
************************************/

var BASE_URL = 'http://localhost:8090/spring-rest-bootstrap/api';
var CONTENT_TAG = 'content';
var HREF_TAG = 'href';
var LINKS_TAG = 'links';
var GETLIST_OP = 'getList';

var app = angular.module('app', ['restangular']).config(function(RestangularProvider, $httpProvider) {
	
	RestangularProvider.setBaseUrl(BASE_URL);

	RestangularProvider.setResponseExtractor(function(data, operation, route, url, response, deferred) {
		var returnData = data;
		if(operation == GETLIST_OP && CONTENT_TAG in data) {
			for(var i = 0; i < data[CONTENT_TAG].length; i++) {
				data[CONTENT_TAG][i][HREF_TAG] = data[CONTENT_TAG][i][LINKS_TAG][0][HREF_TAG];
				delete data[CONTENT_TAG][i][LINKS_TAG];
			}
			returnData = data[CONTENT_TAG];
			delete data[CONTENT_TAG];
			for(var key in data) {
				returnData[key] = data[key];
			}
		}
		return returnData;
	});
});

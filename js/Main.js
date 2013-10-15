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

var app = angular.module('app', ['restangular', 'ngStorage', 'ui.bootstrap']);

app.directive('focusOn', function() {
	return function(scope, elem, attr) {
		scope.$on('focusOn', function(e, name) {
			if (name === attr.focusOn) {
				elem[0].focus();
			}
		});
	};
});

app.factory('focus', function($rootScope, $timeout) {
	return function(name) {
		$timeout(function() {
			$rootScope.$broadcast('focusOn', name);
		});
	}
});

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});
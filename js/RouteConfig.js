app.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when("/", {templateUrl: 'pages/login.html', controller: 'AuthController'})
		.when("/books", {templateUrl: 'pages/books.html', controller: 'BooksController'})
		.otherwise({redirectTo: '/'});
}]);
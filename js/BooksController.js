/************************************
 *
 * Books Controller - AngularJS
 *
 * @author Gonzalo Alvarez
 *
************************************/

app.controller('BooksController', ['$scope', 'AuthRestangular', '$location', 'focus', 
function($scope, Restangular, $location, focus) {
	
	var booksController = $scope.booksController = {};
	
	booksController.all = Restangular.all('books');
	booksController.currentPage = 0;
	booksController.pages = 0;
	booksController.current = {};
	booksController.location = $location;
	booksController.pageSize = 5;
	
	booksController.refresh = function() {
		booksController.all.getList({"size": booksController.pageSize, "page":booksController.currentPage, "sort":"id,desc"}).then(function(books) {
			$scope.books = books;
			booksController.pages = books.page.totalPages;
		}, function(error) {
			booksController.location.path('/');
		});
	};
	
	booksController.nextPage = function() {
		if(booksController.currentPage + 1 < booksController.pages) {
			booksController.currentPage = booksController.currentPage + 1;
			booksController.refresh();
		}
	};
	
	booksController.previousPage = function() {
		if(booksController.currentPage > 0) {
			booksController.currentPage = booksController.currentPage - 1;
			booksController.refresh();
		}
	};
	
	booksController.save = function() {
		booksController.pageSize = 5;
		if('route' in booksController.current) {
			booksController.current.put().then(function(result){
				booksController.current = {};
				booksController.refresh();
			});
		} else {
			booksController.all.post(booksController.current).then(function(result){
				booksController.current = {};
				booksController.refresh();
			});
		}
	};
	
	booksController.newBook = function() {
		booksController.currentPage = 0;
		booksController.pageSize = 4;
		booksController.refresh();
		booksController.current.name = '';
		focus('startEdit');
	};
	
	booksController.cancel = function() {
		booksController.pageSize = 5;
		booksController.current = {};
		booksController.refresh();
	};
	
	booksController.edit = function(book, event) {
		booksController.current = book;
		focus('startEdit');
	};
	
	booksController.remove = function(book) {
		book.remove().then(function(result){
			booksController.refresh();
		});
	};

	booksController.refresh();
}]);
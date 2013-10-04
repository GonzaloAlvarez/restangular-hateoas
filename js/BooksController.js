/************************************
 *
 * Books Controller - AngularJS
 *
 * @author Gonzalo Alvarez
 *
************************************/

app.controller('BooksController', function($scope, Restangular) {
	
	var booksController = $scope.booksController = {};
	
	booksController.all = Restangular.all('books');
	booksController.currentPage = 0;
	booksController.pages = 0;
	booksController.current = {};
	
	booksController.refresh = function() {
		booksController.all.getList({"size":"5", "page":booksController.currentPage}).then(function(books) {
			$scope.books = books;
			booksController.pages = books.page.totalPages;
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
	
	booksController.edit = function(book) {
		booksController.current = book;
	};
	
	booksController.remove = function(book) {
		book.remove().then(function(result){
			booksController.refresh();
		});
	};
	
	booksController.refresh();
});
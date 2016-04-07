app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$stateProvider.
			state('/', {
				url: '/',
				templateUrl: 'js/ng/app/product/views/index.html',
				controller: 'product_ctrl'
			})
			.state('/category', {
				url: '/category',
				templateUrl: 'js/ng/app/category/views/index.html',
				controller: 'category_ctrl'
			})
		;
		$urlRouterProvider.otherwise('/');
	}
]);
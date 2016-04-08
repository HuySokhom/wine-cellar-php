app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$stateProvider.
			// route for product
			state('/', {
				url: '/',
				templateUrl: 'js/ng/app/product/views/index.html',
				controller: 'product_ctrl'
			})
			.state('/product/create', {
				url: '/product/create',
				templateUrl: 'js/ng/app/product/views/create.html',
				controller: 'product_create_ctrl'
			})
			.state('/product/edit', {
				url: '/product/edit/:id',
				templateUrl: 'js/ng/app/product/views/edit.html',
				controller: 'product_edit_ctrl'
			})

			// route for category
			.state('/category', {
				url: '/category',
				templateUrl: 'js/ng/app/category/views/index.html',
				controller: 'category_ctrl'
			})
			.state('/create', {
				url: '/category/create',
				templateUrl: 'js/ng/app/category/views/create.html',
				controller: 'create_ctrl'
			})
			.state('/edit', {
				url: '/category/edit/:id',
				templateUrl: 'js/ng/app/category/views/edit.html',
				controller: 'edit_ctrl'
			})
		;
		$urlRouterProvider.otherwise('/');
	}
]);
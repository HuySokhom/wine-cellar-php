app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$stateProvider.
			state('/', {
				url: '/',
				templateUrl: 'js/ng/app/index/partial/index.html',
				controller: 'index_ctrl'
			})
			.state('/category', {
				url: '/category',
				templateUrl: 'js/ng/category/view/index.html',
				controller: 'category_ctrl'
			})
		;
		$urlRouterProvider.otherwise('/');
	}
]);
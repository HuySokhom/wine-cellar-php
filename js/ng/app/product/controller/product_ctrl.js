app.controller(
	'product_ctrl', [
	'$scope'
	, 'Restful'
	, function ($scope, Restful){
		'use strict';
		var url = 'api/product/getProduct';
		$scope.init = function(params){
			Restful.get(url, params).success(function(data){
				$scope.products = data;console.log(data);
			});
		};
		$scope.init();
		$scope.remove = function(id){
			if (confirm('Are you sure you want to this product?')) {
				Restful.delete('api/product/deleteProduct/' + id).success(function(data){
					$scope.init();
					console.log(data);
				})
				.error(function (data, status, header, config) {
					console.log(data);
				});
			}
		};
	}
]);
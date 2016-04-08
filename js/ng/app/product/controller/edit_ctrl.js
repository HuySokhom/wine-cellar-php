app.controller(
	'product_edit_ctrl', [
	'$scope'
	, 'Restful'
	, '$stateParams'
	, '$location'
	, function ($scope, Restful, $stateParams, $location){
		'use strict';

		var url = 'api/product/getProduct/' + $stateParams.id;

		$scope.init = function(){
			Restful.get( url ).success(function (data) {
				console.log(data);
				$scope.product = data;
			});
		};
		$scope.init();
		$scope.save = function(){
			var data = {
				name: $scope.product.name,
				category_id: $scope.product.category_id,
				price: $scope.product.price,
				qty: $scope.product.qty,
				description: $scope.product.description
			};
			console.log(data);
			Restful.put( url , data).success(function (data) {
				console.log(data);
				$location.path('/');
			});

		};
	}
]);
app.controller(
	'product_create_ctrl', [
	'$scope'
	, 'Restful'
	, '$location'
	, function ($scope, Restful, $location){
		'use strict';
		var url = 'api/product/saveProduct';

		$scope.initCategory = function(){
			Restful.get( url ).success(function (data) {
				console.log(data);
				$scope.product = data;
			});
		};
		$scope.initCategory();
		$scope.save = function(){
			var data = {
				name: $scope.name,
				description: $scope.description,
				category_id: $scope.category_id,
				price: $scope.price,
				qty: $scope.qty,
			};
			console.log(data);
			Restful.save( url , data).success(function (data) {
				console.log(data);
				$location.path('/');
			});

		};

	}
]);
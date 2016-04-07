app.controller(
	'product_create_ctrl', [
	'$scope'
	, 'Restful'
	, '$location'
	, function ($scope, Restful, $location){
		'use strict';
		var url = 'api/product/saveProduct';

		$scope.save = function(){
			var data = {
				name: $scope.name,
				description: $scope.description
			};
			Restful.save( url , data).success(function (data) {
				console.log(data);
				$location.path('/');
			});

		};

	}
]);
( function() {
	var app = angular.module('formCurrency', []);
	/**
		Form Currency Component
	*/
	app.directive("formCurrency", function() {
		return {
			restrict: 'E',
			templateUrl: "form.html",
			controller: function() {
				/* Controller scope */
			},
			controllerAs: "currency"
		}
	});

})();

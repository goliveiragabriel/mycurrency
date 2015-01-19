( function() {
	var app = angular.module("MyCurrency", ['formCurrency']);

	app.controller('CurrencyController', ['$scope', '$http', function($scope, $http) {
		$scope.alerts = [];
		var euro = { _currency : 'EUR', _rate: 1}; //Default currency
		$scope.submit = function() {
			$scope.alerts = [];
			var req = {
				method: 'GET',
				dataType: 'xml',
				'Access-Control-Allow-Origin': '*',
				transformResponse: function (data) {
					// Third party library to parse xml into json
		      var x2js = new X2JS();
		      var json = x2js.xml_str2json(data);
		      return json;
		    },

			}
			// Cross-domain issue ( Status Code 501 ) in real path: https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml 
			//  Please, change the requested url in production environment
			$http.get("https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml", req)
				.success(function(data) {
					var firstCurrency, secondCurrency;
					$.map(data.Envelope.Cube.Cube.Cube, function(val, i) {
						if ( val._currency === $("select[for='firstCurrency']").val() ) {
							firstCurrency = val;
						}
						if ( val._currency ===  $("select[for='secondCurrency']").val() ) {
							secondCurrency = val;
						}
					});
					firstCurrency = firstCurrency || euro;
					secondCurrency = secondCurrency || euro;
					// Push alert into array
					$scope.alerts.push({type: "success", message: calculateRate(firstCurrency,secondCurrency), show: true });
				});
				// Anonymous function to calculate currencies rate
				var calculateRate = function(firstCurrency, secondCurrency) {
					return "1 " + firstCurrency._currency + " = " + ((secondCurrency._rate)/(firstCurrency._rate)).toFixed(3) + " " + secondCurrency._currency;
				}
		};

	}]);

})();

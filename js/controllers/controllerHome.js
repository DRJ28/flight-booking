var flightApp = angular.module('flightApp');

/* home controller */
flightApp.controller('bcHomeCtrl', ['$scope', '$location', '$http', '$rootScope', 'flightList', '$filter', function ($scope, $location, $http, $rootScope, flightList, $filter) {
	$scope.oneway = true;
	$scope.personno = "Passengers";
	$scope.showCityList = false;
	$scope.showPopupOrigin = false;
	$scope.showPopupDest = false;
	$scope.invalidOrigin = false;
	$scope.invalidDest = false;
	$scope.invalidPassSelect = false;
	$scope.invalidDepDate = false;
	$scope.invalidReturnDate = false;
	$scope.showFlightNotification = false;
	$scope.returnFlight = false;
	$scope.cityList = ["Mumbai", "Pune", "Banglore", "Delhi", "Chennai", "Kolkata"];
	$scope.sliderVal = 20000;
	$scope.fromFlight = '';

	/* retireving flight details from flight list json using flightList custom service*/
	flightList.list(function(flightData) {
  		$scope.flight = flightData;
    });

	/*function to add selected flight from radio button*/
	$scope.selectFlight = function(index){
		var arr = angular.element('.submit-radio');
		for(var i = 0; i<arr.length;i++){
			if ($(arr[i]).hasClass('submit-radio-active')) {
				$(arr[i]).removeClass('submit-radio-active');
				$(arr[i]).addClass('submit-radio-inactive');
			}
		}
		$(angular.element('.submit-radio')[index]).removeClass('submit-radio-inactive');
		$(angular.element('.submit-radio')[index]).addClass('submit-radio-active');
		$scope.fromFlight  = $scope.filteredVal.oneWay[index];
		console.log($scope.fromFlight);
	}
	$scope.selectReturnFlight = function(index){
		var arr = angular.element('.submit-radio-return');
		for(var i = 0; i<arr.length;i++){
			if ($(arr[i]).hasClass('submit-active')) {
				$(arr[i]).removeClass('submit-active');
				$(arr[i]).addClass('submit-inactive');
			}
		}
		$(angular.element('.submit-radio-return')[index]).removeClass('submit-inactive');
		$(angular.element('.submit-radio-return')[index]).addClass('submit-active');
		$scope.toFlight  = $scope.filteredVal.twoWay[index];
		console.log($scope.fromFlight);
	}
	
	/* function to validate selected origin city from city list json */
	$scope.validateOriginCity = function() {
		var keepGoing = true;
		angular.forEach($scope.cityList, function(obj) {
			if(keepGoing) {
				if (obj === $scope.origin) {
					$scope.invalidOrigin = false;
					keepGoing = false;
				} else {
					$scope.invalidOrigin = true;
				}
			}

		});
	}

	/* function to validate selected destination city from city list json, alogn with to select different city from origin city */
	$scope.validateDestCity = function() {
		var keepGoing = true;
		angular.forEach($scope.cityList, function(obj) {
			if(keepGoing) {
				if (obj === $scope.destination) {
					$scope.invalidDest = false;
					if ($scope.origin === $scope.destination) {
						$scope.errorMessage = 'Error: Enter different destination';
						$scope.invalidDest = true;
					} else {
						$scope.invalidDest = false;
					}
					keepGoing = false;
				} else {
					$scope.invalidDest = true;
					$scope.errorMessage = 'Error: Please Enter destination city';
				}
			}

		});
	}

	/* function to validate number passengers is selected or not ? */
	$scope.validatePassSelect = function() {
		if ($scope.personno === 'Passengers') {
			$scope.invalidPassSelect = true;
		} else {
			$scope.invalidPassSelect = false;
		}
	}

	/* function to validate depart date */
	$scope.validateDepartDate = function() {
		if (typeof $scope.departDate === 'undefined' || $scope.departDate === null) {
			$scope.invalidDepDate = true;
		} else {
			$scope.invalidDepDate = false;
		}
	}

	/* function to validate return date */
	$scope.validateReturnDate = function() {
		if (typeof $scope.returnDate === 'undefined' || $scope.returnDate === null) {
			$scope.invalidReturnDate = true;
			$scope.dateErrorMessage = 'Error: Please Enter return date';
		} else {
			$scope.validateTwoDate();
			$scope.invalidReturnDate = false;
		}
	}

	/* function to validate return date and depart date*/
	$scope.validateTwoDate = function() {

		var depDate = $scope.departDate  || '';
		depDate = depDate.replace( /(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3");
		var retDate = $scope.returnDate  || '';
		retDate = retDate.replace( /(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3");
		if (new Date(depDate) > new Date(retDate)) {
			$scope.invalidReturnDate = true;
			$scope.dateErrorMessage = 'Error: Return date should be future date';
		} else {
			$scope.invalidReturnDate = false;
		}
	}

	/* function to submir form data before validating each field */
	$scope.submitForm = function() {
		$scope.validateOriginCity();
		$scope.validateDestCity();
		$scope.validatePassSelect();
		$scope.validateDepartDate();
		if (!$scope.oneway) {
			$scope.validateReturnDate();
		}		

		if (!$scope.invalidOrigin && !$scope.invalidDest && !$scope.invalidPassSelect && !$scope.invalidDepDate && !$scope.invalidReturnDate) {
			$scope.filteredVal = $filter('cityFilter')($scope.origin, $scope.destination, $scope.departDate, $scope.sliderVal, $scope.returnDate, $scope.flight.flightinfo);
	      	$scope.showCityList = true;
	      	if ($scope.filteredVal.oneWay.length > 0) {
	      		$scope.showFlightNotification = false;
	      		//$scope.fromFlight  = $scope.filteredVal.oneWay[0];
	      	} else {
	      		$scope.showFlightNotification = true;
	      	}
	      	if ($scope.filteredVal.twoWay.lenght > 0 ) {
	      		$scope.returnFlight = true;
	      	}else{
	      		$scope.returnFlight = false;
	      	}
		} else {
			return;
		}
		
	};

	
	/* custom switch to select one way or round trip */
	$scope.switch = function() {
		$scope.oneway = !$scope.oneway;
	}

	/* function to show auto suggest popup for origin city */
	$scope.showPopupListOrigin = function() {
		$scope.showPopupOrigin = true;
	}
	/* function to set origin city from auto suggest popup */
	$scope.setSelectedModelOrigin = function(city) {
		$scope.origin = city ;
		$scope.validateOriginCity();
		$scope.showPopupOrigin = false;
	}

	/* function to show auto suggest popup for destination city */
	$scope.showPopupListDest = function() {
		$scope.showPopupDest = true;
	}
	/* function to set destination city from auto suggest popup */
	$scope.setSelectedModelDest = function(city) {
		$scope.destination = city ;
		$scope.validateDestCity();
		$scope.showPopupDest = false;
	}

	$scope.hidePopupList = function(e) {
		// to do for hiding popup
	}
	
	$scope.updateRange = function() {
		// to do task for range change
	}
}]);

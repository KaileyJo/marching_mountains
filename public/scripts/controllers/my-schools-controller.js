myApp.controller('MySchoolsController', ['$scope', '$mdDialog', '$mdMedia',
'SchoolsFactory', 'InstrumentsFactory', 'DonationsFactory', function($scope,
	$mdDialog, $mdMedia, SchoolsFactory, InstrumentsFactory, DonationsFactory, AddSchoolController) {

	$scope.schools = [];
	$scope.test = 'test';
	$scope.donations = [];

	var getInstruments = function() {
		InstrumentsFactory.factoryGetInstrumentsList().then(function() {});
	};

	var getStates = function() {
		InstrumentsFactory.getStates().then(function() {});
	};


	var getSchools = function () {
		SchoolsFactory.getDirectorSchools().then(function() {
			$scope.schools = SchoolsFactory.allSchools;
			console.log('school list: ', $scope.schools);
			buildDonations();
			console.log('donations array: ', $scope.donations);
		});
	};

	var buildDonations = function () {
		for(var i = 0; i < $scope.schools.list.length; i++) {
			for(var j = 0; j < $scope.schools.list[i].donations.length; j++) {
				$scope.donations.push({
					// school_id: $scope.schools.list[i].school_id,
					school_name: $scope.schools.list[i].school_name,
					instrument_name: $scope.schools.list[i].donations[j].instrument,
					date: $scope.schools.list[i].donations[j].date,
					donation_id: $scope.schools.list[i].donations[j].donation_id,
					donation_received: $scope.schools.list[i].donations[j].donation_received,
					donor_email: $scope.schools.list[i].donations[j].user_email
				});
			}
		}
	};

	$scope.addSchool = function(ev) {
		SchoolsFactory.currentSchool = {};
		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
		$mdDialog.show({
			templateUrl: '../views/modals/add-school.html',
			controller: 'AddSchoolController',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose: true,
			fullscreen: useFullScreen
		});
	};

	$scope.editSchool = function(ev, school) {
		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
		$mdDialog.show({
			templateUrl: '../views/modals/add-school.html',
			controller: 'AddSchoolController',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose: true,
			fullscreen: useFullScreen
		});
		SchoolsFactory.currentSchool = school;
	};

	$scope.donationReceived = function(ev, donation) {
		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
		$mdDialog.show({
			templateUrl: '../views/modals/donate-received-modal.html',
			controller: 'DonationReceivedController',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose: true,
			fullscreen: useFullScreen
		});
		DonationsFactory.currentDonation = donation;
	};

	getSchools();
	getInstruments();
	getStates();
}]);

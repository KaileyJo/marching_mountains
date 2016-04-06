myApp.controller('SchoolInfoController', ['$scope', '$http', '$location', '$mdDialog',
  '$mdMedia', 'SchoolsFactory', 'DonationsFactory', function($scope, $http, $location,
    $mdDialog, $mdMedia, SchoolsFactory, DonationsFactory, DonateNowController, tel) {

  $scope.SchoolsFactory = SchoolsFactory;
  $scope.DonationsFactory = DonationsFactory;

  $scope.selectedSchoolInfo = $scope.SchoolsFactory.selectedSchoolInfo.list;
  if($scope.selectedSchoolInfo !== undefined) {
    $scope.DonationsFactory.factoryGetSelectedSchoolDonations($scope.selectedSchoolInfo.school_id).then(function() {
      $scope.selectedSchoolDonations = $scope.DonationsFactory.selectedSchoolDonations.list;
    });
  } else {
    $location.url('/home');
  }

  $scope.returnToSearchResults = function() {
    $location.url('/donors');
  };

  $scope.donateNowModal = function(ev) {

    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;

    $mdDialog.show({
      templateUrl: '../views/modals/donate-now-modal.html',
      controller: 'DonateNowController',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen,
    });
  };
}]);

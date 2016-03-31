myApp.controller('ModalController', ['$scope', '$mdDialog', '$mdMedia', 'UserService',
    function($scope, $mdDialog, $mdMedia, UserService, LoginController) {
        console.log('inside Modal Controller');

        $scope.UserService = UserService;

        $scope.openModal = function(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;

            $mdDialog.show({
                templateUrl: '../views/templates/login.html',
                controller: 'LoginController',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: useFullScreen
            });
        }
    }]);
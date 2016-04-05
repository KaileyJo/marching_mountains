myApp.factory('UserService', ['$http', '$window', '$localStorage', '$sessionStorage', '$q', function($http, $window, $localStorage, $sessionStorage, $q) {

    var allUsers = {};

    var CurrentUser = {
        isLogged: false,
        factoryUserName: undefined,
        factoryFirstName: undefined,
        factoryUserId: undefined
    };

    function returnCurrentUser() {
        return CurrentUser;
    }

    function login(user) {
        var promise = $http.post('/', user).then(function (response) {
            if (response.data === false) {
                console.log("Incorrect email/password");
                return response.data;
            } else {
                console.log("inside correct login", response.data);
                CurrentUser = {
                    isLogged: true,
                    factoryUserName: response.data.email,
                    factoryFirstName: response.data.first_name,
                    factoryUserId: response.data.user_id
                };
                persistSession();
                return response.data;
            }
            console.log("CurrentUser inside Login:", CurrentUser);
        });
        return promise;
    }

    function register(user) {
        console.log(user);
        var promise = $http.post('/register', user).then(function (response) {
            CurrentUser = {
                isLogged: true,
                factoryUserName: response.data.email,
                factoryFirstName: response.data.first_name,
                factoryUserId: response.data.user_id
            };
            persistSession();
        });
        return promise;
    }

    function logOut() {
        CurrentUser = {
            isLogged: false,
            factoryUserName: undefined,
            factoryFirstName: undefined,
            factoryUserId: undefined
        };
        delete $localStorage.CurrentUser;
        $window.location.href = '/#/home';
    }

    function persistSession() {
        $localStorage.CurrentUser = CurrentUser;
    }

    function restoreSession() {
        if($localStorage.CurrentUser != undefined) {
            CurrentUser = $localStorage.CurrentUser;
        }
    }

    var factoryGetAllUsers = function() {
        var promise = $http.get('/user/admin').then(function(response) {
            allUsers.list = response.data;
        });
        return promise;
    };

    restoreSession();

    var publicFunctions = {
        askForCurrentUser: function() {
            return CurrentUser;
        },
        postLogin: function (user) {
            return login(user);
        },
        postRegister: function(user) {
            return register(user);
        },
        logOutUser: function() {
            return logOut();
        },
        getUser: function() {
            return getUserData();
        },
        getAllUsers: function() {
            return factoryGetAllUsers();
        },
        allUsers: allUsers,
        watchCurrentUser: returnCurrentUser

    };

    return publicFunctions;
}]);
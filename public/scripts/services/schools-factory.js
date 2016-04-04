myApp.factory('SchoolsFactory', ['$http', function($http) {

    var userID = 5;

    var factorySchoolsList = {};
    var schoolSearchResults = {};
    var selectedInstrumentName = {};
    var selectedSchoolInfo = {};
    var allSchools = {};

    var getSchoolList = function(name, id) {
        var promise = $http.get('/schools/instruments/' + id).then(function(response) {
            schoolSearchResults.list = response.data;
            selectedInstrumentName.list = name;
        });
        return promise;
    };

    var setSelectedSchoolInfo = function(school) {
        selectedSchoolInfo.list = school;
    };

    var factoryGetDirectorSchools = function() {
        var promise = $http.get('/schools/' + userID).then(function(response) {
            factorySchoolsList.list = response.data;
        });
        return promise;
    };

    var factoryGetAllSchools = function() {
        var promise = $http.get('/schools/admin').then(function(response) {
            allSchools.list = response.data;
            console.log('factory allSchools: ', allSchools.list);
        });
        return promise;
    };

    var factoryPostDirectorSchools = function(school) {
        var promise = $http.post('/schools/' + userID, school).then(function(response) {
            factoryGetDirectorSchools();
            //factorySchoolsList.list = response.data;
        });
        return promise;
    };

    var factoryPutDirectorSchools = function(school) {
        var promise = $http.put('/schools/' + userID, school).then(function(response) {
            factoryGetDirectorSchools();
            //factorySchoolsList.list = response.data;
        });
        return promise;
    };

    var factoryVerifySchool = function(schoolID, status) {
        var promise = $http.put('/schools/verify/' + schoolID, status).then(function(response) {
            factoryGetAllSchools();
        });
        return promise;
    };

    var publicFunctions = {
        getDirectorSchools: function() {
            return factoryGetDirectorSchools();
        },
        getAllSchools: function() {
            return factoryGetAllSchools();
        },
        postDirectorSchool: function(school) {
            return factoryPostDirectorSchools(school);
        },
        putDirectorSchool: function(school) {
            return factoryPutDirectorSchools(school);
        },
        schoolsList: function() {
            return factorySchoolsList.list;
        },
        factoryGetSchoolsList: function(name, id) {
            return getSchoolList(name, id);
        },
        factorySetSelectedSchoolInfo: function(school) {
            return setSelectedSchoolInfo(school);
        },
        verifySchool: function(schoolID, status) {
            return factoryVerifySchool(schoolID, status);
        },
        schoolSearchResults: schoolSearchResults,
        selectedInstrumentName: selectedInstrumentName,
        selectedSchoolInfo: selectedSchoolInfo,
        directorSchools: factorySchoolsList,
        currentSchool: {},
        allSchools: allSchools
    };

    return publicFunctions;
}]);

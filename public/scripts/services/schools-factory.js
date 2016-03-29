myApp.factory('SchoolsFactory', ['$http', function($http) {
    var userID = 5;
    //var factorySchoolsList = [];
    var factorySchoolsList = {};
    var schoolSearchResults = {};
    var selectedInstrumentName = {};
    var selectedSchoolInfo = {};

    var getSchoolList = function(name, id) {
        var promise = $http.get('/schools/instruments/' + id).then(function(response) {
            schoolSearchResults.list = response.data;
            selectedInstrumentName.list = name;
        });
        return promise;
    };

    var setSelectedSchoolInfo = function(school) {
        selectedSchoolInfo.list = school;
        console.log('selectedSchoolInfo in factory: ', selectedSchoolInfo);
    };

    var factoryGetDirectorSchools = function() {
        var promise = $http.get('/schools/' + userID).then(function(response) {
            //console.log('response: ', response);
            //factorySchoolsList = response.data;
            factorySchoolsList.list = response.data;
        });
        return promise;
    };

    var factoryPostDirectorSchools = function(school) {
        var promise = $http.post('/schools/' + userID, school).then(function(response) {
            //console.log('response: ', response);
            factoryGetDirectorSchools();
            factorySchoolsList.list = response.data;
        });
        return promise;
    };

    var factoryPutDirectorSchools = function(school) {
        var promise = $http.put('/schools/' + userID, school).then(function(response) {
            //console.log('response: ', response);
            factoryGetDirectorSchools();
            factorySchoolsList.list = response.data;
        });
        return promise;
    };

    var publicFunctions = {
        getDirectorSchools: function() {
            return factoryGetDirectorSchools();
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
        schoolSearchResults: schoolSearchResults,
        selectedInstrumentName: selectedInstrumentName,
        selectedSchoolInfo: selectedSchoolInfo,
        allSchools: factorySchoolsList,
        currentSchool: {}
        //schoolsList: factorySchoolsList
    };

    return publicFunctions;
}]);
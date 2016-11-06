(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope','$http','$scope'];
    function HomeController(UserService, $rootScope,$http,$scope) {
        var vm = this;

        $rootScope.user = new Object();
        vm.allUsers = [];
        vm.deleteUser = deleteUser;

        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
        }

        function loadCurrentUser() {
            $http({
                method: 'POST',
                url: 'http://localhost:7002/v1/userdata',
                data : {'uid':$rootScope.globals.currentUser.username}
            }).then(function successCallback(response) {
                console.log("response",response);
                console.log(response.data.data);
                $rootScope.user.firstname = response.data.data.name;
                console.log($rootScope.user.firstname);
            }, function errorCallback(response) {
                vm.dataLoading = false;
            });


        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }
    }

})();
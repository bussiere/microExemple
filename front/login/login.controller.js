(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location','$http', 'AuthenticationService', 'FlashService'];
    function LoginController($location, $http,AuthenticationService, FlashService) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
        })();

        function login() {
            vm.dataLoading = true;
            $http({
                method: 'POST',
                url: 'http://localhost:7001/v1/login',
                data : {'name':vm.username}
            }).then(function successCallback(response) {
                console.log("response",response);
                console.log(response.data.data);
                AuthenticationService.SetCredentials(vm.username, vm.password);
                $location.path('/');
            }, function errorCallback(response) {
                FlashService.Error(response.message);
                vm.dataLoading = false;
            });

        }
    }

})();

/* global angular */
angular.module('simple').service('ToastMessage', ['$mdToast', function($mdToast) {
    var s = {};
    s.ShowSimpleToast = function(msg) {
        $mdToast.show(
            $mdToast.simple()
            .content(msg)
            .position("top right")
            .hideDelay(5000)
        );
    }
    return s;
}]);
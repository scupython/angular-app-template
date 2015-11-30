/* global angular */
angular.module('simple').directive('pager', function() {
    return {
        restrict: "E",
        transclude: true,
        scope: {
            'onclose': '&onClose',
            'loadlink': '&loadLink',
            'links': '=links',
            'page': '=page'
        },
        controller: ['$scope', function($scope){
            $scope.load_link = function(dir) {
                $scope.loadlink({url: $scope.links[dir]});
            }
        }],
        templateUrl: "partials/pager.html"
    }
});
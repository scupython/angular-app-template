/* global angular */
var app = angular.module('simple', ['ngMaterial', 'ui.router', 'ngMessages']);
/* global angular */
angular.module('simple').config(["$mdThemingProvider", function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('indigo', {
            'default': '400'
        })
        .accentPalette('lime', {
            'default': '400'
        });
}]);
/* global angular */
angular.module('simple').controller('main', ["$scope", function($scope){
    $scope.content = "this is a demo!"
}]);
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
function parse_link_header(header) {
    var links = {};
    if (header.length === 0) {
        return links;
    }

    // Split parts by comma
    var parts = header.split(',');
    // Parse each part into a named link
    for (var i = 0; i < parts.length; i++) {
        var section = parts[i].split(';');
        if (section.length !== 2) {
            throw new Error("section could not be split on ';'");
        }
        var url = section[0].replace(/<(.*)>/, '$1').trim();
        var name = section[1].replace(/rel="(.*)"/, '$1').trim();
        links[name] = url;
    }
    return links;
}

function parse_url_params(url) {
    var params = {};
    if (url.length === 0) {
        return params;
    }
    var parts = url.split('?');
    if (parts.length == 2) {
        var p1 = parts[1].split("&");
        for (var i = 0; i < p1.length; i++) {
            var pp = p1[i].split('=');
            if (pp.length != 2) {
                continue;
            }
            var q = pp[0].trim();
            var a = pp[1].trim();
            params[q] = a;
        }
    }
    return params;
}
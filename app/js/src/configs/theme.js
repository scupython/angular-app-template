/* global angular */
angular.module('simple').config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('indigo', {
            'default': '400'
        })
        .accentPalette('lime', {
            'default': '400'
        });
});
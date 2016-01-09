(function() {
  'use strict';

  angular
    .module('app')
    .directive('uploadfile', uploadFileDirective);

  uploadFileDirective.$inject = ['$timeout','$sce', '$http'];

  /* @ngInject */
  function uploadFileDirective($timeout, $sce, $http) {
    // Usage:
    //   <uploadfile id="your-element-id" wistiapass="your-wistia-api-password"/>
    var directive = {
      restrict: 'E',
      templateUrl: 'uploadFileTemplate.html',
      replace: true,
      link: link,
      scope: {
        id: "@id",
        wistiaPassword: "@wistiapass"
      }
    };

    return directive;

    function link(scope, element, attrs) {
      scope.hashId   = '';
      scope.progress = 0;
      scope.status   = 'idle';
      scope.url      = '';

      scope.checkStatus = function() {
        $http({
          method: 'GET',
          url: 'https://api.wistia.com/v1/medias/' + scope.hashId + '.json?api_password=' + scope.wistiaPassword
        }).then(function (response) {
          scope.status = response.data.status || '';

          if (scope.status == 'ready')
            scope.url = $sce.trustAsResourceUrl('http://fast.wistia.net/embed/iframe/' + scope.hashId);
          else if (scope.status != 'failed') {
            //check status again in a few seconds
            $timeout(function(){
              scope.checkStatus();
            }, 3000);
          }
        });
      };

      $timeout(function(){
        $('#' + scope.id + '_input').fileupload({
          dataType: 'json',
          formData: {
            api_password: scope.wistiaPassword
          },
          add: function (e, data) {
            scope.hashId   = '';
            scope.progress = 0;
            scope.status   = 'uploading';
            scope.url      = '';

            data.submit();
          },
          done: function (e, data) {
            if (data.result.hashed_id != '') {
              scope.hashId = data.result.hashed_id;
              scope.checkStatus();
            }
          },
          progressall: function (e, data) {
            if (data.total > 0) {
              scope.$apply(function(){
                scope.progress = parseInt(data.loaded / data.total * 100, 10);
              });
            }
          }
        });
      });
    }
  }
})();
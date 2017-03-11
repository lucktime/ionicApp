angular.module('starter.controllers', ['ngCordova'])

.controller('DashCtrl', function($scope,$ionicPopup, $timeout,$cordovaFileTransfer,ServiceImage) {
  // 下载图片 到本地仓库
  // 一个确认对话框
      $scope.showConfirm = function() {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Consume Ice Cream',
        template: 'Are you sure you want to eat this ice cream?'
      });
      confirmPopup.then(function(res) {
        if(res) {
          var photoPath = 'www.bntake.com/python/jpg/1314870579931D2.jpg';
          ServiceImage.downPhoto(photoPath);
          console.log('You are sure');
        } else {
          console.log('You are not sure');
        }
      });
      $scope.downloadFile = function() {
              var url = 'www.bntake.com/python/jpg/1314870579931D2.jpg';
              var filename = url.split("/").pop();
              alert(filename);
              var targetPath = cordova.file.externalRootDirectory + filename;
              var trustHosts = true
              var options = {};
              // alert(cordova.file.externalRootDirectory);
              $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                  .then(function(result) {
                      // Success!
                      alert(JSON.stringify(result));
                  }, function(error) {
                      // Error
                      alert(JSON.stringify(error));
                  }, function (progress) {
                      $timeout(function () {
                          $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                      })
                  });
          }

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('imageController', function($scope, $cordovaCamera, $cordovaFile) {
    $scope.images = [];

    $scope.addImage = function() {
        console.log("add image");
        // 2
          var options = {
            destinationType : Camera.DestinationType.FILE_URI,
            sourceType : Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
            allowEdit : false,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
          };

          // 3
          $cordovaCamera.getPicture(options).then(function(imageData) {

            // 4
            onImageSuccess(imageData);

            function onImageSuccess(fileURI) {
              createFileEntry(fileURI);
            }

            function createFileEntry(fileURI) {
              window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
            }

            // 5
            function copyFile(fileEntry) {
              var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
              var newName = makeid() + name;

              window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
                fileEntry.copyTo(
                  fileSystem2,
                  newName,
                  onCopySuccess,
                  fail
                );
              },
              fail);
            }

            // 6
            function onCopySuccess(entry) {
              $scope.$apply(function () {
                $scope.images.push(entry.nativeURL);
              });
            }

            function fail(error) {
              console.log("fail: " + error.code);
            }

            function makeid() {
              var text = "";
              var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

              for (var i=0; i < 5; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
              }
              return text;
            }

          }, function(err) {
            console.log(err);
          });
          }

    $scope.urlForImage = function(imageName) {
        console.log("get correct path for image");
        var name = imageName.substr(imageName.lastIndexOf('/') + 1);
        var trueOrigin = cordova.file.dataDirectory + name;
        console.log("get correct path for image",trueOrigin);
        return trueOrigin;
    }


})

.controller('AccountCtrl', function($scope,$ionicPopup) {
  $scope.settings = {
    enableFriends: true
  };


});

angular.module('starter.services', [])

.factory('ServiceImage', function() {


  var downPhoto = function (photoPath) {
   var pictrueUrl = encodeURI(photoPath);

   function saveImageToPhone(url, success, error) {
     var canvas, context, imageDataUrl, imageData;
     var img = new Image();
     img.onload = function () {
       canvas = document.createElement('canvas');
       canvas.width = img.width;
       canvas.height = img.height;
       context = canvas.getContext('2d');
       context.drawImage(img, 0, 0);
       try {
         imageDataUrl = canvas.toDataURL('image/jpeg', 1.0);
         imageData = imageDataUrl.replace(/data:image\/jpeg;base64,/, '');
         cordova.exec(
           success,
           error,
           'Canvas2ImagePlugin',
           'saveImageDataToLibrary',
           [imageData]
         );
       }
       catch (e) {
         error(e.message);
       }
     };
     try {
       img.src = url;
     }
     catch (e) {
       error(e.message);
     }
   }

   var success = function (msg) {
   //下载成功
   console.log('downPhoto success',msg);
   };
   var error = function (err) {
    //下载失败
    console.log('downPhoto',err);
   };
   console.log('use bntake down image');
   saveImageToPhone(photoPath, success, error);
 };


 return {
   	downPhoto: downPhoto,
   all: function() {
     return ServiceImage;
   },
   remove: function(ServiceImage) {
     chats.splice(chats.indexOf(ServiceImage), 1);
   },
   get: function(ServiceImageId) {
     for (var i = 0; i < chats.length; i++) {
       if (chats[i].id === parseInt(ServiceImageId)) {
         return chats[i];
       }
     }
     return null;
   }
 };

});

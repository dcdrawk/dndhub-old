// export default passwordMatch;

// function passwordMatch() {
//     return {
//         scope: {
//             fileread: '='
//         },
//         link: function(scope:any, element:any, attributes:any) {
//             element.bind('change', function(changeEvent:any) {
//                 var reader = new FileReader();
//                 scope.fileread = changeEvent.target.files[0];
//                 reader.onload = function(loadEvent: any) {
//                     scope.$parent.$ctrl.fileblob = loadEvent.target.result;
//                     scope.$apply(function() {
//                         //   scope.fileblob = loadEvent.target.result;
//                     });
//                 };
//                 reader.readAsDataURL(changeEvent.target.files[0]);
//             });
//         }
//     };
// }

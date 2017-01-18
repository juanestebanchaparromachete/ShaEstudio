app.controller("productoCtrl", function ($scope, shareProduct) {
    
        
    var objectValue = { };
    objectValue = shareProduct.getObject();
    $scope.producto = objectValue;
    $scope.images= objectValue.imagenes;
    console.log($scope.images);
    
    $scope.viewby = 1;
    $scope.bigTotalItems = 3;
    $scope.bigCurrentPage = 1;
    $scope.itemsPerPage = $scope.viewby;
    $scope.maxSize = 10;
    $scope.numPages = Math.ceil($scope.bigTotalItems / $scope.itemsPerPage);
    console.log($scope.numPages);

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;

    };

    $scope.pageChanged = function () {
        console.log('Page changed to: ' + $scope.currentPage);
    };
    
    function goBack() {
        window.history.back();
    }

});
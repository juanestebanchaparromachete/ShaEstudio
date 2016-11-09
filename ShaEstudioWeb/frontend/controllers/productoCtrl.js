app.controller("productoCtrl", function ($scope, shareProduct) {
    $scope.producto = {
        nombre: shareProduct.getObject().nombre,
        descripcion: shareProduct.getObject().descripcion,
        imagen: shareProduct.getObject().imagen,
        id: shareProduct.getObject().id
    }


});
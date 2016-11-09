app.controller("loMasVendidoCtrl", function ($scope , shareProduct) {
    var productos = $scope.productos = [{
            nombre: 'top seller 1',
            imagen: 'images/image4.jpg',
            descripcion: 'Mueble espacioso y con buenas proporciones',
            id: 5435
    },
        {
            nombre: 'producto2',
            imagen: 'images/image3.jpg',
            descripcion: 'Mueble espacioso y con buen color ',
            id: 7585
                                        }];
    $scope.passObject = function (idObject) {

        for (var i = 0; i < productos.length; i++) {

            if (productos[i].id == idObject) {
                console.log( productos[i].id );
                shareProduct.setObject(productos[i]); 

            }

        }

    }

});
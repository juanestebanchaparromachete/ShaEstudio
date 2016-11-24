app.controller("catalogo3Ctrl", function ($scope, shareProduct) {
    var productos = $scope.productos = [{
        nombre: 'producto1',
        imagen: 'images/image1.jpg',
        descripcion: 'Mueble espacioso y con buenas proporciones',
        id: 9876
    },
                                        {
                                            nombre: 'producto2',
                                            imagen: 'images/image2.jpg',
                                            descripcion: 'Mueble espacioso y con buen color ',
                                            id: 6574
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
app.controller("catalogoShaCtrl", function ($scope, shareProduct) {
    $scope.nombreCatalogo = 'Catalogo Sha';
    var productos = $scope.productos = [{
        nombre: 'producto1',
        imagenes: ['images/pruebafoto.jpg', 'images/pruebafoto.jpg', 'images/pruebafoto.jpg'],
        descripcion: 'Mueble espacioso y con buenas proporciones',
        id: 1001,
        disenador: 'disenador a x j a ', fechaCreacion:'dia de mes de año'
    },
                                        {
                                            nombre: 'producto2',
                                            imagenes: ['images/pruebafoto.jpg', 'images/pruebafoto.jpg', 'images/pruebafoto.jpg'],
                                            descripcion: 'Mueble espacioso y con buen color ',
                                            id: 1002,
                                            disenador: 'disenador a x j a ', fechaCreacion:'dia de mes de año'
                                        }, {
                                            nombre: 'producto3',
                                            imagenes: ['images/pruebafoto.jpg', 'images/pruebafoto.jpg', 'images/pruebafoto.jpg'],
                                            descripcion: 'Mueble espacioso y con buenas proporciones',
                                            id: 1003,
                                            disenador: 'disenador a x j a ', fechaCreacion:'dia de mes de año'
                                        },
                                        {
                                            nombre: 'producto4',
                                            imagenes: ['images/pruebafoto.jpg', 'images/pruebafoto.jpg', 'images/pruebafoto.jpg'],
                                            descripcion: 'Mueble espacioso y con buen color ',
                                            id: 1004,
                                            disenador: 'disenador a x j a ', fechaCreacion:'dia de mes de año'
                                        }, {
                                            nombre: 'producto5',
                                            imagenes: ['images/pruebafoto.jpg', 'images/pruebafoto.jpg', 'images/pruebafoto.jpg'],
                                            descripcion: 'Mueble espacioso y con buenas proporciones',
                                            id: 1005,
                                            disenador: 'disenador a x j a ', fechaCreacion:'dia de mes de año'
                                        },
                                        {
                                            nombre: 'producto6',
                                            imagenes: ['images/pruebafoto.jpg', 'images/pruebafoto.jpg', 'images/pruebafoto.jpg'],
                                            descripcion: 'Mueble espacioso y con buen color ',
                                            id: 1006,
                                            disenador: 'disenador a x j a ', fechaCreacion:'dia de mes de año'
                                        }, {
                                            nombre: 'producto7',
                                            imagenes: ['images/pruebafoto.jpg', 'images/pruebafoto.jpg', 'images/pruebafoto.jpg'],
                                            descripcion: 'Mueble espacioso y con buenas proporciones',
                                            id: 1007,
                                            disenador: 'disenador a x j a ', fechaCreacion:'dia de mes de año'
                                        },
                                        {
                                            nombre: 'producto8',
                                            imagenes: ['images/pruebafoto.jpg', 'images/pruebafoto.jpg', 'images/pruebafoto.jpg'],
                                            descripcion: 'Mueble espacioso y con buen color ',
                                            id: 1008,
                                            disenador: 'disenador a x j a ', fechaCreacion:'dia de mes de año'
                                        }, {
                                            nombre: 'producto9',
                                            imagenes: ['images/pruebafoto.jpg', 'images/pruebafoto.jpg', 'images/pruebafoto.jpg'],
                                            descripcion: 'Mueble espacioso y con buenas proporciones',
                                            id: 1009,
                                            disenador: 'disenador a x j a ', fechaCreacion:'dia de mes de año'
                                        },
                                        {
                                            nombre: 'producto10',
                                            imagenes: ['images/pruebafoto.jpg', 'images/pruebafoto.jpg', 'images/pruebafoto.jpg']
                                            ,descripcion: 'Mueble espacioso y con buen color ',
                                            id: 1010,
                                            disenador: 'disenador a x j a ', fechaCreacion:'dia de mes de año'
                                        }, {
                                            nombre: 'producto11',
                                            imagenes: ['images/pruebafoto.jpg', 'images/pruebafoto.jpg', 'images/pruebafoto.jpg'],
                                            descripcion: 'Mueble espacioso y con buenas proporciones',
                                            id: 1011,
                                            disenador: 'disenador a x j a ', fechaCreacion:'dia de mes de año'
                                        },
                                        {
                                            nombre: 'producto12',
                                            imagenes: ['images/pruebafoto.jpg',
                                                       'images/pruebafoto.jpg',
                                                       'images/pruebafoto.jpg'],
                                            descripcion: 'Mueble espacioso y con buen color ',
                                            id: 1012,
                                            disenador: 'disenador a x j a ', fechaCreacion:'dia de mes de año'
                                        }, {
                                            nombre: 'producto13',
                                            imagenes: ['images/pruebafoto.jpg',
                                                       'images/pruebafoto.jpg', 'images/pruebafoto.jpg'],
                                            descripcion: 'Mueble espacioso y con buenas proporciones',
                                            id: 1013,
                                            disenador: 'disenador a x j a ', fechaCreacion:'dia de mes de año'
                                        },
                                        {
                                            nombre: 'product14',
                                            imagenes: ['images/pruebafoto.jpg', 'images/pruebafoto.jpg', 'images/pruebafoto.jpg'],
                                            descripcion: 'Mueble espacioso y con buen color ',
                                            id: 1014,
                                            disenador: 'disenador a x j a ', fechaCreacion:'dia de mes de año'
                                        }, {
                                            nombre: 'producto15',
                                            imagenes: ['images/pruebafoto.jpg', 'images/pruebafoto.jpg', 'images/pruebafoto.jpg'],
                                            descripcion: 'Mueble espacioso y con buenas proporciones',
                                            id: 1015,
                                            disenador: 'disenador a x j a ', fechaCreacion:'dia de mes de año'
                                        },
                                        {
                                            nombre: 'producto16',
                                            imagenes: ['images/pruebafoto.jpg', 'images/pruebafoto.jpg', 'images/pruebafoto.jpg'],
                                            descripcion: 'Mueble espacioso y con buen color ',
                                            id: 1016,
                                            disenador: 'disenador a x j a ', fechaCreacion:'dia de mes de año'
                                        }, {
                                            nombre: 'producto17',
                                            imagenes: ['images/pruebafoto.jpg', 'images/pruebafoto.jpg', 'images/pruebafoto.jpg'],
                                            descripcion: 'Mueble espacioso y con buenas proporciones',
                                            id: 1017,
                                            disenador: 'disenador a x j a ', fechaCreacion:'dia de mes de año'
                                        },
                                        {
                                            nombre: 'producto18',
                                            imagenes: ['images/pruebafoto.jpg', 'images/pruebafoto.jpg', 'images/pruebafoto.jpg'],
                                            descripcion: 'Mueble espacioso y con buen color ',
                                            id: 1018,
                                            disenador: 'disenador a x j a ', fechaCreacion:'dia de mes de año'
                                        }];
    $scope.passObject = function (idObject) {

        for (var i = 0; i < productos.length; i++) {

            if (productos[i].id == idObject) {
                console.log(productos[i].id);
                shareProduct.setObject(productos[i]);

            }

        }

    }

    $scope.viewby = 3;
    $scope.bigTotalItems = 18;
    $scope.bigCurrentPage = 1;
    $scope.itemsPerPage = $scope.viewby;
    $scope.maxSize = 10;
    $scope.numPages= Math.ceil( $scope.bigTotalItems / $scope.itemsPerPage);
    console.log( $scope.numPages);

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;

    };

    $scope.pageChanged = function() {
        console.log('Page changed to: ' + $scope.currentPage);
    };


});
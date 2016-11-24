app.controller("somosDisenadoresCtrl", function ($scope, shareDisenador, shareProduct) {
    var disenadores = $scope.disenadores = [{
            nombre: 'Diseñador 1',
            imagen: 'images/disenadorimage.jpg',
            edad: 23,
            id: 9876,
            referencia: 'Un diseñador es un profesional que ejerce la profesión del diseño. Un profesional de este tipo puede dedicarse o especializarse en una gran variedad de objetos o áreas del diseño. Los diseñadores son responsables del desarrollo, en cuanto al proyecto, de un objeto, producto, o concepto.',
            ultimosTrabajos: 'mueble 1  mueble 2 mueble3'

    },
        {
            nombre: 'Diseñador 2',
            imagen: 'images/disenadorimage.jpg',
            edad: 35,
            id: 7627,
            referencia: 'Un diseñador es un profesional que ejerce la profesión del diseño. Un profesional de este tipo puede dedicarse o especializarse en una gran variedad de objetos o áreas del diseño. Los diseñadores son responsables del desarrollo, en cuanto al proyecto, de un objeto, producto, o concepto.',
            ultimosTrabajos: 'mueble 1  mueble 2 mueble3'
                                        }, {
            nombre: 'Diseñador 3',
            imagen: 'images/disenadorimage.jpg',
            edad: 19,
            id: 4575,
            referencia: 'Un diseñador es un profesional que ejerce la profesión del diseño. Un profesional de este tipo puede dedicarse o especializarse en una gran variedad de objetos o áreas del diseño. Los diseñadores son responsables del desarrollo, en cuanto al proyecto, de un objeto, producto, o concepto.',
            ultimosTrabajos: 'mueble 1  mueble 2 mueble3'

                                        },
        {
            nombre: 'Diseñador 4',
            imagen: 'images/disenadorimage.jpg',
            edad: 54,
            id: 8736,
            referencia: 'Un diseñador es un profesional que ejerce la profesión del diseño. Un profesional de este tipo puede dedicarse o especializarse en una gran variedad de objetos o áreas del diseño. Los diseñadores son responsables del desarrollo, en cuanto al proyecto, de un objeto, producto, o concepto.',
            ultimosTrabajos: 'mueble 1  mueble 2 mueble3'
                                        }];
    var productos = $scope.productos = [{
            nombre: 'producto1',
            imagen: 'images/image1.jpg',
            descripcion: 'Mueble espacioso y con buenas proporciones',
            id: 9876,
            disenador: 'diseñador 1'
    },
        {
            nombre: 'producto2',
            imagen: 'images/image2.jpg',
            descripcion: 'Mueble espacioso y con buen color ',
            id: 6574,
            disenador: 'diseñador 2'
                                        }, {
            nombre: 'producto3',
            imagen: 'images/image1.jpg',
            descripcion: 'Mueble espacioso y con buenas proporciones',
            id: 8736,
            disenador: 'diseñador 3'
                                        },
        {
            nombre: 'producto4',
            imagen: 'images/image2.jpg',
            descripcion: 'Mueble espacioso y con buen color ',
            id: 4536,
            disenador: 'diseñador 2'
                                        }


    ];

    $scope.passObjectDisenador = function (idObject) {

        for (var i = 0; i < disenadores.length; i++) {

            if (disenadores[i].id == idObject) {
                console.log(disenadores[i].id);
                shareDisenador.setObject(disenadores[i]);

            }

        }

    }
    $scope.passObjectProducto = function (idObject) {

        for (var i = 0; i < productos.length; i++) {

            if (productos[i].id == idObject) {
                console.log(productos[i].id);
                shareProduct.setObject(productos[i]);

            }

        }

    }
});
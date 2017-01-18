var app = angular.module('myApp', ['ngRoute','ngAnimate', 'ngSanitize', 'ui.bootstrap']);
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
        templateUrl : "html/main.html",
    })
        .when("/catalogo", {
        templateUrl : "html/catalogo.html",
        controller : "catalogoCtrl"
    })
        .when("/producto", {
        templateUrl : "html/producto.html",
        controller : "productoCtrl"
    })
        .when("/laEmpresa", {
        templateUrl : "html/laEmpresa.html",
        controller : "laEmpresaCtrl"
    })
        .when("/somosDisenadores", {
        templateUrl : "html/somosDisenadores.html",
        
    }) .when("/loMasVendido", {
        templateUrl : "html/loMasVendido.html",
        controller : "loMasVendidoCtrl"
    }).when("/usuarios", {
        templateUrl : "html/usuarios.html",
        controller : "usuariosCtrl"
    }).when("/catalogo1", {
        templateUrl : "html/catalogo1.html",
        controller : "catalogo1Ctrl"
    }).when("/catalogo2", {
        templateUrl : "html/catalogo2.html",
        controller : "catalogo2Ctrl"
    }).when("/catalogo3", {
        templateUrl : "html/catalogo3.html",
        controller : "catalogo3Ctrl"
    }).when("/catalogoSha", {
        templateUrl : "html/catalogoSha.html",
        controller : "catalogoShaCtrl"
    }).when("/contacto", {
        templateUrl : "html/contacto.html"
    });
});


function goToIndex() {
    window.location.href = 'index.html';
}

function goToIndexFromHtml() {
    window.location.href="/index.html";
}
function goBack() {
    window.history.back();
}





    
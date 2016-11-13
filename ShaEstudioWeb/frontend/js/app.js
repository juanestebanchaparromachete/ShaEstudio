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
        .when("/laIdea", {
        templateUrl : "html/laIdea.html",
        controller : "laIDeaCtrl"
    })
        .when("/nuestrosAliados", {
        templateUrl : "html/nuestrosAliados.html",
        controller : "nuestrosAliadosCtrl"
    })
        .when("/loMasVendido", {
        templateUrl : "html/loMasVendido.html",
        controller : "loMasVendidoCtrl"
    }).when("/usuarios", {
        templateUrl : "html/usuarios.html",
        controller : "usuariosCtrl"
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



    
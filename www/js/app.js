// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
    'ionic',
    'starter.controllers',
    'starter.services',
    'angular-storage',
    'ngCordova'
])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    //$ionicConfigProvider.scrolling.jsScrolling(false);

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
        .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })

    // Each tab has its own nav history stack:

    .state('home', {
        url: '/home',
        templateUrl: 'templates/home.html',
        controller: 'HomeController'
    })
    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
    })
    .state('registrar', {
        url: '/registrar',
        templateUrl: 'templates/registrar.html',
        controller: 'RegistrarController'
    })
    .state('esqueci-minha-senha', {
        url: '/esqueci-minha-senha',
        templateUrl: 'templates/esqueci_minha_senha.html',
        controller: 'EsqueciMinhaSenhaController'
    })

    .state('tab.pesquisa', {
        url: '/pesquisa',
        views: {
            'tab-pesquisa': {
                templateUrl: 'templates/tab-pesquisa.html',
                controller: 'PesquisaController'
            }
        },
        resolve: {
            estados: function(Estados){
                return Estados.all();
            },
            cidades: function(Cidades){
                return Cidades.all();
            },
            planos: function(Planos){
                return Planos.all();
            },
            especialidades: function(Especialidades){
                return Especialidades.all();
            },
            tiposMedicos: function(TiposMedicos){
                return TiposMedicos.all();
            },
            formData: function(Pesquisa){
                return Pesquisa.getFormData();
            }
        }
    })
        .state('tab.pesquisa-resultado', {
            url: '/pesquisa-resultado',
            views: {
                'tab-pesquisa': {
                    templateUrl: 'templates/pesquisa-resultado.html',
                    controller: 'PesquisaResultadoController'
                }
            },
            resolve: {
                medicos: function(Medicos){
                    return Medicos.pesquisar();
                },
                labels: function(Pesquisa){
                    return Pesquisa.getLabels();
                }
            }
        })
        .state('tab.medico-perfil', {
            url: '/medico-perfil',
            views: {
                'tab-pesquisa': {
                    templateUrl: 'templates/medico-perfil.html',
                    controller: 'MedicoPerfilController'
                }
            }
        })
    .state('tab.favoritos', {
        url: '/favoritos',
        views: {
            'tab-favoritos': {
                templateUrl: 'templates/tab-favoritos.html',
                controller: 'FavoritosController'
            }
        },
        resolve: {
            medicos: function(Favoritos){
                return Favoritos.all();
            }
        }
    })
        .state('tab.medico-perfil-favoritos', {
            url: '/medico-perfil-favoritos',
            views: {
                'tab-favoritos': {
                    templateUrl: 'templates/medico-perfil.html',
                    controller: 'MedicoPerfilController'
                }
            }
        })
    .state('tab.historico', {
        url: '/historico',
        views: {
            'tab-historico': {
                templateUrl: 'templates/tab-historico.html',
                controller: 'HistoricoController'
            }
        }
    })
        .state('tab.medico-perfil-historico', {
            url: '/medico-perfil-historico',
            views: {
                'tab-historico': {
                    templateUrl: 'templates/medico-perfil.html',
                    controller: 'MedicoPerfilController'
                }
            }
        })
    .state('tab.opcoes', {
        url: '/opcoes',
        views: {
            'tab-opcoes': {
                templateUrl: 'templates/tab-opcoes.html',
                controller: 'OpcoesController'
            }
        }
    })
    .state('tab.account', {
        url: '/account',
        views: {
            'tab-account': {
                templateUrl: 'templates/tab-account.html',
                controller: 'AccountCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/favoritos');

});

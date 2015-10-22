angular.module('starter.controllers', [])

.directive('medicoAvaliacao', function(){
    return {
        scope: {
            avaliacao: '=',
        },
        link: function(scope){
            var avaliacao = [];
            for (i = 0; i < scope.avaliacao; i++){
                avaliacao.push(1);
            }
            for (i = 0; i < (5 - scope.avaliacao); i++){
                avaliacao.push(0);
            }
            //console.log(avaliacao);
            scope.avaliacao = avaliacao;
        },
        templateUrl: 'templates/Element/medico_avaliacao.html',
    };
})
.directive('medicoListItem', function(){
    return {
        scope: {
            baseUrlPerfil: '=',
            medico: '='
        },
        templateUrl: 'templates/Element/medico_list_item.html',
    };
})

.controller('DashCtrl', function($scope) {})
.controller('ChatsCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
        Chats.remove(chat);
    };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('PesquisaController', function(
    $scope,
    $state,
    $timeout,
    cidades,
    especialidades,
    estados,
    planos,
    store,
    formData,
    tiposMedicos
) {
    $scope.$on('$ionicView.beforeEnter', function() {
        /**
         * Valores dos selects
         */
        $scope.estados = estados;
        $scope.cidades = cidades;
        $scope.planos = planos;
        $scope.especialidades = especialidades;
        $scope.tiposMedicos = tiposMedicos;
        /**
         * Pega as opções marcadas do form de pesquisa
         * @type {object}
         */
        $scope.formData = formData;
        
        if (!$scope.formData.tipo) {
            $scope.formData.tipo = $scope.tiposMedicos[0];
        }
        if (!$scope.formData.distancia) {
            $scope.formData.distancia = 5;
        }
    });
    /**
     * Fica "assistindo" as alterações do form e salvando no localStorage para carregar
     * sempre as últimas opções que ele selecionou mesmo se ele fechar o app
     * É necessário enrolar no timeout para que ele possa 
     * salvar a $$hashkey que o angular coloca nos an denderização dos SELECTS
     */
    $timeout(function(){
        $scope.$watch('formData', function(oldValue, newValue){
            store.set('formData', $scope.formData);
        }, true);
    });

    $scope.pesquisar = function(){
        /**
         * Como as opções do form estão gravadas, joga para a página que pesquisa e lá
         * faz a pesquisa
         */
        $state.go('tab.pesquisa-resultado');
    };
})
.controller('MedicoPerfilController', function(
    $scope,
    $http,
    $ionicPopup
) {

    $scope.estados = {};
    $scope.cidades = {};

    $scope.showPopup = function() {
        $scope.data = {};

        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            template: '<div class="text-center"><span class="icon ion-star" ng-repeat="item in [0, 1, 2, 3, 4]"></span></div>',
            title: 'Avaliar Médico',
            // subTitle: 'Please use normal things',
            scope: $scope,
            buttons: [
            {
                text: 'Cancelar'
            },
            {
                text: 'Avaliar',
                type: 'button-positive',
                onTap: function(e) {
                    if (!$scope.data.wifi) {
                    //don't allow the user to close unless he enters wifi password
                    e.preventDefault();
                    } else {
                    return $scope.data.wifi;
                    }
                }
            }]
        });
        myPopup.then(function(res) {
            console.log('Tapped!', res);
        });
    };

    $http.get('files/brazil.json')
        .then(function(data){
            data = data.data;
            var estados = {};
            var cidades = {};
            angular.forEach(data.estados, function(v, k){
                estados[v.sigla] = {nome: v.nome, sigla: v.sigla};
                angular.forEach(v.cidades, function(val, key){
                    if (typeof cidades[v.sigla] == 'undefined') {
                        cidades[v.sigla] = [];    
                    }
                    cidades[v.sigla].push({nome: val});
                });
            });
            console.log(cidades);
            // console.log(estados);
            $scope.cidades = cidades;
            $scope.estados = estados;
        });

})
.controller('HistoricoController', function($scope) {
    $scope.medicos = [
        {
            nome: 'Natalie Dormer',
            img: 'natalie.jpg'
        },
        {
            nome: 'Katy Perry',
            img: 'katy.jpg'
        },
    ];
})
.controller('OpcoesController', function($scope) {
    $scope.medicos = [
        {
            nome: 'Natalie Dormer',
            img: 'natalie.jpg'
        },
        {
            nome: 'Katy Perry',
            img: 'katy.jpg'
        },
    ];
})
.controller('FavoritosController', function(
    $scope,
    $ionicModal,
    medicos
) {
    $scope.medicosByLetra = medicos;

    $ionicModal.fromTemplateUrl('templates/Modal/favoritos_pesquisa.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function() {
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
})
.controller('PesquisaResultadoController', function(
    $scope,
    labels,
    medicos
) {

    $scope.medicos = medicos;
    $scope.labels = labels;
})
.controller('HomeController', function(){

})
.controller('LoginController', function(){

})
.controller('EsqueciMinhaSenhaController', function(){

})
.controller('RegistrarController', function(){

});
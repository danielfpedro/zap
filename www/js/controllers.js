angular.module('starter.controllers', [])

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
    Estados,
    Cidades,
    Planos,
    Especialidades,
    store
) {
    $scope.$on('$ionicView.beforeEnter', function() {
        Estados
            .all()
            .then(function(estados){
                $scope.estados = estados;
            });
        Cidades
            .all()
            .then(function(cidades){
                $scope.cidades = cidades;
            });

        $scope.planos = Planos.all();
        $scope.especialidades = Especialidades.all();
        $scope.formData = store.get('formData') || {};
        if (!$scope.formData.tipo) {
            $scope.formData.tipo = 'medico';
        }
        if (!$scope.formData.distancia) {
            $scope.formData.distancia = 5;
        }
    });

    $scope.$watch('formData', function(oldValue, newValue){
        store.set('formData', $scope.formData);
        console.log('mudou');
    }, true);

    // $scope.estados = [];
    // $scope.estado = null;

    // $scope.cidades = [];
    // $scope.cidade = {};

})
.controller('MedicoPerfilController', function(
    $scope,
    $http
) {

    $scope.estados = {};
    $scope.cidades = {};

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
.controller('FavoritosController', function($scope) {
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
.controller('PesquisaResultadoController', function(
    $scope
) {
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
});